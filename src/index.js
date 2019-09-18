import * as PIXI from 'pixi.js';

const STAGE_WIDTH = 480;
const STAGE_HEIGHT = 320;

// init
let app = new PIXI.Application({
	width: STAGE_WIDTH,
	height: STAGE_HEIGHT
});
/*
let canvas = document.getElementById("canvas");
canvas.appendChild(app.view);
*/

document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x000000;

// v5 ticker
let ticker = PIXI.Ticker.shared;
// Set this to prevent starting this ticker when listeners are added.
// By default this is true only for the PIXI.Ticker.shared instance.
ticker.autoStart = false;
// FYI, call this to ensure the ticker is stopped. It should be stopped
// if you have not attempted to render anything yet.
// ticker.stop();
// Call this when you are ready for a running shared ticker.
// ticker.start();

ticker.add(function (time) {
	// app.renderer;
	// console.log("render...", time);
	update(time);
});
/*
// You may use the shared ticker to render...
let renderer = PIXI.autoDetectRenderer();
let stage = new PIXI.Container();
document.body.appendChild(renderer.view);
ticker.add(function (time) {
    renderer.render(stage);
});
*/

let bg;
// let snow;

let container_bg = new PIXI.Container();
container_bg.x = 0;
container_bg.y = 0;
app.stage.addChild(container_bg);

let container = new PIXI.Container();
container.width = 480;
container.height = 320;
container.x = 0;
container.y = 0;
container.pivot.x = 0;
container.pivot.y = 0;
container.interactive = true;
app.stage.addChild(container);

// asset property
const ASSET_BG = "assets/pic_darksky_bg.jpg";
const ASSET_SNOW = "assets/pic_snow.png";

// snow property
const ROTATE_LEFT = 1;
const ROTATE_RIGHT = 2;
const MAX_NUM = 20;
const MAX_SCALE = 1;
const MIN_SCALE = 0.3;
const MAX_ACCEL = 7;
const MIN_ALPHA = 0.3;
const MAX_ALPHA = 1;
const MAX_RADIUS = 5;
const MIN_RADIUS = 1;
let snows = [];
let radiusNums = [];
let angleNums = [];
let accelNums = [];

/*
PIXI.loader
	.add("bg_data", ASSET_BG)
	.add("snow_data", ASSET_SNOW)
	.load(onAssetsLoaded);
*/

// v5 loader
const loader = PIXI.Loader.shared;

loader.add("bg_data", ASSET_BG)
	.add("snow_data", ASSET_SNOW);

loader.load((loader, resources) => onAssetsLoaded(loader, resources));

/**
 * Asset load Complete
 * @param { object } loader object
 * @param { object } res asset data
 */
function onAssetsLoaded(loader, res) {
	console.log("onAssetsLoaded()", loader, res);
	// e {baseUrl: "", progress: 100, loading: false, defaultQueryString: "", _beforeMiddleware: Array(0), …}
	// {bg_data: t, snow_data: t}

	// BG
	bg = new PIXI.Sprite(res.bg_data.texture);
	container_bg.addChild(bg);
	bg.x = 0;
	bg.y = 0;
	bg.interactive = true;
	bg.on("tap", (event) => {
		console.log("onTap"); // Desktop(Touch)
	});
	bg.on("click", (event) => {
		console.log("click"); // Desktop
	});

	// Text
	let text = new PIXI.Text(`Fall Snow\nAnimation\nPixiJS: v ${PIXI.VERSION}\nfps: ${PIXI.settings.TARGET_FPMS}`, {
		fontFamily: "Arial",
		fontSize: 30,
		fill: 0xf0fff0,
		align: "center",
		fontWeight: "bold",
		stroke: "#000000",
		strokeThickness: 4,
		dropShadow: false,
		dropShadowColor: "#666666",
		lineJoin: "round"
	});
	container.addChild(text);
	text.x = 140;
	text.y = 20;

	// Snow
	for (let i = 0; i < MAX_NUM; i++) {
		let snow = PIXI.Sprite.from(res.snow_data.texture);

		// x position
		let xNum = Math.floor(Math.random() * STAGE_WIDTH + 1);
		snow.x = xNum;

		// y position
		let yNum = -Math.floor(Math.random() * 100 + 1);
		snow.y = yNum;

		// scale
		let scaleNum = Math.random() * (MAX_SCALE - MIN_SCALE) + MIN_SCALE;
		snow.scale.x = scaleNum;
		snow.scale.y = scaleNum;

		// direction of rotation
		let rotateDirecNum = Math.floor(Math.random() * 2 + 1);
		rotateDirecNum === 1
			? (rotateDirecNum = ROTATE_LEFT)
			: (rotateDirecNum = ROTATE_RIGHT);

		// acceleration
		let accelNum = Math.floor(Math.random() * MAX_ACCEL + 1);
		accelNums.push(accelNum);

		// transparency
		let alphaNum =
			Math.floor((Math.random() * (MAX_ALPHA - MIN_ALPHA) + MIN_ALPHA) * 10) / 10;
		snow.alpha = alphaNum;

		// radius
		let radiusNum = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
		radiusNums.push(radiusNum);

		// angle
		let angleNum = Math.floor(Math.random() * 360 + 1);
		angleNums.push(angleNum);

		snows.push(snow);
		container.addChild(snow);
	}

	ticker.start(); // reder start

}

/**
 * app rendering
 * @param { number } time
 */
function update(time) {
	for (let i = 0; i < MAX_NUM; i++) {
		// radian
		let radian = (angleNums[i] * Math.PI) / 180;

		snows[i].x += radiusNums[i] * Math.cos(radian);

		snows[i].y += 1 * accelNums[i];
		angleNums[i] += 5;

		// +rotation

		// moved out of screen
		if (STAGE_HEIGHT + snows[i].height < snows[i].y) {
			let xNew = Math.floor(Math.random() * STAGE_WIDTH + 1);
			snows[i].x = xNew;
			snows[i].y = -snows[i].height;
		}
	}

}
