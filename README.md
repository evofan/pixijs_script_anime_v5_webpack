# Testing animation using PixiJS v5 with webpack.

**DEMO**  

<img src="https://raw.githubusercontent.com/evofan/pixijs_script_anime_v5_webpack/master/screenshot/pic_fall_snow.jpg" width="50%">  
[https://evofan.github.io/pixijs_script_anime_v5_webpack/dist/](https://evofan.github.io/pixijs_script_anime_v5_webpack/dist/)  

**USAGE(test on Windows10)**  
Download ZIP(pixijs_script_anime_v5_webpack-master.zip)  
`cd folder_name`(The folder where you unzipped the zip)  
`npm install`  
`npm run build`  
`npm run start`  
open http://localhost:8080/  

`npm install`  
If you get an this error, do the following.  
<img src="https://raw.githubusercontent.com/evofan/pixijs_script_anime_v5_webpack/master/screenshot/pic_err_fsevents.jpg" width="50%">  
`npm i -f`  
Skipping 'fsevents' build as platform win32 is not supported  
`npm audit fix`  
`npm install`  

`npm run build`  
`npm run start`  
If you get an this error, do the following.  
<img src="https://raw.githubusercontent.com/evofan/pixijs_script_anime_v5_webpack/master/screenshot/pic_err_webpack_path.jpg" width="50%">  
`npm i -D webpack webpack-cli`  
`npm i -D webpack webpack-dev-server`  
`npm run build`  
`npm run start`  

reference  

**PIXI.Sprite v5.1.0**  
[https://pixijs.download/v5.1.0/docs/index.html](https://pixijs.download/v5.1.0/docs/index.html)  

**PIXI.Ticker**  
[https://pixijs.download/v5.1.0/docs/PIXI.Ticker_.html](https://pixijs.download/v5.1.0/docs/PIXI.Ticker_.html)  

**PIXI.Loader**  
[https://pixijs.download/v5.1.0/docs/PIXI.Loader.html](https://pixijs.download/v5.1.0/docs/PIXI.Loader.html)  

**v5 Migration Guide**  
[https://github.com/pixijs/pixi.js/wiki/v5-Migration-Guide](https://github.com/pixijs/pixi.js/wiki/v5-Migration-Guide)  

**Getting Started with Pixi.js and webpack**  
[https://jameskiefer.com/posts/getting-started-with-pixi.js-and-webpack/](https://jameskiefer.com/posts/getting-started-with-pixi.js-and-webpack/)  

Unsupported platform for fsevents@2.1.2: wanted {"os":"darwin","arch":"any"}...
>ncu -u  
>~~npm i -f~~  
>npm i --f

  "dependencies": {
    "fsevents": "^2.1.2" // ← 1.2.9
  }
