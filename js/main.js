// setInterval(function() { _clock()}, 1000)
// function _clock(){

	
//   var today = new Date()
//   var _hour = today.getHours()
//   var _min = today.getMinutes()
//   var _sec = today.getSeconds()


  

// function shake(t) {
//        t.addClass('shake-constant');
//   setTimeout(function() {
//     t.removeClass('shake-constant');
//   }, 1000)
// }

//     if (_hour > 12) {
//       _hour -= 12

//      }



//    if ($('.hours').text() != ((_hour < 10 ? "0" : "") + _hour)){
//      $('.hours').text((_hour < 10 ? "0" : "") + _hour)
//       shake($('.hours'))
//    }
  

//    if ($('.minutes').text() != ((_min < 10 ? "0" : "") +_min)) {
//      $('.minutes').text((_min < 10 ? "0" : "") + _min);
//     shake($('.minutes'));
//  }
//     if ($('.seconds').text() != ((_sec < 10 ? "0" : "") + _sec)) {
//     $('.seconds').text((_sec < 10 ? "0" : "") + _sec);
//    shake($('.seconds'));
//   }


//   function addZero(_num){
//   	if (_num < 10){
//   		_num =  '0' + _num
//   	}
//   		return _num
//   }

  
//   	_hour = addZero(_hour)
// 	 _min = addZero(_min)
//     _sec = addZero(_sec)

   

 
	
// //document.getElementById('date').innerHTML= _hour + " :" + _min + " :" + _sec
// // document.getElementsByClassName('minutes').innerHTML=
// //   document.getElementsByClassName('seconds').innerHTML=
// }



//  var startTime = document.getElementById('date')


//  startTime.onload=_clock



//   $('#date').addClass('animated pulse')




// // setInterval(function() {
// //   _clock();
// // }, 1000);

// // function _clock()
// // {
// //   var today = new Date();
// //   var _hour = today.getHours();
// //   var _min = today.getMinutes();
// //   var _sec = today.getSeconds();


  
// //    if ($('.hours').text() != ((_hour < 10 ? "0" : "") + _hour)){
// //      $('.hours').text((_hour < 10 ? "0" : "") + _hour)
// //       shake($('.hours'))
// //    }
  
// //    if ($('.minutes').text() != ((_min < 10 ? "0" : "") +_min)) {
// //      $('.minutes').text((_min < 10 ? "0" : "") + _min);
// //     shake($('.minutes'));
// //  }
  
// //   if ($('.seconds').text() != ((_sec < 10 ? "0" : "") + _sec)) {
// //     $('.seconds').text((_sec < 10 ? "0" : "") + _sec);
// //    shake($('.seconds'));
// //   }

// // }
// // $(document).load(function(){
// //   _clock();
// // });

// // function shake(t) {
// //   t.addClass('shake-constant');
// //   setTimeout(function() {
// //     t.removeClass('shake-constant');
// //   }, 470)
// // }



var $document = $(document)

  function _clock() {
      clearTimeout(timer)
    
       var today = new Date()   
      _hour = today.getHours()
      _min = today.getMinutes()
      _sec = today.getSeconds()
      dh = (_hour >= 12) ? 'pm' : 'am'

  

  
   
      
    _hour = (_hour > 12) ? (_hour - 12) : _hour
    _hour = (_hour<10) ? ('0' + _hour) : _hour
    _min = (_min<10) ? ('0' + _min) : _min
    _sec = (_sec<10) ? ('0' + _sec) : _sec


//     function addZero(_num){
//     if (_num < 10){
//        _num =  '0' + _num
//    }
//      return _num
//   }

  
//      _hour = addZero(_hour)
//      _min = addZero(_min)
//      _sec = addZero(_sec)

// }

      var timer = setTimeout(_clock, 1000)
    
    $('.hours').html('<p>' + Math.floor(_hour) + '</p>')
    $('.minutes').html('<p>:' + Math.floor(_min) + '</p>')
    $('.seconds').html('<p>:' + Math.floor(_sec) + '</p>')
      $('.ampm').html('<p>' + dh + '</p>')



}
  
 
var startTime = document.getElementById('date')


startTime.onload=_clock

//startTime.addEventListener("load", _clock, false)

// background stars


var canvas, context, alpha;
var cX, cY, tX, tY, mouseX, mouseY, density;
var stars = [];
var cameraDepth=0;
var enterWarp, warpStartDepth, warpTime, velocity;

