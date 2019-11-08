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
let score = document.querySelector('.score span')
let health = document.querySelector('.health span')
let gameOverMessage = document.querySelector('.replayDiv h1');
let replayMessage = document.querySelector('.replayDiv h3');
let deadPlayerImg = document.querySelector('.dead-player');
let enemies = document.querySelectorAll('enemies')


// let snoop = document.querySelector('.snoop')

// wirte function to move player by using top and left properties

let enemySpawnInterval








let moveUp = ()=>{
	let topPosition = window.getComputedStyle(player).getPropertyValue('top');
	if(player.style.top === '0px'){ 
		return 
	}else {
		let position = parseInt(topPosition)
		position -= 20
		player.style.top = `${position}px`
	}
}

let moveDown = ()=>{
	let topPosition = window.getComputedStyle(player).getPropertyValue('top');
	if(parseInt(player.style.top) > parseInt(window.getComputedStyle(gameScreen).getPropertyValue('height')) - 242){
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
	if(parseInt(player.style.left) > parseInt(window.getComputedStyle(gameScreen).getPropertyValue('width')) - 160){
		return
	}else{
		let position = parseInt(leftPosition)
		position += 20
		player.style.left = `${position}px`
	}
}

// use key codes for A=65, S=83, D=68, W=87, spacebar=32 to call functions for movement

const guyMoves = (e)=>{
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
		if(xPosition > parseInt(window.getComputedStyle(gameScreen).getPropertyValue('width')) - 20){
			laser.remove();
			clearInterval(laserInterval)
			return
		} else{
			laser.style.left = `${xPosition+4}px`
		}
	}, 1)
}


// Event listener for ship to move, fire laser





// Create an array for enemy images stored in Game-Images folder. 
// Create an enemy element, append enemy element to gameScreen, make enemy element come from the right side.
// Make random enemy img come from the random spot along the y axis.


const ENEMYarr = ['Game-Images/Enemy1.png', 'Game-Images/Enemy2.png', 'Game-Images/Enemy3.png']

let createEnemyElement = ()=>{
	let newEnemyElmnt = document.createElement('img')
	let randomImgSrc = ENEMYarr[Math.floor(Math.random()*ENEMYarr.length)]
	let randomTopNumber = Math.floor(Math.random()*516)
	let leftNewEnemyElmntProperty = parseInt(window.getComputedStyle(gameScreen).getPropertyValue('width')) - 20

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
				health.innerText = parseInt(health.innerText) - 25
				if(parseInt(health.innerText) == 0){
					gameOver();
				}
			}
			enemy.remove();
		}else{
			enemy.style.left =`${xPosition - 4}px`
		}
	}, 10)
}
/*
// Function to lest enemy coming in and EventListener to call it using the E key, E=69.

let letMonsterRoll = (e)=>{
	if(e.which == 69){
		createEnemyElement();
	}
}

document.addEventListener('keydown',letMonsterRoll)
*/





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

let removeAll = (classOfElement)=>{
	for(let i = 0; i<classOfElement.length; i++){
	gameScreen.removeChild(classOfElement[i])
	}
}


const gameOver = ()=>{
	alert(`GAME OVER. PLAYER SCORE ${score.innerText}`);
	clearInterval(enemySpawnInterval);
	// snoop.style.display = 'none';
	document.removeEventListener('keydown', guyMoves)


	//removing all enemies after game over
	let allEnemies = document.querySelectorAll('.enemy')
	removeAll(allEnemies);
	//removing all bullets after game over
	let allLasers = document.querySelectorAll('.laser')
	removeAll(allLasers);

	player.style.top = '180px';
	player.style.left = '20px';

	deadPlayerImg.classList.add('reappear');
	gameOverMessage.classList.add('reappear');
	replayMessage.classList.add('reappear');


	replayMessage.addEventListener('click',()=>{
		score.innerText = '0'
		health.innerText = '200'
		startGame();
	})
}


let startGame = ()=>{
	deadPlayerImg.classList.remove('reappear');
	gameOverMessage.classList.remove('reappear');
	replayMessage.classList.remove('reappear');
	startButton.style.display = 'none';
	startButton.style.opacity = '0';
	// snoop.style.display = 'block';
	document.addEventListener('keydown', guyMoves)
	enemySpawnInterval = setInterval(createEnemyElement, 1000);
	// e.preventDefault();
}



let startButton = document.querySelector('.start');
startButton.addEventListener('click', startGame);




// ENEMY WIDTH 130 TOP 166

//Math.floor(Math.random()*enemiesArr.length)














// let screen = gameScreen.getContext('2d')
// player.addEventListener('click', function(){this.style['background-color'] = 'red'})

/*.  This grabs css properties for element
let game = document.querySelector('.gameScreen')
window.getComputedStyle(game).width

*/

