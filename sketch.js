const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var fruit_con_4;
var fruit_con_5;
var fruit_con_6;
var fruit_con_7;


var rope3;
var rope4;
var bg_img;
var food;
var rabbit;

var button,button2,button3,button4, button5, button6, button7;
var bunny;
var blink,eat,sad;
var mute_btn;
var rope5;
var rope6;
var rope7;

var fr;
var star_img;
var star2_img

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  star_img= loadImage("star.png");

  empty_star = loadAnimation("empty.png");
  one_star = loadAnimation("one_star.png");
  two_star = loadAnimation("stars.png");



  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  star=createSprite(320,50,20,20);
  star.addImage(star_img);
  star.scale=0.02

  star2=createSprite(50,370,20,20);
  star2.addImage(star_img);
  star2.scale=0.02



  
  
  star_display = createSprite(50,20,30,30);
  star_display.scale = 0.2;
  star_display.addAnimation('empty',empty_star);
  star_display.addAnimation('one',one_star);
  star_display.addAnimation('two',two_star);
  star_display.changeAnimation('empty');

  
  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(80,450);
  button.size(50,50);
  button.mouseClicked(drop);

  blower = createImg('baloon2.png');
  blower.position(300,370);
  blower.size(120,120);
  blower.mouseClicked(airblow);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(390,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);

   button3 = createImg('cut_btn.png');
   button3.position(460,130);
   button3.size(50,50);
   button3.mouseClicked(drop3);

   button4 = createImg('cut_btn.png');
   button4.position(230,90);
   button4.size(50,50);
   button4.mouseClicked(drop4);


   button5 = createImg('cut_btn.png');
   button5.position(480,500);
   button5.size(50,50);
   button5.mouseClicked(drop5);

   button6 = createImg('cut_btn.png');
   button6.position(60,200);
   button6.size(50,50);
   button6.mouseClicked(drop6);

   button7 = createImg('cut_btn.png');
   button7.position(80,100);
   button7.size(50,50);
   button7.mouseClicked(drop7);
 
   rope = new Rope(10,{x:100,y:450});
   rope2 = new Rope(7,{x:400,y:90});
   rope3 = new Rope(7,{x:480,y:130});
  rope4 = new Rope(7,{x:250,y:90});
  rope5 = new Rope(11,{x:500,y:500});
  rope6 = new Rope(6,{x:80,y:200});
  rope7 = new Rope(11,{x:100,y:100});


  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(300,height,width,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(200,height-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  fruit_con_3 = new Link(rope3,fruit);
  fruit_con_4 = new Link(rope4,fruit);
  fruit_con_5 = new Link(rope5,fruit);
  fruit_con_6 = new Link(rope6,fruit);
  fruit_con_7 = new Link(rope7,fruit);
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();
  rope4.show();
  rope5.show();
  rope6.show();
  rope7.show();



  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny,80)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
   }

   if(collide(fruit,star,20)==true)
   {
    star.visible=false;
     star_display.changeAnimation('one');
    
   }
 
   if(collide(fruit,star2,40)==true)
   {
    star2.visible=false;
     star2_display.changeAnimation('two');
    
   }
 
  
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}
function drop3()
{
  cut_sound.play();
rope3.break();
fruit_con_3.dettach();
fruit_con_3 = null;
}

function drop4()
{
  cut_sound.play();
rope4.break();
fruit_con_4.dettach();
fruit_con_4 = null;
}

function drop5()
{
  cut_sound.play();
rope5.break();
fruit_con_5.dettach();
fruit_con_5 = null;
}

function drop6()
{
  cut_sound.play();
rope6.break();
fruit_con_6.dettach();
fruit_con_6 = null;
}


function drop7()
{
  cut_sound.play();
rope7.break();
fruit_con_7.dettach();
fruit_con_7 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}


function airblow()
{
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.03});
  air.play();
}