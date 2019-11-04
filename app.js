class Player{
	constructor(){
		this.HP = 100,
		this.damage = Math.floor((Math.random()*16)+5),
		this.ammo = 100

	}
}

class Enemy{
	constructor(){
		this.HP = 25
	}
}

const druggie = new Player()
let bagOfChips = new Enemy()
console.log(druggie)