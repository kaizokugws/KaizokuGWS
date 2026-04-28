Get-ChildItem "C:\Users\USER\Desktop\+\KaizokuGWS\Raw Files of Games" -Recurse -Filter "*.txt" | Where-Object { $_.DirectoryName -match "Creed" } | ForEach-Object { 
    Write-Host "File: $($_.FullName)"
    Write-Host $_.DirectoryName
}