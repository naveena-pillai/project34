//Create variables here
var dog, happyDog, hungryDog, database, foodS, foodStock;

function preload()
{
  //load images here
  happyDog = loadImage("images/dogImg1.png");
  hungryDog = loadImage("images/dogImg.png");
  
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,400,40,40);
  dog.addImage(hungryDog);
  dog.scale = 0.2;

  
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  textSize(18);
  fill(0);
  text("Press UP ARROW KEY To Feed The Dog",80,75);

  textSize(18);
  fill(0);
  text("Food Remaining: "+foodS,175,250);
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}


