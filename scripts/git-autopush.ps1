# Git Auto Push Script
# Automatically commits and pushes all changes with version increment

param(
    [string]$commitMessage = "",
    [string]$versionType = "patch",
    [switch]$skipVersion = $false
)

Write-Host "`n🚀 Git Auto Push Started..." -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Step 1: Increment version (unless skipped)
if (-not $skipVersion) {
    Write-Host "`n📈 Step 1: Incrementing version..." -ForegroundColor Yellow
    $newVersion = & "$PSScriptRoot\auto-version.ps1" -versionType $versionType
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Version increment failed!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "`n⏭️ Skipping version increment..." -ForegroundColor Yellow
    $versionData = Get-Content "version.json" -Raw | ConvertFrom-Json
    $newVersion = $versionData.version
}

# Step 2: Git status
Write-Host "`n📊 Step 2: Checking git status..." -ForegroundColor Yellow
git status --short

# Step 3: Add all changes
Write-Host "`n➕ Step 3: Adding all changes..." -ForegroundColor Yellow
git add .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Git add failed!" -ForegroundColor Red
    exit 1
}

# Step 4: Create commit message
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "chore: version $newVersion - automated update"
}

Write-Host "`n💬 Step 4: Creating commit..." -ForegroundColor Yellow
Write-Host "   Message: $commitMessage" -ForegroundColor Gray

git commit -m "$commitMessage"

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Nothing to commit or commit failed" -ForegroundColor Yellow
    Write-Host "   This might be okay if there are no changes." -ForegroundColor Gray
}

# Step 5: Push to GitHub
Write-Host "`n☁️ Step 5: Pushing to GitHub..." -ForegroundColor Yellow

# Check if we're on a branch with upstream
$branch = git rev-parse --abbrev-ref HEAD
Write-Host "   Branch: $branch" -ForegroundColor Gray

# Try to push
git push origin $branch

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Push failed. Trying with upstream setup..." -ForegroundColor Yellow
    git push -u origin $branch
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Push failed!" -ForegroundColor Red
        Write-Host "   Please check your GitHub credentials and network connection." -ForegroundColor Gray
        exit 1
    }
}

# Success!
Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "✅ SUCCESS! All changes pushed to GitHub" -ForegroundColor Green
Write-Host "   Version: $newVersion" -ForegroundColor White
Write-Host "   Branch: $branch" -ForegroundColor White
Write-Host "   Repository: https://github.com/mahmudulhassan-dev/amanamart-ecommerce" -ForegroundColor White
Write-Host "================================`n" -ForegroundColor Cyan
