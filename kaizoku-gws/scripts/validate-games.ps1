param(
    [switch]$Fix,
    [string]$GameDir = "..\src\content\pc-games",
    [string]$MagnetsDir = "..\public\magnets",
    [string]$LinksDir = "..\public\links"
)

$ErrorActionPreference = "Stop"
$gamePath = Resolve-Path (Join-Path $PSScriptRoot $GameDir)
$magnetPath = Resolve-Path (Join-Path $PSScriptRoot $MagnetsDir)
$linkPath = Resolve-Path (Join-Path $PSScriptRoot $LinksDir)

Write-Host "=== KaizokuGWS Game Validation Script ===" -ForegroundColor Cyan
Write-Host "Games:     $gamePath"
Write-Host "Magnets:   $magnetPath"
Write-Host "Links:     $linkPath"
Write-Host ""

# Build lookup maps
$magnetFiles = @{}
Get-ChildItem -LiteralPath $magnetPath -Filter "*.txt" | ForEach-Object { $magnetFiles[$_.BaseName] = $_.FullName }
$linkFiles = @{}
Get-ChildItem -LiteralPath $linkPath -Filter "*.txt" | ForEach-Object { $linkFiles[$_.BaseName] = $_.FullName }

$allSourceFiles = @{}
$errors = @()
$warnings = @()
$totalGames = 0
$passedGames = 0
$failedGames = 0

Get-ChildItem -LiteralPath $gamePath -Filter "*.md" | ForEach-Object {
    $totalGames++
    $gameFile = $_.FullName
    $gameName = $_.BaseName
    $content = Get-Content -LiteralPath $gameFile -Raw
    $gameErrors = @()
    $gameWarnings = @()

    # Check frontmatter is valid
    if ($content -notmatch '^---\s*\n') {
        $gameErrors += "Invalid or missing frontmatter opening"
    }

    # Check required fields
    if ($content -notmatch '(?m)^title:\s*') { $gameErrors += "Missing 'title' field" }
    if ($content -notmatch '(?m)^slug:\s*') { $gameErrors += "Missing 'slug' field" }
    if ($content -notmatch '(?m)^platform:\s*') { $gameErrors += "Missing 'platform' field" }
    if ($content -notmatch '(?m)^thumbnail:\s*') { $gameErrors += "Missing 'thumbnail' field" }

    # Check sources
    if ($content -notmatch 'sources:') {
        $gameErrors += "MISSING: No 'sources' array in frontmatter"
    } else {
        $sourceRegex = [regex]::new('file:\s*"([^"]+)"')
        $sourceMatches = $sourceRegex.Matches($content)
        $sourceFiles = @($sourceMatches | ForEach-Object { $_.Groups[1].Value })
        $nameRegex = [regex]::new('name:\s*"([^"]+)"')
        $nameMatches = $nameRegex.Matches($content)

        if ($sourceFiles.Count -eq 0) {
            $gameErrors += "MISSING: 'sources' array exists but no file entries found"
        } else {
            $names = @($nameMatches | ForEach-Object { $_.Groups[1].Value })
            for ($i = 0; $i -lt $sourceFiles.Count; $i++) {
                $sf = $sourceFiles[$i]
                $sn = if ($i -lt $names.Count) { $names[$i] } else { "unnamed" }
                $allSourceFiles[$sf] = $true

                # Check placeholder names
                if ($sn -eq "Source Pending" -or $sn -eq "Unknown" -or $sn -eq "TBD") {
                    $gameWarnings += "PLACEHOLDER: Source name '$sn' should be updated with actual repack name"
                }

                # Check file exists
                $foundInMagnets = $magnetFiles.ContainsKey($sf)
                $foundInLinks = $linkFiles.ContainsKey($sf)

                if (-not $foundInMagnets -and -not $foundInLinks) {
                    $gameErrors += "MISSING: Source '$sf' ($sn) has no corresponding file in /magnets/ or /links/"
                } elseif ($foundInMagnets) {
                    # Validate magnet file content
                    $magContent = Get-Content -LiteralPath $magnetFiles[$sf] -Raw
                    if (-not $magContent) { $magContent = "" }; $trimmed = $magContent.Trim()
                    if ($trimmed.Length -eq 0) {
                        $gameErrors += "EMPTY: Magnet file '$sf.txt' is empty"
                    } elseif ($trimmed -match '^magnet:\?') {
                        if ($trimmed -notmatch 'urn:btih:') {
                            $gameErrors += "INVALID: Magnet file '$sf.txt' missing BTIH hash"
                        }
                        $hash = if ($trimmed -match 'urn:btih:([0-9a-fA-F]+)') { $matches[1] } else { "none" }
                        if ($hash -ne "none" -and $hash.Length -ne 40) {
                            $gameWarnings += "HASH LENGTH: '$sf.txt' BTIH hash is $($hash.Length) chars (expected 40)"
                        }
                    } elseif ($trimmed -notmatch '^https?://') {
                        $gameErrors += "INVALID: '$sf.txt' starts with neither 'magnet:?' nor 'http'"
                    }
                }
            }
        }
    }

    # Check slug matches filename
    $expectedSlug = $gameName
    if ($content -match '(?m)^slug:\s*"([^"]+)"') {
        $slug = $matches[1]
        if ($slug -ne $expectedSlug) {
            $gameWarnings += "SLUG MISMATCH: frontmatter slug '$slug' != filename '$expectedSlug'"
        }
    }

    # Check lastUpdated exists
    if ($content -notmatch '(?m)^lastUpdated:\s*"\d{4}-\d{2}-\d{2}"') {
        $gameWarnings += "WARNING: 'lastUpdated' is missing or not in YYYY-MM-DD format"
    }

    # Report
    if ($gameErrors.Count -gt 0) {
        $failedGames++
        Write-Host "FAIL: $gameName" -ForegroundColor Red
        $gameErrors | ForEach-Object { Write-Host "  ERROR: $_" -ForegroundColor Red }
        $errors += @{Game=$gameName; Errors=$gameErrors}
    } else {
        $passedGames++
        Write-Host "PASS: $gameName" -ForegroundColor Green
    }
    if ($gameWarnings.Count -gt 0) {
        $gameWarnings | ForEach-Object { Write-Host "  WARN: $_" -ForegroundColor Yellow }
        $warnings += @{Game=$gameName; Warnings=$gameWarnings}
    }
}

