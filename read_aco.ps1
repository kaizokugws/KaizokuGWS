$files = Get-ChildItem "C:\Users\USER\Desktop\+\KaizokuGWS\Raw Files of Games\Assassins Creed Odyssey" -Filter "*.txt"
foreach ($f in $files) {
    Write-Host "=== $($f.Name) ==="
    Write-Host (Get-Content $f.FullName -Raw)
}