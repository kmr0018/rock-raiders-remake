makeChild("LandSlide","RygameObject");
LandSlide.prototype.update = function() {
	this.life-=1;
	//update effect transparency to create a fade-out
	this.drawSurface.clearRect(0,0,this.image.width,this.image.height);
	this.drawSurface.globalAlpha = this.life/this.maxLife;
	this.drawSurface.drawImage(this.image,0,0);
	if (this.life %10 == 0) { //deal damage to raiders in 5 intervals over lifespan (every 10 frames)
		for (var i = 0; i < raiders.objectList.length; ++i) {
			if (collisionRect(this,raiders.objectList[i])) {
				raiders.objectList[i].hurt(this.damagePerInstance);
			}
		}
	}
	if (this.life == 0) {
		this.die();
	}
};

function LandSlide(space) {
	this.image = "landslide 1 (1).png";
	RygameObject.call(this,0,0,10,10,this.image,gameLayer);
	this.setCenterX(space.centerX());
	this.setCenterY(space.centerY());
	this.maxLife = 81;
	this.life=this.maxLife;
	this.damagePerInstance = 3;
}