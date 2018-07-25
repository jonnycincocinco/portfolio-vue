var ITEManimate = ({
    start: 0,
    bezier: function(p0, p1, p2, p3) {
        return ITEManimate.polyBez([p0, p1], [p2, p3]);

    },
    polyBez: function(p1, p2) {
        var A = [null, null],
            B = [null, null],
            C = [null, null],
            bezCoOrd = function(t, ax) {
                C[ax] = 3 * p1[ax], B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax], A[ax] = 1 - C[ax] - B[ax];
                return t * (C[ax] + t * (B[ax] + t * A[ax]));
            },
            xDeriv = function(t) {
                return C[0] + t * (2 * B[0] + 3 * A[0] * t);
            },
            xForT = function(t) {
                var x = t,
                    i = 0,
                    z;
                while (++i < 14) {
                    z = bezCoOrd(x, 0) - t;
                    if (Math.abs(z) < 1e-3) break;
                    x -= z / xDeriv(x);
                }
                return x;
            };
        return function(t) {
            return bezCoOrd(xForT(t), 1);
        }
    }
});

// const easeA = ITEManimate.bezier(0.930, 0.035, 0.350, 0.815);
// const easeA = ITEManimate.bezier(.23, .9, 0.2, 1);
const easeA = ITEManimate.bezier(0.77, 0, 0.175, 1);
const easeB = ITEManimate.bezier(0.815, 0.035, 0.350, 0.930);


const playBtn = document.getElementsByClassName('play-video');
const vid = document.getElementsByClassName('video');
const leftSide = document.getElementsByClassName('left-side');
const rightSide = document.getElementsByClassName('right-side');
const rule1 = document.getElementsByClassName('.rule-1');
const header = document.getElementsByClassName('main-header');
const headerTitle = document.getElementsByClassName('main-header__title');
const headerSubTitle = document.getElementsByClassName('main-header__subtitle');
const img1 = document.getElementsByClassName('main__image-1');

const scrollPage = document.getElementsByClassName('scroll-page');
const main = document.getElementsByClassName('main');
const mainHeader = document.getElementsByClassName('main-header');
const mainHeaderImg = document.getElementsByClassName('main-header-img');
const closeBtn = document.getElementsByClassName('close');



// const learnmore = document.getElementById("learnMore");



// function onHoverOver(e){
//   TweenMax.fromTo( learnMore, 0.6, { boxShadow:"0px 0px 0px 0px green"}, {boxShadow:"0px 0px 20px 2px #91f600", repeat:-1, yoyo:true});
// }
//
// function onHoverOut(e){
//   TweenMax.to( learnMore, 0.2, {boxShadow:"0px 0px 0px 0px yellow"});
// }

