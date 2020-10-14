cmd /c ng build --base-href=/zpui01/
@echo off
cd dist/zpui01
@echo on
jar -cvf zpui01.war *
@echo off
cd ../..
@echo on