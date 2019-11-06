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

const enemiesArr = []
const createEnemy = (name, arr, imageSrc)=>{
	newEnemy = new Enemy();
	newEnemy.name = name
	newEnemy.img = imageSrc
	arr.push(newEnemy)
}

createEnemy('hotdog', enemiesArr, "Game-Images/Enemy1.png");
createEnemy('cookie', enemiesArr, "Game-Images/Enemy2.png");
createEnemy('pizza', enemiesArr, "Game-Images/Enemy3.png");




const druggie = new Player();


let gameScreen = document.querySelector('.gameScreen')
let player = document.querySelector('.player')

let moveUp = ()=>{
	let topPosition = window.getComputedStyle(player).getPropertyValue('top');
	if(player.style.top === '-20spx'){ 
		return 
	}else {
		let position = parseInt(topPosition)
		position -= 20
		player.style.top = `${position}px`
	}
}

let moveDown = ()=>{
	let topPosition = window.getComputedStyle(player).getPropertyValue('top');
	if(player.style.top === '580px' ){
		return
	}else{
		let position = parseInt(topPosition)
		position += 20
		player.style.top = `${position}px`
	}
}

let moveLeft = ()=>{
	let leftPosition = window.getComputedStyle(player).getPropertyValue('left');
	if(parseInt(player.style.left) < 10){
		return
	}else{
		let position = parseInt(leftPosition)
		position -= 20
		player.style.left = `${position}px`
	}
}

let moveRight= ()=>{
	let leftPosition = window.getComputedStyle(player).getPropertyValue('left');
	if(player.style.left === '1340px'){
		return
	}else{
		let position = parseInt(leftPosition)
		position += 20
		player.style.left = `${position}px`
	}
}


const shipMoves = (e)=>{
	if(e.which == 65){
		moveLeft();
	}else if(e.which == 68){
		moveRight();
	}else if(e.which == 87){
		moveUp();
	}else if(e.which == 83){
		moveDown();
	}else if(e.which == 32){
		e.preventDefault()
		fireLaser()
	}
}

let fireLaser = ()=>{
	let laser = createLaserElement();
	gameScreen.appendChild(laser);

	moveLaser(laser);
}

let createLaserElement = ()=>{
	let xPosition = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
	let yPosition = parseInt(window.getComputedStyle(player). getPropertyValue('top'));
	let newLaser = document.createElement('img');

	newLaser.src = "Game-Images/laser1.png";
	newLaser.classList.add('laser');
	newLaser.style.left = `${xPosition}px`;
	newLaser.style.top = `${yPosition +30}px`;

	return newLaser;

}

let moveLaser = (laser)=>{
	let laserInterval = setInterval(()=>{
		let xPosition = parseInt(laser.style.left)
		if(xPosition > 1340){
			laser.remove();
		} else{
			laser.style.left = `${xPosition+4}px`
		}
	}, 10)
}

let randomHeightNumber = (number)=>{
	// let number = Math.floor(Math.random()*parseInt(window.getComputedStyle(gameScreen).getPropertyValue('height')))
	if (number > 580){
		number = 580
		return number
	}
}

document.addEventListener('keydown', shipMoves)

const ENEMYarr = ['Game-Images/Enemy1.png', 'Game-Images/Enemy2.png', 'Game-Images/Enemy3.png']

let createEnemyElement = ()=>{
	let newEnemyElmnt = document.createElement('img')
	let randomImgSrc = ENEMYarr[Math.floor(Math.random()*ENEMYarr.length)]
	let randomTopNumber = Math.floor(Math.random()*parseInt(window.getComputedStyle(gameScreen).getPropertyValue('height')))
	randomHeightNumber(randomTopNumber);
	newEnemyElmnt.src = randomImgSrc;
	newEnemyElmnt.classList.add('enemies')
	newEnemyElmnt.style.left = window.getComputedStyle(gameScreen).getPropertyValue('width')
	newEnemyElmnt.style.top = `${randomTopNumber}px`
	gameScreen.appendChild(newEnemyElmnt);
	moveEnemy(newEnemyElmnt);
}

let moveEnemy = (enemy)=>{
	let moveEnemyInterval = setInterval(()=>{
		let xPosition = parseInt(window.getComputedStyle(enemy).getPropertyValue('left'));
		if(xPosition <= 50){
			enemy.remove();
		}else {
			enemy.style.left =`${xPosition - 4}px`
		}
	}, 30)
}





//Math.floor(Math.random()*enemiesArr.length)














// let screen = gameScreen.getContext('2d')
// player.addEventListener('click', function(){this.style['background-color'] = 'red'})

/*.  This grabs css properties for element
let game = document.querySelector('.gameScreen')
window.getComputedStyle(game).width

*/

