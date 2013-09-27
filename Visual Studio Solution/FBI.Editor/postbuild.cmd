@echo off
REM this files copies the resx file(s) and dll(s) to the Tridion dirs
REM if you need to modify this file with different paths, don't check that back in

set TRIDION_PATH=%TRIDION_HOME%
copy /Y "%~1Resources\*.resx" "%TRIDION_PATH%web\WebUI\WebRoot\App_GlobalResources"
copy /Y "%~1%~2" "%TRIDION_PATH%web\WebUI\WebRoot\bin\"
