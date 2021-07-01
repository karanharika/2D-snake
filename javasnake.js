const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
const size = Math.round(canvas.width / 50);
const xEnd = Math.round(canvas.width / size) * size;
const yEnd = Math.round(canvas.height / size) * size;
let directionLock = false;
let gameStart = document.getElementById('start')
let instructions = document.getElementById('instruction')
let scoreBoard = document.getElementById('score')
let score = 0;
let endScreen = document.getElementById('end')
let playAgain = document.getElementById('restart')
let endScore = document.getElementById('result')

// States
const snake = [{x: 0, y: 0}];
const apple = {};
let direction = 'right';
let speed = 150;

function random (min, max) {
  return Math.random() * (max - min) + min;
}

function setApple() {
  apple.x = Math.round(random(size, canvas.width - size) / size) * size;
  apple.y = Math.round(random(size, canvas.height - size) / size) * size;
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, size, size);  

  for (let i = 0; i < snake.length; i += 1){
    const s = snake[i];
    context.fillStyle = '#fff';
    context.fillRect(s.x, s.y, size, size);
  }

  window.requestAnimationFrame(draw);
}

function scoreSystem() {
  score += 1
  scoreBoard.innerHTML = 'Score: ' + score
}

function gameOver() {
    endScreen.style.display = 'block'
    playAgain.style.display = 'block'
    endScore.style.display = 'block'
    scoreBoard.style.display = 'none'
    endScore.innerHTML = "Final Score is: " + score;
    snake[i].x = 0;
    snake[i].y = 0;
}

function tick() {
  for (let i=snake.length-1; i>=0; i--) {
    if (i === 0 && snake[i].x === apple.x && snake[i].y === apple.y) {
      snake.push({});
      speed *= 0.99;
      scoreSystem();
      setApple();
    }

    const s = snake[i];
    if (i == 0) {
      switch(direction) {
        case 'right':
        case 'd':
          if (s.x > canvas.width) gameOver();
          else s.x += size;
          break;
        case 'down':
        case 's':
          if (s.y > canvas.height) gameOver();
          else s.y += size;
          break;
        case 'left':
        case 'a':
          if (s.x < 0) s.x = gameOver();
          else s.x -= size;
          break;
        case 'up':
        case 'w':
          if (s.y < 0) s.y = gameOver();
          else s.y -= size;
      }

      for (let j = 1; j < snake.length; j += 1) {
        if (snake[0].x === snake[j].x && snake[0].y === snake[j].y) {
          // alert('GAME OVER');
          gameOver()
          // window.location.reload();
        }
      }

    } else {
      snake[i].x = snake[i-1].x;
      snake[i].y = snake[i-1].y;
    }
  }
  window.setTimeout(tick, speed);
  directionLock = false;
}

function onKeyDown(e) {
  if (!directionLock) {
    directionLock = true;
    if (e.key.length >= 5) newDirection = e.key.substr(5).toLowerCase();
    else newDirection = e.key

    if (direction === 'left' && newDirection !== 'right') direction = newDirection;
    if (direction === 'a' && newDirection !== 'd') direction = newDirection;
    if (direction === 'up' && newDirection !== 'down') direction = newDirection;
    if (direction === 'w' && newDirection !== 's') direction = newDirection;
    if (direction === 'down' && newDirection !== 'up') direction = newDirection;
    if (direction === 's' && newDirection !== 'w') direction = newDirection;
    if (direction === 'right' && newDirection !== 'left') direction = newDirection;
    if (direction === 'd' && newDirection !== 'a') direction = newDirection;
  }
}

function beginGame() {
  gameStart.style.display = 'none'
  instructions.style.display = 'none'
  scoreBoard.style.display = 'block'
  setApple();
  window.addEventListener('keydown', onKeyDown);
  window.setTimeout(tick, speed);
  window.requestAnimationFrame(draw);
}

function reset() {
    window.location.reload();
}

gameStart.onclick = beginGame
playAgain.onclick = reset