new Vue({
  el: '#portfolio',
  data() {

    return {

      navButtonSet: [
        { id: 'slide-0', number: 0 },
        { id: 'slide-1',  number: 1 },
        { id: 'slide-2',  number: 2 },
      ],
      currentSelect: 'slide-0',
      currentIndex: 0,

  //    showModal: false
}

  },
  computed: {

    slideLeft() {
        if ( this.currentIndex === 0 ) {
          return false;
        } else {
          return true;
        }

      },

    slideRight() {
        if ( this.currentIndex === this.navButtonSet.length - 1 ) {
          return false;
        } else {
          return true;
        }
    },


  },
  mounted() {

  },
  components: {
    'slide-0': {
      template: '<div></div>'
    },
    'slide-1': {
      template: '<div class=scroll-page><h2>Apple</h2><div class=revealer><div class=video-container><video controls loop class=video><source src=assets/apple/cmw-kids-hour.mp4 type=video/mp4></video><h3>Today at Apple Video Wall: Kids Hour</h3></div></div><div class=revealer><div class=video-container><video controls loop class=video><source src=assets/apple/cmw-sketch-walks.mp4 type=video/mp4></video><h3>Today at Apple Video Wall: Sketch Walks</h3></div></div><div class=revealer><img src="assets/apple/cmw-lineup-concept.jpg"/><h3>Today at Apple Video Wall: Concept Frame</h3></div><div class=revealer><img src="assets/apple/retail-panel.jpg"/><h3>Today at Apple Retail Panel</h3></div><div class=revealer><img src="assets/apple/retail-panel-situ.jpg"/><h3>Today at Apple Retail Panel (in situ)</h3></div><div class=revealer><div class=video-container><video controls loop class=video><source src=assets/apple/cmw-screensaver.mp4 type=video/mp4></video><h3>Today at Apple: Screensaver</h3></div></div><div class=revealer><div class=video-container><video controls loop class=video><source src=assets/apple/cmw-social.mp4 type=video/mp4></video><h3>Today at Apple: Social Film</h3></div></div><div class=revealer><div class=video-container><video controls loop class=video><source src=assets/apple/cmw-snapchat.mp4 type=video/mp4></video><h3>Today at Apple: Snapchat</h3></div></div><div class=revealer><div class=video-container><video controls loop class=video><source src=assets/apple/iphone-x.mp4 type=video/mp4></video><h3>iPhone X Launch Film</h3></div></div><div class=revealer><div class=video-container><video controls loop class=video><source src=assets/apple/watch-ui.mp4 type=video/mp4></video><h3>Apple Watch UI Animations</h3></div></div></div><!-- last div --> '
    },
    'slide-2': {
      template: '<div class=scroll-page><h2>Airbnb</h2><div class=revealer><div class=video-container><video controls loop class=video><source src=assets/airbnb/airbnb-collections.mp4 type=video/mp4></video><h3>Collections: UI demo film</h3></div></div><div class=revealer><div class=video-container><video controls loop class=video><source src=assets/airbnb/surf-for-a-cause.mp4 type=video/mp4></video><h3>Experiences: Product prototype</h3></div></div><div class=revealer><div class=video-container><video controls loop class=video><source src=assets/airbnb/framer-screencap.mp4 type=video/mp4></video><h3>Experiences: Product prototype in Framer</h3></div></div></div><!-- last div --> '
    },
    'slide-3': {
      template: ' <div class=scroll-page><h2>HP</h2><div class=revealer><div class=video-container><iframe src="https://player.vimeo.com/video/281580202" width="1360" height="765" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><h3>Unicorn</h3></div></div><div class=revealer><div class=video-container><iframe src="https://player.vimeo.com/video/281579651" width="1360" height="765" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><h3>Like a Boss</h3></div></div><div class=revealer><div class=video-container><iframe src="https://player.vimeo.com/video/281579944" width="1360" height="765" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><h3>Durability</h3></div></div><div class=revealer><div class=video-container><iframe src="https://player.vimeo.com/video/264095309" width="1360" height="765" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><h3>Split Screen</h3></div></div><div class=revealer><div class=video-container><iframe src="https://player.vimeo.com/video/264094480" width="1360" height="765" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><h3>Every Penny Counts</h3></div></div><div class=revealer><div class=video-container><iframe src="https://player.vimeo.com/video/264095255" width="1360" height="765" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><h3>Magic Tray</h3></div></div><div class=revealer><div class=video-container><iframe src="https://player.vimeo.com/video/281580151" width="1360" height="765" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><h3>Flipbook</h3></div></div><div class=revealer><div class=video-container><iframe src="https://player.vimeo.com/video/281579850" width="1360" height="765" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><h3>Assist</h3></div></div></div><!-- last div --> '
    },
    'slide-4': {
      template: ' <div class=scroll-page><h2>Dignity Health</h2><div class=revealer><div class=video-container><iframe src="https://player.vimeo.com/video/190126212" width="1360" height="765" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><h3>World of Healing Intro Animations</h3></div></div><div class=revealer><div class=video-container><iframe src="https://player.vimeo.com/video/180694073" width="1360" height="765" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><h3>Dr. Day Social Film</h3></div></div></div><!-- last div --> '
    },
    'slide-5': {
      template: ' <div class=scroll-page><h2>Dignity Health</h2><div class=revealer><div class=video-container><iframe src="https://player.vimeo.com/video/190126212" width="1360" height="765" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><h3>World of Healing Intro Animations</h3></div></div><div class=revealer><div class=video-container><iframe src="https://player.vimeo.com/video/180694073" width="1360" height="765" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><h3>Dr. Day Social Film</h3></div></div></div><!-- last div --> '
    },
    'slide-6': {
      template: ' <div class=scroll-page><h2>Dignity Health</h2><div class=revealer><div class=video-container><iframe src="https://player.vimeo.com/video/190126212" width="1360" height="765" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><h3>World of Healing Intro Animations</h3></div></div><div class=revealer><div class=video-container><iframe src="https://player.vimeo.com/video/180694073" width="1360" height="765" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><h3>Dr. Day Social Film</h3></div></div></div><!-- last div --> '
    }
  },
  created() {
    window.addEventListener('keyup', this.listenForArrowKeys);
    this.internalValue = this.value;
  },
  methods: {

    gotToApple() {
      this.currentSelect = 'slide-1';

      const tl = new TimelineMax;
      tl.to(main, 1, {
        // width: '0',
        opacity: '0',
        x: 130,
        zIndex: '-1',
        transformOrigin: '100% 50%',
        ease: easeA
      }, "first");

      tl.to(scrollPage, 1, {
        opacity: '1',
        zIndex: '21',
        ease: easeA
      }, "first");


    },

    gotToAirbnb() {
      this.currentSelect = 'slide-2';

      const tl = new TimelineMax;
      tl.to(main, 1, {
        // width: '0',
        opacity: '0',
        x: 130,
        zIndex: '-1',
        transformOrigin: '100% 50%',
        ease: easeA
      }, "first");

      tl.to(scrollPage, 1, {
        opacity: '1',
        zIndex: '21',
        // transformOrigin: '100% 50%',
        ease: easeA
      }, "first");
    },

    gotToHp() {
      this.currentSelect = 'slide-3';

      const tl = new TimelineMax;
      tl.to(main, 1, {
        // width: '0',
        opacity: '0',
        x: 130,
        zIndex: '-1',
        transformOrigin: '100% 50%',
        ease: easeA
      }, "first");

      tl.to(scrollPage, 1, {
        opacity: '1',
        zIndex: '21',
        // transformOrigin: '100% 50%',
        ease: easeA
      }, "first");
    },

    gotToDh() {
      this.currentSelect = 'slide-4';

      const tl = new TimelineMax;
      tl.to(main, 1, {
        // width: '0',
        opacity: '0',
        x: 130,
        zIndex: '-1',
        transformOrigin: '100% 50%',
        ease: easeA
      }, "first");

      tl.to(scrollPage, 1, {
        opacity: '1',
        zIndex: '21',
        // transformOrigin: '100% 50%',
        ease: easeA
      }, "first");
    },

    gotToVx() {
      this.currentSelect = 'slide-5';

      const tl = new TimelineMax;
      tl.to(main, 1, {
        // width: '0',
        opacity: '0',
        x: 130,
        zIndex: '-1',
        transformOrigin: '100% 50%',
        ease: easeA
      }, "first");

      tl.to(scrollPage, 1, {
        opacity: '1',
        zIndex: '21',
        // transformOrigin: '100% 50%',
        ease: easeA
      }, "first");
    },

    gotTovisa() {
      this.currentSelect = 'slide-6';

      const tl = new TimelineMax;
      tl.to(main, 1, {
        // width: '0',
        opacity: '0',
        x: 130,
        zIndex: '-1',
        transformOrigin: '100% 50%',
        ease: easeA
      }, "first");

      tl.to(scrollPage, 1, {
        opacity: '1',
        zIndex: '21',
        // transformOrigin: '100% 50%',
        ease: easeA
      }, "first");
    },

    gotToPrev() {
      if ( this.currentIndex === 0 ) {
        return
      } else {
        this.currentIndex--;
      //   console.log(this.currentIndex + ' = currentIndex - got To Prev Slide');
        this.currentSelect = 'slide-' + `${this.currentIndex}`;
      }
    }, // END gotToPrev

    gotToNext() {
      if ( this.currentIndex === this.navButtonSet.length - 1 ) {
        return
      } else {
        this.currentIndex++;
      //  console.log(this.currentIndex + ' = currentIndex - got To Next Slide');
        this.currentSelect = 'slide-' + `${this.currentIndex}`;
      }
    }, // END gotToNext

    closeSlide() {
      const tl = new TimelineMax;

      tl.to(main, 1, {
        width: '100vw',
        opacity: '1',
        x: 0,
        zIndex: '222',
        // transformOrigin: '100% 50%',
        ease: easeA
      }, "first");

      tl.to(scrollPage, 0.7, {
        height: '0',
        opacity: '0',
        x: 130,
        transformOrigin: '100% 50%',
        ease: easeA
      }, "first+=0.2");

      tl.to(closeBtn, 1, {
        opacity: '0',
        zIndex: '-1',
        transformOrigin: '100% 50%',
        ease: easeA
      }, "first");

    },


    listenForArrowKeys (event) {
        // If left or right arrow was pressed.
        if (event.keyCode == 37) {
          console.log('left-arrow-pressed');
          // gotToPrevSlide;
          this.gotToPrev();
        } else if (event.keyCode == 39) {
          console.log('right-arrow-pressed');
          // gotToNextSlide;
          this.gotToNext();
        } else if (event.keyCode == 13) {
            console.log('return-pressed');
            // gotToPrevSlide;
            this.showVid();
        } else if (event.keyCode == 27) {
            console.log('escape-pressed');
            // gotToPrevSlide;
            this.closeSlide();

        //
          } else {
          return
        }

    }, // END listenForArrowKeys


    enter(el, done) {
			const tl = new TimelineMax({
				onComplete: done
			})



			tl.set(rightSide, {

        x: 0,
        width: 0,
				// transformOrigin: '0 50%'
			})

      tl.to(closeBtn, 1, {
        opacity: '1',
        zIndex: '21',
        transformOrigin: '100% 50%',
        ease: easeA
      }, "first");

      tl.to(main, 1, {
        // width: '0',
        opacity: '0',
        x: 130,
        zIndex: '-1',
        transformOrigin: '100% 50%',
        ease: easeA
      }, "first");

      tl.to(scrollPage, 1, {
        opacity: '1',
        zIndex: '21',
        // transformOrigin: '100% 50%',
        ease: easeA
      }, "first");




		},
		afterEnter() {
      const tl = new TimelineMax;

      console.log('after');

		},
		leave(el, done) {
      const tl = new TimelineMax({
				onComplete: done
			})


      TweenMax.fromTo(el, 1, {
				autoAlpha: 1
			}, {
				autoAlpha: 0,
				ease: Power4.easeOut,
				onComplete: done
			});
		}

  },
   // END methods
})
