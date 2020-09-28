var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;

var score;
var gameOver,Restart,gameImg,reImg;



function preload(){
  createCanvas(400,400);
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
bananaImage = loadImage("banana.png");
 gameImg = loadImage("gameOVERIMG.jpg");  
  reImg = loadImage("restartIMG.jpg");
}
function setup() {

  monkey = createSprite(80,315,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-10;
  
  obstaclesGroup = new Group();
  FoodGroup = new Group();
  
  gameOver= createSprite(200,100);
  gameOver.addImage(gameImg);
  
  restart = createSprite(300,140);
  restart.addImage(reImg);
   
  score=0;
}


function draw() {
  background(220);
  
  if (gameState===PLAY){
  monkey.collide(ground);
  
    gameOver.visible=false;
    restart.visible=false;
    
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
      /* stroke("white");
    textSize(20);
    fill("white");
    text("Score:"+ score,500,50);*/
    
    stroke("black");
    textSize(20);
    fill("black")
    score=Math.ceil(frameCount/frameRate())
      text("SurvivalTime:"+ score, 200,20);
    
    
  monkey.velocityY=monkey.velocityY+0.8;
  
 if(keyDown("space")&& monkey.y >= 310) {
       monkey.velocityY = -12;
    }
  
    if(obstaclesGroup.isTouching(monkey)){
                                             
        gameState = END;
    }     
   
    if (gameState === END) {
      //gameOver.visible = true;
      //restart.visible = true;
     obstaclesGroup.velocityX=0;
     FoodGroup.velocityX=0;
     //change the trex animation
      //trex.changeAnimation("collided", trex_collided);
    /*gameOver.visible=true;
     restart.visible=true;*/
     if (mousePressedOver("Restart")){
       reset();
     }
     
   }
    obstacles();
    bananas();
  
  drawSprites();
  }
}


function reset(){
  gameState=PLAY;
 gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
 FoodGroup.destroyEach();                        
  //trex.changeAnimation("running",trex_running);
  score=0;
}

function obstacles (){
 if (frameCount % 300 === 0){
   obstacle = createSprite(400,330,10,10); 
obstacle.addImage(obstacleImage);  
obstacle.scale=0.1;
obstacle.velocityX=-5; 
   obstacle.collide(ground);
   obstaclesGroup.add(obstacle);
 }
}

function bananas(){
  if (frameCount % 80 === 0){
banana = createSprite(300,290,10,10);
 banana.addImage(bananaImage); 
banana.scale=0.1;
    banana.velocityX=-5;
    FoodGroup.add(banana);
  }
}






