@echo off

if "%~1"=="" (
    echo 用法: %~nx0 ^<file^> ^<device_ip^> [sync]
    exit /b 1
)

setlocal ENABLEDELAYEDEXPANSION
set "FILE=%~1"
set "IP=%~2"
if "%IP%"=="" set "IP=192.168.4.1"
set "SYNC=%~3"
if "%SYNC%"=="" set "SYNC=0"

for %%A in ("%FILE%") do set "SIZE=%%~zA"

curl --http1.0 -H "Filename: %FILE%" -H "Content-Length: !SIZE!" --data-binary "@%FILE%" "http://%IP%/pdk_upload?name=%FILE%&sync=%SYNC%"

echo.
echo Upload %FILE% (!SIZE!  bytes) to %IP% ...
endlocal