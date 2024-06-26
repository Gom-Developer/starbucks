const badgeEl = document.querySelector("header .badges");

window.addEventListener("scroll", _.throttle(function() {
  console.log(window.scrollY);
  if (window.scrollY>500) {
    //gsap.to(요소,지속시간,옵션({}의 객체 형식, 문자의 경우 '' 이용(ex. display:'none')))
    gsap.to(badgeEl,.6, {
      opacity: 0,
      display: 'none'
    });
    //버튼 보이기
    gsap.to(toTopEl,.2,{
      x: 0
    })
  }
  else {
    gsap.to(badgeEl,.6, {
      opacity: 1,
      display: 'block'
    });
    //버튼 숨기기
    gsap.to(toTopEl,.2,{
      x: 100
    })
  }
}, 300));
// _.throttle(함수,시간(ms 단위))

const toTopEl = document.querySelector('#to-top');
toTopEl.addEventListener('click',function(){
  gsap.to(window,.7,{
    scrollTo: 0
  });
});

const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl,index){
  gsap.to(fadeEl,1,{
    delay: (index+1) * .7,
    opacity: 1
  });
});

//new Swiper(선택자,옵션)
new Swiper(".notice-line .swiper",{
  direction: 'vertical',
  autoplay: true,
  loop: true
});

new Swiper(".promotion .swiper",{
  slidesPerView: 3, //한번에 보여줄 슬라이드의 개수
  spaceBetween: 10, // 슬라이드들 사이의 여백
  centeredSlides: true, //1번 슬라이드가 중간에 보이도록
  loop: true,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: ".promotion .swiper-pagination",
    clickable: true
  },
  navigation: {
    prevEl: ".promotion .swiper-prev",
    nextEl: ".promotion ,swiper-next"
  }

});

new Swiper('.awards .swiper', {
  autoplay: true,                //direction: horizontal은 default이므로 안넣어줘도 됨
  loop: true,
  slidesPerView: 5,
  spaceBetween: 30,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click',function(){
  isHidePromotion = !isHidePromotion;
  if (isHidePromotion) {
    //숨김처리
    promotionEl.classList.add('hide');
  }
  else {
    //보임처리
    promotionEl.classList.remove('hide');
  }
});

function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector,delay,size) {
  //gsap.to(요소, 시간, 옵션) 
  gsap.to(selector, //선택자
    random(1.5,2.5),  //애니메이션 동작 시간
  { // 옵션
    y: size,
    repeat: -1,  //-1은 무한반복
    yoyo: true,   // 실행했던 애니메이션을 다시 뒤로 실행
    ease: "power1.inOut",
    delay: random(0,delay)
  })
}

floatingObject('.floating1',1,15);
floatingObject('.floating2',.5,15);
floatingObject('.floating3',1.5,20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl) {
  new ScrollMagic               // 현재 스크롤 위치에 의해서 어떤 화면이 보이고 있는지를 감시할 수 있음
    .Scene({
      triggerElement: spyEl,              //보여짐 여부를 감시할 요소를 지정
      triggerHook: .8                       // Trigger가 실행될 수 있도록 하는 viewport의 위치. 뷰포트 기준 맨 위가 0, 맨 아래가 1. 0.8 정도 지점이 hook(갈고리)로 작용함
    })
    .setClassToggle(spyEl, 'show')                 //spyEl에 show라는 class를 추가함
    .addTo(new ScrollMagic.Controller());                 
});