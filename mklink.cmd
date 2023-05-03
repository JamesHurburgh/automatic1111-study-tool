@echo off
net session >nul 2>&1
if %errorLevel% == 0 (
  echo Running with administrative privileges
) else (
  echo Must run with administrative privileges
  pause
  exit
)

cd /d %~dp0

set /p folderPath=Enter the root folder path to your image studies:

if not exist "%folderPath%" (
  echo Folder does not exist.
  pause
  exit
)

set linkPath=".\public\images\user-root"

mklink /J "%linkPath%" "%folderPath%"

pause
