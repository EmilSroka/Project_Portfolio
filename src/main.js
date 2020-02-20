import './main.scss';
import {handleVisibleFocus} from './js/a11y';
import BannerAnimation from './js/bannerAnimation';
import {TimelineLite} from 'gsap/all';

/* a11y */
handleVisibleFocus('#visible-focus', false);

/* animation */
const bannerAnimation = new TimelineLite();
bannerAnimation.add(BannerAnimation);
const mobileViewport = window.matchMedia( "(max-width: 48em)");
mobileViewport.addListener(() => {
  mobileViewport.matches ? bannerAnimation.pause() : bannerAnimation.play();
});