// define to 0 to brute force move all stars
const cameraTrick = 1;

// options
const starCount = 1024;
var initVelocity = -1.0;
var termVelocity = -10.0;
const topleft = 0;
const trackMouse = 1;
const focalPoint = 256;
const sparcity = 1.0;
const tailLength = 20;

// depth modulo fucntion. custom
function modulo(a)
{
  // depth range is 1024
  const b = 1024;
  return a-b * Math.floor(a/b);
}

// handles negative numbers correctly
function modulo2(a, b)
{
  return a-b * Math.floor(a/b);
}

function Star(index)
{
  // randomize a field -1024 to 1024 and positive z
  this.x = (Math.random() *2048-1024)*sparcity;
  this.y = (Math.random() *2048-1024)*sparcity;
  this.z = ((starCount-1)-index)/density;

  if (topleft==1) 
  {
    this.x = this.x + 1024;
    this.y = this.y + 1024;
  }
}

Star.prototype.move = function()
{
  // dont really have to move all stars
  this.z = modulo(this.z + velocity)
}

Star.prototype.draw = function() 
{
  // compute depth perspective effect, cameraDepth is used when cameraTrick = 1
  var depth = focalPoint / (modulo(this.z + cameraDepth) +1);
  var x = this.x * depth + cX;
  var y = this.y * depth + cY;
  var sz = 5 * depth;
  
  // fill a rect
  context.beginPath();
  context.rect(x, y, sz,sz);
  context.fillStyle = 'white';
  context.fill();
  // use border edge for twinkle effect 
  context.lineWidth = 0;
  context.strokeStyle = 'black';
  context.stroke();
};

Star.prototype.warpline = function() 
{
  var depth = modulo(this.z + cameraDepth)+1;
  var depthStart = modulo(this.z + warpStartDepth)+1
  if (depth>depthStart && termVelocity<0) depth = 1;
  if (depth<depthStart && termVelocity>0) depthStart = 1;
  
  var invDepth = focalPoint / depth;
  var invDepthStart = focalPoint / depthStart;
  
  var x = this.x * invDepth + cX;
  var y = this.y * invDepth + cY;
  var sz = 5 * invDepth ;
  
  var wx = this.x * invDepthStart + cX;
  var wy = this.y * invDepthStart + cY;
  var wsz = 5 * invDepthStart;
  
  // computed quadrant dictates what 2 edges we see in rendering the trail
  var top = this.y<0? sz : 0;
  var left = this.x<0? sz : 0;
  var alpha = (sz/5.0+0.1) * 0.7;
  // fill a ray
  context.beginPath();
  context.moveTo(wx, wy);
  context.lineTo(x+sz, y+top);
  context.lineTo(x, y+top);
  context.moveTo(wx, wy);
  context.lineTo(x+left, y+sz);
  context.lineTo(x+left, y);
  context.closePath();
  context.fillStyle = termVelocity<0?'rgba(64,128,192,'+alpha+')':'rgba(192,64,32,'+ alpha+')';
  context.fill();
  // use border edge for twinkle effect 
 // context.lineWidth = 0;
 // context.strokeStyle = 'black';
 // context.stroke();

};

function init()
{
  // setup canvas and context
  canvas = document.getElementById('stars');
  context = canvas.getContext('2d');
  // set canvas to be window dimensions
  resize();
  canvas.addEventListener('mousemove', mousemove);
  canvas.addEventListener('click', mouseclick);
  window.addEventListener('resize', resize);

  // compute center of screen (its really centre but for americans I change it)
  tX = cX = canvas.width/2;
  tY = cY = canvas.height/4;
  
  if (topleft==1) 
  {
    cX=0;
    cY=0;
  }
  
  density = starCount/1024;
  // allocate and init stars
  for (i=0; i<starCount; i++)
  {
    stars[i] = new Star(i);
  }
  
  alpha = 6.0;
  enterWarp = false;
  velocity = initVelocity;
}

function animate()
{
  // movement update
  move();
  // render update
  render();
  // trigger next frame
  requestAnimationFrame(animate);
}

