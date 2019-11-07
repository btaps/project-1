// Create player class
class Player{
	constructor(){
		this.HP = 100,
		this.damage = Math.floor((Math.random()*16)+5),
		this.ammo = 100,
		this.weapon = 'gun'
	}
}
// Create enemy class
class Enemy{
	constructor(){
		this.HP = 25
	}
}

// function to create enemies and put into array
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


//PLayer created

const druggie = new Player();

// Find a way to select the game screen and the player

let gameScreen = document.querySelector('.gameScreen')
let player = document.querySelector('.player')

// wirte function to move player by using top and left properties

const clickStart = ()=>{

startButton.style.display = 'none';
let score = document.querySelector('.score span')
let health = document.querySelector('.health span')

let moveUp = ()=>{
	let topPosition = window.getComputedStyle(player).getPropertyValue('top');
	if(player.style.top === '-20px'){ 
		return 
	}else {
		let position = parseInt(topPosition)
		position -= 20
		player.style.top = `${position}px`
	}
}

let moveDown = ()=>{
	let topPosition = window.getComputedStyle(player).getPropertyValue('top');
	if(player.style.top === '460px' ){
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
	if(player.style.left === '1220px'){
		return
	}else{
		let position = parseInt(leftPosition)
		position += 20
		player.style.left = `${position}px`
	}
}

// use key codes for A=65, S=83, D=68, W=87, spacebar=32 to call functions for movement

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

//Create a laser element, append laser element to the game screen, make laser element move to the right

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
	newLaser.style.left = `${xPosition +110}px`;
	newLaser.style.top = `${yPosition +110}px`;

	return newLaser;

}

let moveLaser = (laser)=>{
	let laserInterval = setInterval(()=>{
		let xPosition = parseInt(laser.style.left)
		let yPosition = parseInt(laser.style.left)
		let allEnemies = document.querySelectorAll('.enemy')
		allEnemies.forEach(enemy=>{
			if(checkIfLaserHitEnemy(laser, enemy)){
				enemy.src = "Game-Images/Explosion.png"
				enemy.classList.remove('enemy')
				enemy.classList.add('dead-enemy')
				laser.remove();
				clearInterval(laserInterval)
				score.innerText = parseInt(score.innerText) + 100

			}
		})
		if(xPosition > 1340){
			laser.remove();
			clearInterval(laserInterval)
			return
		} else{
			laser.style.left = `${xPosition+4}px`
		}
	}, 1)
}


// Event listener for ship to move, fire laser

document.addEventListener('keydown', shipMoves)

// Create an array for enemy images stored in Game-Images folder. 
// Create an enemy element, append enemy element to gameScreen, make enemy element come from the right side.
// Make random enemy img come from the random spot along the y axis.


const ENEMYarr = ['Game-Images/Enemy1.png', 'Game-Images/Enemy2.png', 'Game-Images/Enemy3.png']

let createEnemyElement = ()=>{
	let newEnemyElmnt = document.createElement('img')
	let randomImgSrc = ENEMYarr[Math.floor(Math.random()*ENEMYarr.length)]
	let randomTopNumber = Math.floor(Math.random()*516)
	let leftNewEnemyElmntProperty = parseInt(window.getComputedStyle(gameScreen).getPropertyValue('width'))

	// console.log(randomTopNumber)
	// randomHeightNumber(randomTopNumber);
	newEnemyElmnt.src = randomImgSrc;
	newEnemyElmnt.classList.add('enemy')
	newEnemyElmnt.classList.add('fadeOutExplosion')
	newEnemyElmnt.style.left = `${leftNewEnemyElmntProperty - 104}px`
	newEnemyElmnt.style.top = `${randomTopNumber}px`
	gameScreen.appendChild(newEnemyElmnt);
	moveEnemy(newEnemyElmnt);
}

let moveEnemy = (enemy)=>{
	let moveEnemyInterval = setInterval(()=>{
		let xPosition = parseInt(window.getComputedStyle(enemy).getPropertyValue('left'));
		if(xPosition <= 50){
			if(enemy.classList == 'enemy fadeOutExplosion'){
				gameOver();
			}
			enemy.remove();
			
		}else{
			enemy.style.left =`${xPosition - 4}px`
		}
	}, 10)
}

// Function to lest enemy coming in and EventListener to call it using the E key, E=69.

let letMonsterRoll = (e)=>{
	if(e.which == 69){
		createEnemyElement();
	}
}

document.addEventListener('keydown',letMonsterRoll)
//Creates enemy every 3 seconds
let secondsToSpawn = 3000


setInterval(()=>{setTimeout(createEnemyElement, 1000)}, 1000)

//function to check if Enemy is hit by laser. 

let checkIfLaserHitEnemy = (laser, enemy)=>{
	let laserLeft = parseInt(laser.style.left)
	let laserTop = parseInt(laser.style.top)
	let laserBottom = laserTop - 30
	let enemyLeft = parseInt(enemy.style.left)
	let enemyTop = parseInt(enemy.style.top)
	let enemyBottom = enemyTop + 150

	if(laserLeft != 1340 && laserLeft >= enemyLeft){
		if(laserTop >= enemyTop && laserTop <= enemyBottom){
			laserTop = laserTop - laserTop
			// alert('true')
			return true
		}else{
			// alert('false')
			return false
		}
	}else{
		return false
	}
}

const gameOver = ()=>{
	health.innerText = parseInt(health.innerText) - 25

	if(parseInt(health.innerText) == 0){
		alert('GAME OVER')
	}
}

}
let startButton = document.querySelector('.start');

startButton.addEventListener('click', clickStart)




// ENEMY WIDTH 130 TOP 166

//Math.floor(Math.random()*enemiesArr.length)














// let screen = gameScreen.getContext('2d')
// player.addEventListener('click', function(){this.style['background-color'] = 'red'})

/*.  This grabs css properties for element
let game = document.querySelector('.gameScreen')
window.getComputedStyle(game).width

*/

