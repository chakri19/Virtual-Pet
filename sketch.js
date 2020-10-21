var database, sadDog, sadDog1;
var dog,happyDog, dog1;
var foodS, foodStock;
var feedDog, addFood, currentTime;
var fedTime, lastFed, feed;
var foodObj, gameState = "Play";
var changeGameState,readGameState;
var bedRoom, garden, washRoom, bedRoom1, garden1, washRoom1; 


function preload(){
  dog1 = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  sadDog1 = loadImage("virtual pet images/deadDog.png");

  bedRoom1 = loadImage("virtual pet images/Bed Room.png");
  garden1 = loadImage("virtual pet images/Garden.png");
  washRoom1 = loadImage("virtual pet images/Wash Room.png");
}

function setup() {
  createCanvas(850,500);
  
  
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  foodObj = new Food();

  imageMode(CENTER);
  dog = createSprite(500,270,30,30);
  dog.addImage(dog1);
  dog.scale = 0.4;
  dog.rotation = -90; 

  feed = createButton("Feed the Dog!");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food!");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  //read gameState from database
  readGameState = database.ref("gameState");
  readGameState.on("value",function(data){
    gameState = data.val();
  })
}

function draw() {  
  background(46,139,87);

  drawSprites();

  textSize(25);
  fill (0);
  text("Food Remaining:"+foodS,240,100);

  fedTime = database.ref("feedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>12){
    text("Last Fed: "+lastFed%12+"PM",350,30);
  }
  else if(lastFed==12){
    text("Last Fed: 12 PM",350,30);
  }
  else if(lastFed==0){
    text("Last Fed: 12 AM",350,30);
  }
  else{
    text("Last Fed: "+lastFed+"AM",350,30);
  }

  if (gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.visible = false;
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog1);
    dog.visible = true;
  }

  currentTime = hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if (currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedRoom();
  }else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washRoom();
  }else{
    update("Hungry");
    foodObj.display();
  }

  foodObj.display();
}

//read values
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//write values


//update food Stock and last Fed Time
function feedDog(){
   dog.addImage(happyDog);

   if (foodS<=0){
     foodS = 0;
     foodObj.updateFoodStock(foodS);
   }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   }
   database.ref("/").update({
   Food:foodObj.getFoodStock(),
   feedTime:hour()
   })
}

//add food to stock
function addFoods(){
  foodS++;
  database.ref("/").update({
    Food: foodS
  })
}

function update(state){
  database.ref("/").update({
    gameState:state
  })
}