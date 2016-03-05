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
    _hour = (_hour<10) ? (0 + _hour) : _hour
    _min = (_min<10) ? (0 + _min) : _min
    _sec = (_sec<10) ? (0 + _sec) : _sec


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


// function _clock () {
//   $document.bind('contextmenu', function (e) {
//     e.preventDefault()
//   })
// }