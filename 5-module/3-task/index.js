function initCarousel() {
  let step = 0;
  const slidesTotal = 4;
  let slideCurrent = 0;
  const arrowRightBtn = document.querySelector('.carousel__arrow_right');
  const arrowLeftBtn = document.querySelector('.carousel__arrow_left');
  const carouselInner = document.querySelector('.carousel__inner');

  arrowStyleToddler(slideCurrent, slidesTotal, arrowLeftBtn, arrowRightBtn);

  arrowRightBtn.addEventListener('click', () => {
    if (slideCurrent < slidesTotal - 1 && slideCurrent >= 0) {
      step -= carouselInner.offsetWidth;
      slideCurrent += slideCurrent < slidesTotal ? 1 : 0;
      carouselInner.style.transform = `translateX(${step}px)`;
      arrowStyleToddler(slideCurrent, slidesTotal, arrowLeftBtn, arrowRightBtn)
    }
  });

  arrowLeftBtn.addEventListener('click', () => {
    carouselInner.style.transform = `translateX(${step}px)`;
    if (slideCurrent <= slidesTotal && slideCurrent > 0 ) {
      step += carouselInner.offsetWidth;
      slideCurrent -= slideCurrent >= 0 ? 1 : 0;
      carouselInner.style.transform = `translateX(${step}px)`;
      arrowStyleToddler(slideCurrent, slidesTotal, arrowLeftBtn, arrowRightBtn)
    }
  });

}

function arrowStyleToddler(slideCurrent, slidesTotal, arrowLeftBtn, arrowRightBtn) {
  arrowLeftBtn.style.display = slideCurrent === 0 ? 'none' : '';
  arrowRightBtn.style.display = slideCurrent === slidesTotal - 1 ? 'none' : '';
}
