var momObj = function(){
	this.x;
	this.y;
	//定义大鱼角度
	this.angle;
	this.bigEye = new Image();
	this.bigBody = new Image();
	this.bigTail = new Image();
}
momObj.prototype.init = function(){
	this.x = canWidth*.5;
	this.y = canHeight*.5;
	this.angle = 0;
	//加载资源
	this.bigEye.src = './src/bigEye0.png';
	this.bigBody.src = './src/bigSwim7.png';
	this.bigTail.src = './src/bigTail7.png';

}
momObj.prototype.draw =function(){
	//lerp目标值
	this.x = lerpDistance(mx,this.x,.98);
	this.y = lerpDistance(my,this.y,.98);

	//角度
	var deltaY =  my - this.y;
	var deltaX =  mx - this.x;

	var beta = Math.atan2(deltaY,deltaX) + Math.PI;

	this.angle = lerpAngle(beta, this.angle, .9)


	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(this.bigTail,-this.bigTail.width*.5+30,-this.bigTail.height*.5);
	ctx1.drawImage(this.bigBody,-this.bigBody.width*.5,-this.bigBody.height*.5);
	ctx1.drawImage(this.bigEye,-this.bigEye.width*.5,-this.bigEye.height*.5);
	ctx1.restore();
}