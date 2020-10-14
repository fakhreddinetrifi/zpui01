cmd /c ng build --prod --base-href=/zpui01/
@echo off
cd dist/zpui01
copy "..\..\src\environments\dev\configuration.json" ".\assets\config"
@echo on
jar -cvf zpui01.war *
@echo off
cd ../..
@echo on