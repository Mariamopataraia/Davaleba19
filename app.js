//   Task#2 - სლაიდერები
const slides = document.querySelectorAll('.slide-item');
const slidesLength = slides.length;
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');
const stopBtn = document.querySelector('#stop-sliding');
const startBtn = document.querySelector('#start-sliding');
let activeIndex = 0;
function renderSlider() {
    slides.forEach((element, index) => {
      element.style.transform = `translateX(${100 * (index - activeIndex % slidesLength)}%)`;
    })
  };
  function nextSlide(){
    if (activeIndex=== (slidesLength - 1)){
        activeIndex = 0;
    }else {
        activeIndex = activeIndex + 1;
    }
    renderSlider();
};
function prevSlide(){
    if (activeIndex=== 0){
        activeIndex = slidesLength - 1;
    }else {
        activeIndex = activeIndex - 1;
    }
    renderSlider();
};
renderSlider();
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);
// იგივე გადმოტანილი
document.addEventListener('keydown', (e) => {
    // console.log(e.code);
if(e.code === 'ArrowRight'){
    nextSlide();
}
if(e.code === 'ArrowLeft'){
    prevSlide();
}
});
    
// IntervalID
let intervalId = null;
function startAutoSliding() {
if(!intervalId){
    intervalId = setInterval(() => {
    nextSlide();
    }, 3000);
}
}
// ავტოსლაიდინგის დამატება 
const mouseMove = document.querySelector(".slide-area");
function stopAutoSliding (){
    console.log(stopAutoSliding)
    if (startAutoSliding) {
        clearInterval(intervalId);
        intervalId = null;
    }
}
mouseMove.addEventListener('mouseenter', stopAutoSliding);
mouseMove.addEventListener('mouseleave', startAutoSliding);