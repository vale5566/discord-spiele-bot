@echo off

:start
node spielebot_1_0.js
echo Abgestuerzt am %Date% um %Time% mit Error %ErrorLevel%
echo Strg + C wenn nicht automatisch neugestartet werden soll

goto start
