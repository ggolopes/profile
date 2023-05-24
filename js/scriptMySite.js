function parallax(elem,intensity){
 
  intensity = typeof intensity === "undefined" ? 2 : intensity;
   
  ws = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
  wsPos = ws/intensity;
 
  if($(elem).length > 1){ 
    $(elem).each(function(){
      elemPos = $(this).position().top/intensity;
      $(this).css({backgroundPosition: "0px "+(wsPos - elemPos)+"px"})
    })
  } else {
    elemPos = $(elem).position().top/intensity;
    $(elem).css({backgroundPosition: "0px "+(elem == "body" ? wsPos : wsPos - elemPos)+"px"})
  }
}


$(document).ready(function(){
  parallax("section.parallax:nth-child(1)");
  parallax("section:nth-child(5), 10");
  parallax("section:nth-child(7), 10");
});
 
$(window).scroll(function(){
  parallax("section.parallax:nth-child(1)");
  parallax("section:nth-child(5), 10");
  parallax("section:nth-child(7), 10");
});

const offset = $('#navMenu').offset();
const $navMenu = $('#navMenu');
$(document).on('scroll', function () {
    if (offset.top <= $(window).scrollTop()) {
        $navMenu.addClass('fixIt');
    } else {
        $navMenu.removeClass('fixIt');
    }
});

const menuItems = document.querySelectorAll('.navOptions a[href^="#"]');

menuItems.forEach(item => {
  item.addEventListener('click', scrollToIdOnClick);
})

function getScrollTopByHref(element) {
  const id = element.getAttribute('href');
  return document.querySelector(id).offsetTop;
}

function scrollToIdOnClick(event) {
  event.preventDefault();
  const to = getScrollTopByHref(event.target) - 80;
  scrollToPosition(to);
}

function scrollToPosition(to) {
  // window.scroll({
  //   top: to,
  //   behavior: "smooth",
  // });
  smoothScrollTo(0, to);
}

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};

const handleClickInside = (event) => {
    let overlay = document.getElementById("overlay");
    let modal = document.getElementById("modal");
    if (modal.contains(event.target)) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        document.removeEventListener('click', handleClickInside, false);
    }
}

const openModal = (imgSrc) => {
    const overlay = document.getElementById("overlay");
    const modal = document.getElementById("modal");
	document.getElementById('modalContent').style.backgroundImage="url(" + imgSrc + ")";
	document.getElementById('modalContent').style.backgroundRepeat="no-repeat";	
	document.getElementById('modalContent').style.backgroundPosition="center center";	
	document.getElementById('modalContent').style.backgroundSize="contain";	
    overlay.style.display = 'flex'
    modal.style.display = 'flex'
    setTimeout(() => { document.addEventListener('click', handleClickInside, false) }, 200);
}