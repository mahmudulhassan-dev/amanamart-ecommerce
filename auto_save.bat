@echo off
echo ==========================================
echo    AmanaMart Auto-Saver (Git Helper)
echo ==========================================
echo.
echo [1] Adding all new files...
git add .
echo.
echo [2] Saving changes (Commit)...
set /p commit_msg="Enter a short message for this update: "
git commit -m "%commit_msg%"
echo.
echo [3] Trying to push to GitHub (if connected)...
git push origin main
echo.
echo ==========================================
echo    All Done! (If push failed, check URL)
echo ==========================================
pause
