class Player{
	constructor(){
		this.HP = 100,
		this.damage = Math.floor((Math.random()*16)+5),
		this.ammo = 100,
		this.weapon = 'gun'
	}
}

class Enemy{
	constructor(){
		this.HP = 25
	}
}

const druggie = new Player();
const hotdog = new Enemy();
const cookie = new Enemy();
const pizza = new Enemy();

let shooter = document.querySelector('.player')
let keyLeft = false
let keyRight = false

const keyDown = (e)=>{
	if(e.keycode == 65){
		console.log('left')
		keyLeft = true;
	}else if(e.keycode == 68){
		console.log('right')
		keyRight = true;
	}
}

let keyUp = (e)=>{
	if(e.keycode == 65){
		keyLeft = false;
	}else if(e.keycode == 68){
		keyRight = false;
	}
}


/*.  This grabs css properties for element
let game = document.querySelector('.gameScreen')
window.getComputedStyle(game).width

*/

