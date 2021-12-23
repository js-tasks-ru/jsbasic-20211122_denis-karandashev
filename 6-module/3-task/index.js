import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  #carousel;
  constructor(slides) {
    this.slides = slides;
    this.createCarousel();
  }

  get elem() {
    return this.#carousel;
  }

  createCarousel () {
    const carouselTpl = createElement(`
    <div class="carousel">
    <!--Кнопки переключения-->
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>

    <div class="carousel__inner">

    <!--#################### slides #####################-->

      </div>
  </div>
    `);

    this.slides.forEach(element => {
      const slideTemplate = this.createSlide();
      const slide = this.fill(slideTemplate, element);
      carouselTpl.querySelector(".carousel__inner").append(slide);
    });
    this.initCarousel(carouselTpl);
    this.#carousel = carouselTpl;
  }

  createSlide() {
    return createElement(`
    <div class="carousel__slide" data-id="">
      <img src="" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price"></span>
        <div class="carousel__title"></div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    `);
  }

  fill(card, element) {
    card.dataset.id = element.id;

    const img = card.querySelector("img");
    img.setAttribute("src", "/assets/images/carousel/" + element.image);

    const price = card.querySelector(".carousel__price");
    price.innerHTML = `€${element.price.toFixed(2)}`;

    const title = card.querySelector(".carousel__title");
    title.innerHTML = element.name;

    const btn = card.querySelector(".carousel__button");
    btn.addEventListener('click', () => {
      const event = new CustomEvent("product-add", {
        detail: card.dataset.id,
        bubbles: true
      });
      card.dispatchEvent(event);
    });
    return card;
  }

  initCarousel(carousel) {
    let step = 0;
    const slidesTotal = this.slides.length;
    let slideCurrent = 0;
    const arrowRightBtn = carousel.querySelector('.carousel__arrow_right');
    const arrowLeftBtn = carousel.querySelector('.carousel__arrow_left');
    const carouselInner = carousel.querySelector('.carousel__inner');
    // const plusBtn = carousel.querySelector('.carousel__button');
    this.arrowStyleToddler(slideCurrent, slidesTotal, arrowLeftBtn, arrowRightBtn);

    arrowRightBtn.addEventListener('click', () => {
      if (slideCurrent < slidesTotal - 1 && slideCurrent >= 0) {
        step -= carouselInner.offsetWidth;
        slideCurrent += slideCurrent < slidesTotal ? 1 : 0;
        carouselInner.style.transform = `translateX(${step}px)`;
        this.arrowStyleToddler(slideCurrent, slidesTotal, arrowLeftBtn, arrowRightBtn);
      }
    });

    arrowLeftBtn.addEventListener('click', () => {
      carouselInner.style.transform = `translateX(${step}px)`;
      if (slideCurrent <= slidesTotal && slideCurrent > 0 ) {
        step += carouselInner.offsetWidth;
        slideCurrent -= slideCurrent >= 0 ? 1 : 0;
        carouselInner.style.transform = `translateX(${step}px)`;
        this.arrowStyleToddler(slideCurrent, slidesTotal, arrowLeftBtn, arrowRightBtn)
      }
    });

    // plusBtn.addEventListener('click', () => {
    //   const event = new CustomEvent("product-add", {
    //     detail: carousel.dataId,
    //     bubbles: true
    //   });
    //   carousel.dispatchEvent(event);
    // });
  }

  arrowStyleToddler(slideCurrent, slidesTotal, arrowLeftBtn, arrowRightBtn) {
    arrowLeftBtn.style.display = slideCurrent === 0 ? 'none' : '';
    arrowRightBtn.style.display = slideCurrent === slidesTotal - 1 ? 'none' : '';
  }
}
