import { TimelineLite, CSSPlugin } from 'gsap/all';

const plugins = [ CSSPlugin ];

export default function(){
  let tl = new TimelineLite({onComplete: function(){ this.restart(); }});
  tl
  .add(typing, 'typing')
  .addLabel('moveImageUp', "+=1.8")
  .to('#wd-image-1', 2, {ease: 'power4.out', y: -100}, 'moveImageUp')
  .to('#wd-image-2', 2, {ease: 'power4.out', y: -100}, 'moveImageUp')
  .add(typing, 'moveImageUp+=1')
  .addLabel('changeColor', "+=1")
  .to('#wd-color', 0.5, {fill: 'hsl(207, 90%, 25%)'}, 'changeColor')
  .add(typing)
  .addLabel('alignCenter', "+=1.8")
  .to('#wd-center-1', 1, {ease: 'power4.out', x: 100}, 'alignCenter')
  .to('#wd-center-2', 1, {ease: 'power4.out', x: 100}, 'alignCenter')
  .add(typing)
  .addLabel('moveImageBack', "+=1.8")
  .to('#wd-image-1', 2, {ease: 'power4.out', y: 0}, 'moveImageBack')
  .to('#wd-image-2', 2, {ease: 'power4.out', y: 0}, 'moveImageBack')
  .add(typing, 'moveImageBack+=1')
  .addLabel('changeColor2', "+=1")
  .to('#wd-color', 0.5, {fill: 'hsl(207, 75%, 50%)'}, 'changeColor2')
  .to('#wd-image-1', 0.5, {fill: 'hsl(207, 75%, 50%)'}, 'changeColor2')
  .add(typing)
  .addLabel('clear', "+=1.8")
  .to('#wd-center-1', 1, {ease: 'power4.out', x: 0}, 'clear')
  .to('#wd-center-2', 1, {ease: 'power4.out', x: 0}, 'clear')
  .to('#wd-image-1', 0.5, {fill: '#F2F2F2'}, 'clear')
  return tl;
};

/* typing */

function leftHandStart(){
  let tl = new TimelineLite();
  tl.to('#wd-left-hand', 0.14, {
    y: 10,
    x: 1
  })
  return tl;
}

function upAndDown(hand, deltaTime, topPosition, bottomPosition){
  let tl = new TimelineLite();
  tl
  .to(`#wd-${hand}-hand`, 0.05, {
    y: topPosition,
  }, `-=${deltaTime}`)
  .to(`#wd-${hand}-hand`, 0.05, {
    y: bottomPosition,
  })
  return tl;
}

function leftHandEnd(){
  let tl = new TimelineLite();
  tl.to('#wd-left-hand', 0.1, {
    y: 0,
    x: 0
  })
  return tl;
}

function typing(){
  let tl = new TimelineLite();
  tl.add(leftHandStart).add(upAndDown('right', 0.01, -5, 0));
  for(let i=0; i<8; i++){
    tl
    .add(upAndDown('left', 0.01, 5, 10))
    .add(upAndDown('right', 0.02, -5, 0));
  }
  tl.add(leftHandEnd);
  return tl;
}