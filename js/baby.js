var babyObj = function(){
	this.x;
	this.y;
	this.angle;
	this.babyEye = new Image();
	this.babyBody = new Image();
	this.babyTail = new Image();
}
babyObj.prototype.init = function(){
	this.x = canWidth*.5 -50;
	this.y = canHeight*.5 + 50;
	this.angle = 0;
	this.babyEye.src = './src/babyEye0.png'
	this.babyBody.src = './src/babyFade0.png'
	this.babyTail.src = './src/babyTail0.png'
}
babyObj.prototype.draw = function(){
	//lerp目标值
	this.x = lerpDistance(mom.x,this.x,.996);
	this.y = lerpDistance(mom.y,this.y,.996);
	//角度
	var deltaY =  mom.y - this.y;
	var deltaX =  mom.x - this.x;

	var beta = Math.atan2(deltaY,deltaX) + Math.PI;
	this.angle = lerpAngle(beta, this.angle, .9)

	//ctx1
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(
		this.babyTail,
		-this.babyTail.width*.5+23,
		-this.babyTail.height*.5
	);
	ctx1.drawImage(
		this.babyBody,
		-this.babyBody.width*.5,
		-this.babyBody.height*.5
	);
	ctx1.drawImage(
		this.babyEye,
		-this.babyEye.width*.5,
		-this.babyEye.height*.5
	);
	ctx1.restore();
}
