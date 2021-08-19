var towerImg, tower;
var doorImg, door;
var climberImg, climber;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var obstacleclimberGroup;
var obstacledoorGroup;
var frameDelay;
var obstacledoorSprite;
var obstacleclimberSprite;
var xpos;
var edges;
//var gravity = true;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300, 300);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
  obstacleclimberGroup = new Group();
  obstacledoorGroup = new Group();
  edges = createEdgeSprites();
}

function draw() {
  background("black");
  obstacles();
  //ghost.collide(edges);
  if (gameState === "play") {
    // play gamestate
    drawSprites();
    if (obstacleclimberGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    //ghost.debug = true;
    if (keyDown("space")) {
      ghost.velocityY = -3;
    }
    if (keyDown("left")) {
      ghost.velocityX = -3;
    }
    if (keyDown("right")) {
      ghost.velocityX = 3;
    }
    if (ghost.isTouching(edges) || ghost.isTouching(obstacledoorGroup)) {
      gameState = "end";
    }
    //if (gravity) {
    ghost.velocityY += 0.75;
   // }
  } else if (gameState === "end") {
    // end gamestate
    text("You Lose", width/2, height/2);
  }

  if(tower.y > 400){
      tower.y = 300;
  }
}
function obstacles () {
  frameDelay = Math.round(random(60, 600));
  if ((frameCount % frameDelay) === 0) {
    xpos = Math.round(random(50, 550));
    obstacledoorSprite = createSprite(xpos, 50);
    obstacleclimberSprite = createSprite(xpos, 75);
    obstacledoorSprite.addImage("door", doorImg);
    obstacleclimberSprite.addImage("climber", climberImg);
    //obstacleclimberSprite.debug = true;
    //obstacledoorSprite.debug = true;
    obstacledoorSprite.lifetime = 500;
    obstacleclimberSprite.lifetime = 500;
    obstacleclimberSprite.scale = 0.5;
    obstacledoorSprite.scale = 0.5;
    obstacledoorGroup.add(obstacledoorSprite);
    obstacleclimberGroup.add(obstacleclimberSprite);
    obstacleclimberSprite.velocityY = 1;
    obstacledoorSprite.velocityY = 1;
  }
}
