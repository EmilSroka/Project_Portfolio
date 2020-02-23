import './main.scss';
import handleVisibleFocus from './js/a11y';
import BannerAnimation from './js/bannerAnimation';
import handleForm from './js/form';
import handleCta from './js/cta';

/* a11y */
handleVisibleFocus('#visible-focus', false);

/* animation */
const bannerAnimation = BannerAnimation();

/* cta */
handleCta('.header__cta', 'contact');

/* form */
handleForm();

/* resize */
const mobileViewport = window.matchMedia( "(max-width: 48em)");
mobileViewport.addListener(() => {
  mobileViewport.matches ? bannerAnimation.pause() : bannerAnimation.play();
});
