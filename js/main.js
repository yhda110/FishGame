var can1;
var can2;

var ctx1;
var ctx2;

//获取画布尺寸
var canWidth;
var canHeight;

var lastTime;//上一帧时间
var deltaTime;// 两帧时间差

var ane;
var fruit;

//鼠标位置
var mx;
var my;

//绘制背景图片
var bgPic = new Image();

//定义大鱼
var mom;
//定义小鱼
var baby;
//动画
var babyTail = [];
var momTail = [];

document.body.onload = game;
function game(){
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}
function init(){
    //获得canvas context
    
    can1 = document.getElementById('canvas1');
    ctx1 = can1.getContext('2d');
    //fishes , dust , ui , circle
    
    can2 = document.getElementById('canvas2');
    ctx2 = can2.getContext('2d');

    //检测鼠标移动
    can1.addEventListener('mousemove',onMouseMove,false);

    //background , ane , fruit
    bgPic.src = './src/background.jpg';
    
    //画布尺寸
    canWidth = can1.width;
    canHeight = can1.height;

    //绘制海葵
    ane = new aneObj();
    ane.init();
    //绘制食物
    fruit = new fruitObj();
    fruit.init();
    //绘制鱼
    mom = new momObj();
    mom.init();
    baby = new babyObj();
    baby.init();

    //初始鼠标位置
    mx = canWidth*.5;
    my = canHeight*.5;

    //初始化尾巴
    for(var i = 0;i < 8;i ++){
        babyTail[i] = new Image();
        momTail[i] = new Image();
        babyTail[i].src = './src/babyTail' + i + '.png';
        momTail[i].src = './src/bigTail' + i + '.png';
    }
}
function gameloop(){
    window.requestAnimFrame(gameloop);//setInsterval,setTimeout无法解决的，根据机器性能来计算，比较智能,但会导致帧与帧之间的时间间隔不固定FPS

    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    deltaTime = (deltaTime>40)?40:deltaTime;
    //显示到页面上FPS
    document.getElementById('FPS').innerHTML = deltaTime;

    //绘制背景
    drawBackground();
    ane.draw();
    fruit.draw();
    fruit.fruitMonitor();

    ctx1.clearRect(0,0,canWidth,canHeight);
    baby.draw();
    mom.draw();

    momFruitCllision();


}
function onMouseMove(e){
    if(e.offSetX||e.layerX){
        mx = e.offSetX == undefined ? e.layerX : e.offSetX; 
        my = e.offSetY == undefined ? e.layerY : e.offSetY; 
    }
}