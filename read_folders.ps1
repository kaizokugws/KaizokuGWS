$folders = @(
    "C:\Users\USER\Desktop\+\KaizokuGWS\Raw Files of Games\Assassin's Creed",
    "C:\Users\USER\Desktop\+\KaizokuGWS\Raw Files of Games\Assassin's Creed 3",
    "C:\Users\USER\Desktop\+\KaizokuGWS\Raw Files of Games\Assassin's Creed Odyssey"
)
foreach ($folder in $folders) {
    Write-Host "=== $folder ==="
    Get-ChildItem $folder | ForEach-Object { Write-Host $_.Name }
}