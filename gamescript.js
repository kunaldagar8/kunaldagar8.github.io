var color = ['blue','white','red','yellow','orange','violet','pink'];
var heartimg = ["url('./Images/Hearts/1.svg')","url('./Images/Hearts/2.svg')","url('./Images/Hearts/3.svg')","url('./Images/Hearts/4.svg')","url('./Images/Hearts/5.svg')","url('./Images/Hearts/6.svg')","url('./Images/Hearts/7.svg')","url('./Images/Hearts/8.svg')","url('./Images/Hearts/9.svg')","url('./Images/Hearts/10.svg')","url('./Images/Hearts/11.svg')","url('./Images/Hearts/13.svg')","url('./Images/Hearts/13.svg')","url('./Images/Hearts/14.svg')"]
var balloonimg = ["url('./Images/Balloons/b1.svg')","url('./Images/Balloons/b2.svg')","url('./Images/Balloons/b3.svg')","url('./Images/Balloons/b4.svg')"]
var bonusimg = ["url('./Images/bonus/1.svg')","url('./Images/bonus/2.svg')","url('./Images/bonus/3.svg')","url('./Images/bonus/4.svg')","url('./Images/bonus/5.svg')","url('./Images/bonus/6.svg')",]
var birdimg = ["url('./Images/Birds/1.svg')","url('./Images/Birds/2.svg')","url('./Images/Birds/3.svg')","url('./Images/Birds/4.svg')","url('./Images/Birds/5.svg')","url('./Images/Birds/6.svg')","url('./Images/Birds/7.svg')","url('./Images/Birds/8.svg')","url('./Images/Birds/9.svg')",]
// var w1 = document.getElementById("Game-info").offsetWidth;
// var h = window.innerHeight;
// var w = document.getElementById("balloonwindow").offsetWidth-300;

var lives;
var inlives;
var time;
var intime;
var f = false;
// console.log(w);
// lives
var timer = document.getElementById("timeinp");
var life = document.getElementById("lives");


