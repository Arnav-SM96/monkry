
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var score
var bananaGroup;
var obstaclesGroup;
var score;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 300);

  monkey = createSprite(80,250,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.09;
  
  ground = createSprite(50,285,1100,20);
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
score=0;
}


function draw() {
background("white");
  
  if(keyDown("space")&& monkey.y >= 100) {
 monkey.velocityY = -12;
    }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
  
  if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    score=score+1;
    }
  text("Score: "+ score, 270,50);
  
  
  
  if(gameState === PLAY){
  spawnobstacle();
  spawnbanana();
    if(obstaclesGroup.isTouching(monkey)){
      gameState=END;
    }
  }
  
  else if(gameState===END){
    bananaGroup.destroyEach();
    obstaclesGroup.destroyEach();
        bananaGroup.setVelocityXEach(0);
 obstaclesGroup.setVelocityXEach(0);
    score=0;
  }
  
  drawSprites();

}

function spawnbanana() {
  
  if (frameCount % 200 === 0) {
     banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(100,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
   bananaGroup.add(banana);
    }
}

function spawnobstacle() {
  
  if (frameCount % 160 === 0) {
     obstacle = createSprite(600,260,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3;
    obstacle.lifetime = 220;
   obstaclesGroup.add(obstacle);
    }
}