# Check for orphaned magnet files
Write-Host ""
Write-Host "=== ORPHANED FILES CHECK ===" -ForegroundColor Cyan
$orphaned = @()
Get-ChildItem -LiteralPath $magnetPath -Filter "*.txt" | ForEach-Object {
    if (-not $allSourceFiles.ContainsKey($_.BaseName)) {
        $orphaned += "magnet/$($_.Name)"
    }
}
Get-ChildItem -LiteralPath $linkPath -Filter "*.txt" | ForEach-Object {
    if (-not $allSourceFiles.ContainsKey($_.BaseName)) {
        $orphaned += "link/$($_.Name)"
    }
}
if ($orphaned.Count -gt 0) {
    Write-Host "ORPHANED FILES (not referenced by any game):" -ForegroundColor Yellow
    $orphaned | ForEach-Object { Write-Host "  $_" -ForegroundColor Yellow }
} else {
    Write-Host "No orphaned files found." -ForegroundColor Green
}

# Summary
Write-Host ""
Write-Host "=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "Total games: $totalGames"
Write-Host "Passed:      $passedGames" -ForegroundColor Green
Write-Host "Failed:      $failedGames" -ForegroundColor Red
Write-Host "Warnings:    $($warnings.Count)"
Write-Host "Errors:      $($errors.Count)"
if ($failedGames -gt 0) {
    Write-Host ""
    Write-Host "FAILED GAMES:" -ForegroundColor Red
    $errors | ForEach-Object { Write-Host "  $($_.Game): $($_.Errors -join '; ')" -ForegroundColor Red }
}

if ($Fix -and $errors.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host ""
    Write-Host "All validations passed!" -ForegroundColor Green
}

exit $failedGames