function BalloonBurster(){
  var w1 = document.getElementById("Game-info").offsetWidth;
  var h = window.innerHeight;
  var w = document.getElementById("balloonwindow").offsetWidth-300;
  this.endbutton = null;
  this.pausebutton = null;
  this.startbutton = null;
  this.state = false;// to check if the game is paused or is in continuity
  this.Points = 0;// to count the balloons bursted
  this.update = null;// to store the setinterval of upadting the bottom
  this.add = null;// to store the setinterval of adding the balloons
  this.int = null;
  this.difficulty = 8;//to store the difficulty of the game
  this.shape=1;
  this.speed = 2.5;
  this.addB = null;
  this.bomb = null;
  this.fbomb = false;
  this.num;
  this.randomob = null;
  this.audiotime =  null;
  this.balloons = []; // array to store the balloons , to be used by the pushBottom function to update the bottom of ballons
  var thus = this;


  // to update the no. of balloons bursted
  this.PointsIncrement = function(Points){
    var Score=document.getElementById('Points');
    Score.innerHTML = Points;
  };

  this.removeObject=function(balloon){//removes the ballon after it gets clicked

    thus.Points += 1;
    thus.PointsIncrement(thus.Points);
    balloon.parentNode.removeChild(balloon);
    
  };


  this.removeBomb= function(boom){
    lives--;
    document.getElementById("liveinp").innerHTML = lives ;
    boom.parentNode.removeChild(boom);
    var audiobomb = new Audio("./Sounds/bomb.wav");
    audiobomb.play();
  }

  this.removeBonus = function(bonus){
    thus.Points += 1;
    thus.PointsIncrement(thus.Points);
    bonus.parentNode.removeChild(bonus);
    time+=5;
    var audiobonus = new Audio("./Sounds/prize.wav");
    audiobonus.play();
  }


  //To add the Bonus Objects
  this.addBonus = function(){

    if(time>0 && lives>0){

      var bonus = document.createElement('div');
      bonus.classList.add('bonus');
      bonus.classList.add('object');

      bonus.style.left = w1+Math.floor(Math.random() *w)+'px';
      bonus.style.bottom = '500px';

      var idx = Math.floor(Math.random() * 6);
      bonus.style.backgroundImage = bonusimg[idx];

      bonus.onclick = function(){
        thus.removeBonus(bonus);
      }

      var balloonwindow=document.getElementById('balloonwindow');
      balloonwindow.appendChild(bonus);
      this.balloons.push(bonus);

    }
  };

  // To add the Bomb Objects
  this.addBomb = function(){

    if(time>0 && lives>0){

      var bomb = document.createElement('div');
      bomb.classList.add('bomb');
      bomb.classList.add('object');

      bomb.style.left = w1+Math.floor(Math.random() * w)+'px';
      bomb.style.bottom = '500px';

      bomb.style.backgroundImage = "url('./Images/bomb.svg')";

      bomb.onclick = function(){
        thus.removeBomb(bomb);
      }

      var balloonwindow=document.getElementById('balloonwindow');
      balloonwindow.appendChild(bomb);
      this.balloons.push(bomb);

    }

  };

  this.addBalloon = function(){

    var balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.classList.add('object');

    balloon.style.left = w1+Math.floor(Math.random() * w)+'px';
    balloon.style.bottom = '500px';

    var idx = Math.floor(Math.random() * 4);
    balloon.style.backgroundImage = balloonimg[idx];

    balloon.onclick = function(){
      thus.removeObject(balloon);
      var audioballoon = new Audio("./Sounds/burst.mp3");
      audioballoon.play();
    };

    var balloonwindow=document.getElementById('balloonwindow');
    balloonwindow.appendChild(balloon);
    this.balloons.push(balloon);

  };


  this.addHeart = function(){

    var heart = document.createElement('div');
    heart.classList.add('heart');
    heart.classList.add('object');

    heart.style.left = 30+ w1+Math.floor(Math.random() * w)+'px';
    heart.style.bottom = '500px';

    var idx = Math.floor(Math.random() * 14);
    heart.style.backgroundImage = heartimg[idx];

    heart.onclick = function(){
      thus.removeObject(heart);
      var audioheart = new Audio("./Sounds/burst.mp3");
      audioheart.play();
    };

    var balloonwindow=document.getElementById('balloonwindow');
    balloonwindow.appendChild(heart);
    this.balloons.push(heart);

  };


  this.addBird= function(){

    var bird = document.createElement('div');
    bird.classList.add('bird');
    bird.classList.add('object');

    var neck = document.createElement('div');
    neck.classList.add('neck');

    bird.append(neck);

    bird.style.left = 30+ w1+Math.floor(Math.random() * w)+'px';
    bird.style.bottom = '500px';

    var idx = Math.floor(Math.random() * 9);
    bird.style.backgroundImage = birdimg[idx];

    bird.onclick = function(){
      thus.removeObject(bird);
      var audiobird = new Audio("./Sounds/burst.mp3");
      audiobird.play();
    };

    var balloonwindow=document.getElementById('balloonwindow');
    balloonwindow.appendChild(bird);
    this.balloons.push(bird);

  };

  this.addRandom = function(){
    if(this.shape==1){
      // console.log("YEs");
      var balloon = document.createElement('div');
      balloon.classList.add('balloon');
      balloon.classList.add('object');

      balloon.style.left =30+ w1+Math.floor(Math.random() * w)+'px';
      balloon.style.bottom = '500px';

      var idx = Math.floor(Math.random() * 4);
      // balloon.style.backgroundColor = 'yellow';
      balloon.style.backgroundImage = balloonimg[idx];

      balloon.addEventListener('mouseover',()=>{
        balloon.classList.remove('balloon');
        var k = Math.floor(Math.random()*4);
        // console.log(k);
        if(k<=2){
          balloon.classList.add('bomb');
          balloon.style.backgroundImage = "url('./Images/bomb.svg')";
          balloon.onclick = function(){
            thus.removeBomb(balloon);
          }
        }else{
          balloon.classList.add('bonus');
          var idx = Math.floor(Math.random() * 6);
          balloon.style.backgroundImage = bonusimg[idx];
          balloon.onclick = function(){
            thus.removeBonus(balloon);
          }
        }
      });

      var balloonwindow=document.getElementById('balloonwindow');
      balloonwindow.appendChild(balloon);
      this.balloons.push(balloon);

    }else if(this.shape==2){
      var heart = document.createElement('div');
      heart.classList.add('heart');
      heart.classList.add('object');

      heart.style.left = 30+ w1+Math.floor(Math.random() * w)+'px';
      heart.style.bottom = '500px';

      var idx = Math.floor(Math.random() * 14);
      heart.style.backgroundImage = heartimg[idx];

      heart.addEventListener('mouseover',()=>{
        heart.classList.remove('heart');
        var k = Math.floor(Math.random()*4);
        if(k<=2){
          heart.classList.add('bomb');
          heart.style.backgroundImage = "url('./Images/bomb.svg')";
          heart.onclick = function(){
            thus.removeBomb(heart);
          }
        }else{
          heart.classList.add('bonus');
          var idx = Math.floor(Math.random() * 6);
          heart.style.backgroundImage = bonusimg[idx];
          heart.onclick = function(){
            thus.removeBonus(heart);
          }
        }
      });

      var balloonwindow=document.getElementById('balloonwindow');
      balloonwindow.appendChild(heart);
      this.balloons.push(heart);

    }else{
      var bird = document.createElement('div');
      bird.classList.add('bird');
      bird.classList.add('object');

      var neck = document.createElement('div');
      neck.classList.add('neck');

      bird.append(neck);

      bird.style.left = 30+ w1+Math.floor(Math.random() * w)+'px';
      bird.style.bottom = '500px';

      var idx = Math.floor(Math.random() * 9);
      bird.style.backgroundImage = birdimg[idx];
      bird.addEventListener('mouseover',()=>{
        bird.classList.remove('bird');
        var k = Math.floor(Math.random()*4);
        if(k<=2){
          bird.classList.add('bomb');
          bird.style.backgroundImage = "url('./Images/bomb.svg')";
          bird.onclick = function(){
            thus.removeBomb(bird);
          }
        }else{
          bird.classList.add('bonus');
          var idx = Math.floor(Math.random() * 6);
          bird.style.backgroundImage = bonusimg[idx];
          bird.onclick = function(){
            thus.removeBonus(bird);
          }
        }
      });

      var balloonwindow=document.getElementById('balloonwindow');
      balloonwindow.appendChild(bird);
      this.balloons.push(bird);
    }
  }


  //To add an Object to the balloonwindow
  this.addObject=function(){

     if(time>0 && lives>0) {

        if(this.shape==1){

          this.addBalloon();

        }else if(this.shape==2){
            
          this.addHeart();

        }else{

          this.addBird();

        }
    }
  };


  //To input speed of the objects
  this.speedinp = function(){

    this.speed = document.getElementById("speed").value;

  };
 

  //To update the bottom of the objects to make it flow upwards
  this.PushBottom = function(){ 

    for(var i = 0; i < this.balloons.length; i++)
    {

      this.balloons[i].style.bottom = (parseInt(this.balloons[i].style.bottom, 10)+4)+'px';

    }

  };


  //To call the pushbottom function which updates the bottom of the balloons to make it flow upwards
  this.updater = function(){

    thus.PushBottom();

  };

  //calls the adder function which adds a ballon to the balloonwindow
  this.adder = function(){
    thus.addObject();

  };


  //calls the addBonus function which adds a bonus to the balloonwindow
  this.addBonusOb= function(){

    thus.addBonus();

  };


  ////calls the addBomb function which adds a Bomb to the balloonwindow
  this.addBombOb = function(){

    thus.addBomb();
  };

  this.addr = function(){
    thus.addRandom();
  }


  this.gettimeinp = function(){

    time = timer.value;
    intime = time;
    this.num = time/10;

  };


  this.getLivesinp = function(){

    lives = life.value;
    inlives = lives;

  };


  this.begin = function(){// function to begin the game

    this.state=true;

    this.shapeinp();
    this.gettimeinp();
    document.getElementById("timer").innerHTML = time;
    this.getLivesinp(); 
    document.getElementById("liveinp").innerHTML = lives ;
    this.level();
    this.speedinp();

    this.update = setInterval(this.updater,10+this.speed*7.5);
    this.addB = setInterval(this.addBonusOb, 10000);
    this.bomb = setInterval(this.addBombOb, 5311);
    this.add = setInterval(this.adder, this.difficulty*50);
    this.randomob = setInterval(this.addr,3000);

    // clearInterval(this.int);
    clearInterval(this.int);
    this.int = setInterval(function(){


    if(time>=0&&lives>0){
      if(time<6){
        this.audiotime = new Audio("./Sounds/ticktick.mp3");
        this.audiotime.play();
      }
      time--;
      document.getElementById("timer").innerHTML = time;
    }
    

    if(time == -1 || lives == 0){

      lives--;
      time--;
      var Score=document.getElementById('Points');
      Score.innerHTML = 0;
      document.getElementById("timer").innerHTML = `<input type="number" id="timeinp" value = "30" ></input>`;
      document.getElementById("liveinp").innerHTML =`<input type="number" id="lives" value = "5" ></input>`;
      document.getElementById("balloonwindow").innerHTML=``;
      this.balloons = [];
      alert('Game Over');
      alert("Your Score is " + (thus.Points));
      clearInterval(this.int);
      document.location.reload(true)

    }

  }, 1000);

  };


  this.pause=function(){// function to pause the game

    clearInterval(this.add);
    clearInterval(this.update);
    clearInterval(this.int);
    clearInterval(this.addB);
    clearInterval(this.bomb);
    clearInterval(this.randomob);

  };

  this.resume = function(){
    this.update = setInterval(this.updater,10+this.speed*7.5);
    this.addB = setInterval(this.addBonusOb, 10000);
    this.bomb = setInterval(this.addBombOb, 5311);
    this.add = setInterval(this.adder, this.difficulty*50);
    this.randomob = setInterval(this.addr,3000);

    document.querySelectorAll(".bomb").forEach(item=>{
      item.onclick = function(){
        thus.removeBomb(item);
      };
    });
    document.querySelectorAll(".bonus").forEach(item=>{
      item.onclick = function(){
        thus.removeBonus(item);
      };
    });
    document.querySelectorAll(".balloon").forEach(item=>{
      item.onclick = function(){
        thus.removeObject(item);
        var audio = new Audio("./Sounds/burst.mp3");
        audio.play();
      };
    });
    document.querySelectorAll(".heart").forEach(item=>{
      item.onclick = function(){
        thus.removeObject(item);
        var audio = new Audio("./Sounds/burst.mp3");
        audio.play();
      };
    });
    document.querySelectorAll(".bird").forEach(item=>{
      item.onclick = function(){
        thus.removeObject(item);
        var audio = new Audio("./Sounds/burst.mp3");
        audio.play();
      };
    });

    this.int = setInterval(function(){


    if(time>=0&&lives>0){
      if(time<6){
        this.audiotime = new Audio("./Sounds/ticktick.mp3");
        this.audiotime.play();
      }
      time--;
      document.getElementById("timer").innerHTML = time;
    }
    

    if(time == -1 || lives == 0){

      lives--;
      time--;
      var Score=document.getElementById('Points');
      Score.innerHTML = 0;
      document.getElementById("timer").innerHTML = `<input type="number" id="timeinp" value = "30" ></input>`;
      document.getElementById("liveinp").innerHTML =`<input type="number" id="lives" value = "5" ></input>`;
      document.getElementById("balloonwindow").innerHTML=``;
      this.balloons = [];
      alert('Game Over');
      alert("Your Score is " + (thus.Points));
      clearInterval(this.int);
      document.location.reload(true);

    }

  }, 1000);


  }

  this.end=function(){// function to end the game


    this.state=false;

    var Score=document.getElementById('Points');
    Score.innerHTML = 0;

    this.Points=0;

    var balloonwindow=document.getElementById('balloonwindow');
    balloonwindow.innerHTML=``;
    this.balloons=[];
    document.getElementById("timer").innerHTML = `<input type="number" id="timeinp" value = "30" ></input>`;
    document.getElementById("liveinp").innerHTML =`<input type="number" id="lives" value = "5" ></input>`;

    clearInterval(this.add);
    clearInterval(this.update);
    clearInterval(this.addB);
    clearInterval(this.bomb);
    clearInterval(this.randomob)
    clearInterval(this.int);

  };


  this.shapeinp= function(){

    var sep = document.getElementById("shape");
    this.shape = sep.value;

  };


  this.level=function(){//takes the difficulty level as input

    var sel = document.getElementById("difinp");
    this.difficulty=sel.value;

  };
  this.startbutton = document.getElementById("start");//start the game when clicked on it

  this.startbutton.addEventListener('click',()=>{

  this.pausebutton.innerHTML=`Pause Game`;
  this.state=true;
  this.end();
  this.begin();

});
  this.pausebutton = document.getElementById("stop");//pauses the game when clicked on it
this.endbutton = document.getElementById("end");// ends the game when clicked on it

this.endbutton.addEventListener('click',()=>{

  this.end();
  this.pausebutton.innerHTML=`Pause Game`;
  this.state=true;
  location. href = "game.html";
  // document.location.reload(true);

});


this.pausebutton.addEventListener('click',()=>{

  // console.log("yes");
  if(this.state==false){


    this.pausebutton.innerHTML=`Pause Game`;
    this.state=true;
    this.resume();

  }else{

    document.querySelectorAll(".object").forEach(item =>{
      item.onclick = function(){
        null;
      }
    });

    this.pausebutton.innerHTML=`Resume Game`;
    this.state=false;
    this.pause();

  }
});


}


window.onload = (event) => {
  var a = new BalloonBurster();
  alert('Before starting new game please enter the details and switch to full screen')
};
