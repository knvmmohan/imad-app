console.log('Loaded!');
var element = document.getElementById('main-text');

element.innerHTML= 'This is mohan';
//Move the image
var img = document.getElementById('madi');
img.onclick = function () {
  img.style.marginLeft = '100px'; 
};