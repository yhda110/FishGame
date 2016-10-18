var babyObj = function(){
	this.x;
	this.y;
	this.angle;
	this.babyEye = new Image();
	this.babyBody = new Image();

	this.babyTailTimer = 0;
	this.babyTailCount = 0;
}
babyObj.prototype.init = function(){
	this.x = canWidth*.5 -50;
	this.y = canHeight*.5 + 50;
	this.angle = 0;
	this.babyEye.src = './src/babyEye0.png'
	this.babyBody.src = './src/babyFade0.png'
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

	//鱼尾巴动画
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer>50){
		this.babyTailCount=(this.babyTailCount+1)%8;
		this.babyTailTimer %=50;
	}
	var babyCount = this.babyTailCount;
	//ctx1
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(
		babyTail[babyCount],
		-babyTail[babyCount].width*.5+23,
		-babyTail[babyCount].height*.5
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
