# Auto Version Increment Script
# This script automatically increments the project version

param(
    [string]$versionType = "patch"  # major, minor, or patch
)

$versionFile = "version.json"
$frontendPackage = "frontend/package.json"
$backendPom = "backend/pom.xml"

Write-Host "🔢 Auto Version Increment Started..." -ForegroundColor Cyan

# Check if version.json exists
if (-not (Test-Path $versionFile)) {
    Write-Host "❌ Error: version.json not found!" -ForegroundColor Red
    exit 1
}

# Read current version
$versionData = Get-Content $versionFile -Raw | ConvertFrom-Json
$currentVersion = $versionData.version

Write-Host "📊 Current Version: $currentVersion" -ForegroundColor Yellow

# Parse version (MAJOR.MINOR.PATCH)
$versionParts = $currentVersion -split '\.'
$major = [int]$versionParts[0]
$minor = [int]$versionParts[1]
$patch = [int]$versionParts[2]

# Increment based on type
switch ($versionType.ToLower()) {
    "major" {
        $major++
        $minor = 0
        $patch = 0
    }
    "minor" {
        $minor++
        $patch = 0
    }
    "patch" {
        $patch++
    }
    default {
        Write-Host "⚠️ Invalid version type. Using 'patch' by default." -ForegroundColor Yellow
        $patch++
    }
}

$newVersion = "$major.$minor.$patch"
Write-Host "✨ New Version: $newVersion" -ForegroundColor Green

# Update version.json
$versionData.version = $newVersion
$versionData.lastUpdated = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssK")

# Save version.json with proper formatting
$versionData | ConvertTo-Json -Depth 10 | Set-Content $versionFile -Encoding UTF8

Write-Host "✅ Updated: $versionFile" -ForegroundColor Green

# Update frontend package.json if exists
if (Test-Path $frontendPackage) {
    try {
        $packageJson = Get-Content $frontendPackage -Raw | ConvertFrom-Json
        $packageJson.version = $newVersion
        $packageJson | ConvertTo-Json -Depth 10 | Set-Content $frontendPackage -Encoding UTF8
        Write-Host "✅ Updated: $frontendPackage" -ForegroundColor Green
    }
    catch {
        Write-Host "⚠️ Could not update frontend package.json: $_" -ForegroundColor Yellow
    }
}

# Update backend pom.xml if exists
if (Test-Path $backendPom) {
    try {
        $pomContent = Get-Content $backendPom -Raw
        $pomContent = $pomContent -replace '<version>[\d\.]+</version>', "<version>$newVersion</version>"
        $pomContent | Set-Content $backendPom -Encoding UTF8
        Write-Host "✅ Updated: $backendPom" -ForegroundColor Green
    }
    catch {
        Write-Host "⚠️ Could not update backend pom.xml: $_" -ForegroundColor Yellow
    }
}

Write-Host "`n🎉 Version increment completed successfully!" -ForegroundColor Cyan
Write-Host "   Old: $currentVersion → New: $newVersion" -ForegroundColor White

return $newVersion
