@echo off
where /q node
if %ERRORLEVEL% neq 0 echo Please install node && pause && exit
cd backend
call npm install
echo npm backend installed
start cmd /k call npx ts-node --esm index.ts
echo backend started
cd ../frontend
call npm install
call npm start
echo "web server started"