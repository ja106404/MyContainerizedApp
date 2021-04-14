@echo off
set env=development
if "%1"=="" goto :next
set env=%1
:next
@echo on

REM: Copy source code to this folder.
xcopy ..\..\..\global.json .\__tmp__\
xcopy ..\..\..\Source\*.* .\__tmp__\Source\ /q /s /e /d /y /exclude:excludedfiles.txt
xcopy ..\..\..\Test\*.* .\__tmp__\Test\ /q /s /e /d /y /exclude:excludedfiles.txt

REM Remove existing images.
docker rmi csg/myapp -f

REM Build a new image.
docker build -t csg/myapp . --build-arg aspnetenv=%env%

REM Remove intermediary build image and the local source code.
docker image prune -f --filter label=stage=build
rd __tmp__ /q /s

REM Run the image inside a container. The container will be removed on exit.
docker run -it --rm -p:8090:80 --name myapp_8090 csg/myapp