function move()
{
  
  if (enterWarp)
  {
    velocity*=1.02;
    if (velocity<termVelocity && termVelocity<0) velocity=termVelocity;
    if (velocity>termVelocity && termVelocity>0) velocity=termVelocity;
    warpTime=warpTime+1;
    if (warpTime>140) enterWarp = false;
    if (warpTime>tailLength) warpStartDepth=modulo(warpStartDepth+velocity);
    // catchup time
    if (warpTime>130)
    {
      warpStartDepth = modulo(warpStartDepth + (cameraDepth-warpStartDepth) * 0.3);
    }
  }
  else
  {
     // slow down
     var dv = velocity - initVelocity;
     velocity-= dv * 0.01;
  }
  // brute force move.. will replace with camera trick
  if (cameraTrick==0)
  {
    for (i = 0; i < stars.length; i++) 
    {
      stars[i].move();
    };
  }
  else
  {
    // camera movement trick
    cameraDepth = modulo(cameraDepth+velocity);
  }
  
  var dx = tX - cX;
  var dy = tY - cY;
  var dist = Math.sqrt(dx*dx + dy*dy);

  if (dist!=0)
   {
     dx/=dist;
     dy/=dist;
   }
  dist = Math.min(dist, 512.0);

  cX = cX + (dist*dx*0.06125);
  cY = cY + (dist*dy*0.06125);
 
}

function render()
{
  // brute force clear
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw all stars
  for (i = 0; i < stars.length; i++) 
  {
    var index = cameraTrick==1 ? modulo2((i + 1 + Math.floor(cameraDepth)*density) , stars.length) : i;
    // depending on direction of travel is order of drawing trails
    if (enterWarp && termVelocity<=0) stars[index].warpline();
    stars[index].draw();
    if (enterWarp && termVelocity>0) stars[index].warpline();
  };
  
  createButton(canvas.width/2-100, 10, 200, 32, termVelocity>0?"Front View":"Rear View");
  
  // banner for a about 12 seconds
  alpha -= 0.008;
  if (alpha<=0) return;
  context.font = '40pt Calibri';
  context.fillStyle = 'rgba(255,255,255,'+alpha+')';
  context.textAlign = "center";
  context.fillText('Space ship', canvas.width/2, 100);
  context.font = '10pt Orbitron, sans-serif';
  context.fillText('(move mouse  for effects)', canvas.width/2, 120);
  context.fillText('* Left Click Warps *', canvas.width/2, 140);
}

function mousemove(event) 
{
  var rect = canvas.getBoundingClientRect();

  mouseX = event.clientX - rect.left,
  mouseY = event.clientY - rect.top
  // just for fun lets just click on moving
  if (trackMouse)
  {
    tX = mouseX;
    tY = mouseY;
    if (termVelocity>0)
    {
      tX = canvas.width - tX;
      tY = canvas.height - tY;
    }
  }
}

function mouseclick()
{
  tX = mouseX;
  tY = mouseY;
  if (termVelocity>0)
  {
    tX = canvas.width - tX;
    tY = canvas.height - tY;
  }  
  // swap
  if (hitButton(canvas.width/2-100, 10, 200, 32))
  {
    swapView();
    return;
  }
  
  if (!enterWarp)
  {
    enterWarp = true;
    warpStartDepth = cameraDepth;
    warpTime = 0;
  }
}
  

function resize()
{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function swapView()
{
  // inverse the velocities
  initVelocity*=-1;
  termVelocity*=-1;
  velocity*=-1;
  // switch warplines
  if (enterWarp)
  {
    var tmp = cameraDepth;
    cameraDepth = warpStartDepth;
    warpStartDepth = tmp;
  }
  // change view point of travel
  if (termVelocity>0)
  {
    cX = canvas.width - cX;
    cY = canvas.height - cY;
    tX = canvas.width - tX;
    tY = canvas.height - tY;
    }
  else
  {
    cX = canvas.width - cX;
    cY = canvas.height - cY;
    tX = mouseX;
    tY = mouseY;
  }


}

function hitButton(x, y, w, h)
{
  return (mouseX>x && mouseX<x+w && mouseY>y && mouseY<y+h) ? true : false;
}

function createButton(x, y, w, h, name)
{
    // fill a rect
  context.beginPath();
  context.rect(x, y, w,h);
  context.fillStyle = 'rgba(0, 0, 0, 0.5)';
  context.fill();

  context.lineWidth = 2;
  context.strokeStyle = 'rgba(120, 120, 120, 0.5)';
  context.stroke();
  
  context.moveTo(x,y);
  context.font = '20pt Calibri';
  context.fillStyle = 'rgba(255,255,255, 1)';
  context.textAlign = "center";
  context.fillText(name, x+w/2, y+h-9);
}

// entry point
init();
animate();

