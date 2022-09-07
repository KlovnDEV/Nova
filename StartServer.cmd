
: Setting paths
SET currentPath=%cd%

chdir %currentPath% && chdir server
SET serverPath=%cd%

chdir ../server-data
SET serverDataPath=%cd%

@echo off
echo Starting..

:main
cd %serverDataPath%

rmdir /q /s cache
%serverPath%/FXServer.exe +exec server.cfg +set onesync +set sv_enforceGameBuild 2372

pause
echo Restarting Server..

goto main
