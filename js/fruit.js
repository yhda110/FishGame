var fruitObj = function(){
	this.num = 30;
	this.alive = [];//bool,是否活着
	this.orange = new Image();
	this.blue = new Image();
	this.x = [];
	this.y = [];
	this.l = [];
	this.spd = [];
	this.fruitType = [];
}
fruitObj.prototype.init = function(){
	for(var i =0;i<this.num;i++){
		this.fruitType[i] = '';
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.born(i);
		this.spd[i] = Math.random()*.01+.005;
	}
	this.orange.src = './src/fruit.png';
	this.blue.src = './src/blue.png';
}
fruitObj.prototype.draw = function(){
	for (var i = 0; i < this.num; i++) {
		if(this.alive[i]){
			//draw
			//果实颜色
			if(this.fruitType[i] == 'blue'){
				var pic = this.blue;
			}else{
				var pic = this.orange;
			}
			//控制数量	
			if(this.l[i]<=14){
				this.l[i] +=this.spd[i]*deltaTime;
			}else{
				this.y[i] -=this.spd[i]*7*deltaTime;
			}
			ctx2.drawImage(
				pic,
				this.x[i]-this.l[i]/2,
				this.y[i]-this.l[i]/2,
				this.l[i],
				this.l[i]
			);
			if(this.y[i]<10){
				this.alive[i] = false;
			}
		}
	}
}
fruitObj.prototype.born = function(i){
	var aneID = Math.floor(Math.random()*ane.num);
	this.x[i] = ane.x[aneID];
	this.y[i] = canHeight - ane.len[aneID];
	this.l[i] = 0;
	this.alive[i] = true;
	var ran = Math.random();
	if(ran<.2){
		this.fruitType[i] = 'blue';
	}else{
		this.fruitType[i] = 'orange';
	}
}
fruitObj.prototype.update = function(){
	var num = 0;
	for(var i = 0;i< this.num;i++){
		if(this.alive[i]){
			num++;
		}
	}
}
fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}
fruitObj.prototype.fruitMonitor = function(){
	var num = 0;
	for (var i = 0; i < fruit.num; i++) {
		if(fruit.alive[i]){
			num++;
		}
		if(num <15){
			this.sendFruit();
			return;
		}
	}
}
fruitObj.prototype.sendFruit = function(){
	for (var i = 0; i < fruit.num; i++) {
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}