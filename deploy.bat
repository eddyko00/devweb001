@ECHO OFF
echo "cordova platform add android"
call cordova1.bat

:choice1
set /P c=Want to continue[Y/N]?
if /I "%c%" EQU "Y" goto :cont1
if /I "%c%" EQU "N" goto :exitend
goto :choice1

:cont1

echo "cordova requirements"
call cordova2.bat


:choice2
set /P c=Want to continue[Y/N]?
if /I "%c%" EQU "Y" goto :cont2
if /I "%c%" EQU "N" goto :exitend
goto :choice2

:cont2
echo "cordova build"
call cordova3.bat


:choice3
set /P c=Want to continue[Y/N]?
if /I "%c%" EQU "Y" goto :cont2
if /I "%c%" EQU "N" goto :exitend
goto :choice2

:cont2
echo "cordova run android"
call cordova4.bat


pause
exit
