@ECHO OFF
echo "cordova platform add android"
cordova platform add android
:choice1
set /P c=Want to continue[Y/N]?
if /I "%c%" EQU "Y" goto :cont1
if /I "%c%" EQU "N" goto :exitend
goto :choice1

:cont1

echo "cordova requirements"
cordova requirements

:choice2
set /P c=Want to continue[Y/N]?
if /I "%c%" EQU "Y" goto :cont2
if /I "%c%" EQU "N" goto :exitend
goto :choice2

:cont2
echo "cordova build"
cordova build

:choice3
set /P c=Want to continue[Y/N]?
if /I "%c%" EQU "Y" goto :cont2
if /I "%c%" EQU "N" goto :exitend
goto :choice2

:cont2
echo "cordova run android"
cordova run android

pause
exit
