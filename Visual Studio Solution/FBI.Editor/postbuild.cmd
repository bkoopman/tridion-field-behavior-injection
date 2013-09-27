REM this files copies the resx file(s) and dll(s) to the Tridion dirs
REM if you need to modify this file with different paths, don't check that back in

copy /Y "%1Resources\*.resx" "%TRIDION_HOME%web\WebUI\WebRoot\App_GlobalResources"
copy /Y "%2" "%TRIDION_HOME%web\WebUI\WebRoot\bin\"