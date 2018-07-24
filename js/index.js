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
const easeA = ITEManimate.bezier(.23, .9, 0.2, 1);
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
      template: '<div class=main><div class=left-side><div class=rule-1></div><div class=main-header><h1 class="main-header__title">Headline</h1><h2 class="main-header__subtitle">Headline</h2><p class=main-content__info>Test</p></div></div><div class=right-side><img class=main__image-1 src="assets/images/apple-1.png" /><video loop class=video><source src=assets/mp4/vx-nas.mp4 height=1440 type=video/mp4></video></div></div>'
    },
    'slide-1': {
      template: '<div class=main><div class=left-side><div class=rule-1></div><div class=main-header><h1 class="main-header__title">Headline</h1><h2 class="main-header__subtitle">Headline</h2><p class=main-content__info>Test</p></div></div><div class=right-side><video loop class=video><source src=assets/mp4/vx-nas.mp4 height=1440 type=video/mp4></video><img class=main__image-1 src="assets/images/vx-1.png" /></div></div>'
    },
    'slide-2': {
      template: '<div><p>Slide 3</p></div>'
    },
    'modal': {
      template: '#modal-template'
    }
  },
  created() {
    window.addEventListener('keyup', this.listenForArrowKeys);
    this.internalValue = this.value;
  },
  methods: {

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

    showVid() {
      const tl = new TimelineMax;

      tl.to(vid, 1, {
        height: '100vh',
				ease: easeA
			}, "intro");

      tl.to(leftSide, 1, {
				width: '0',
        left: '-25vw',
				ease: easeA
      }, "intro");

      tl.to(rightSide, 1, {
				width: '100vw',
        left: '0',
				ease: easeA
			}, "intro");

      vid[0].play();
    },

    showImg1() {
      const tl = new TimelineMax;

      tl.to(img1, 1, {
        opacity: 1,
        ease: easeA
			}, "intro");

      tl.to(vid, 1, {
        opacity: 0,
        ease: easeA
			}, "intro");

      tl.to(leftSide, 1, {
				width: '0',
        left: '-25vw',
				ease: easeA
      }, "intro");

      tl.to(rightSide, 1, {
				width: '100vw',
        left: '0',
				ease: easeA
			}, "intro");


    },

    hideVid() {
      const tl = new TimelineMax;

      tl.to(vid, 3, {
        height: 'auto',
        width: '80vw',
        left: '120px',
        ease: easeA
      }, "intro");

      tl.to(leftSide, 1, {
        width: '20vw',
        left: '0',
        ease: easeA
      }, "intro");

      tl.to(rightSide, 1, {
        width: '100vw',
        left: '20%',
        ease: easeA
      }, "intro");

      vid[0].pause();
    },

    sendLog() {

      console.log(this.currentSelect + ' = this.currentSelect value');

    }, //END sendLog


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
            this.hideVid();
        // } else if (event.keyCode == 27) {
        //   console.log('img');
        //   // gotToPrevSlide;
        //   this.showImg1();
        //
          } else {
          return
        }

    }, // END listenForArrowKeys


    enter(el, done) {
			const tl = new TimelineMax({
				onComplete: done
			})

    //   vx ref:
    // tl1.to('#type1', 1, {opacity: 1, left:34 , ease: Back.easeInOut.config(1) }, '-=0.5' );

			tl.set(rightSide, {
				// x: window.innerWidth * 1.5,
			//	x: window.innerWidth * 1.5,
			//	scale: 0.7,
        x: 0,
        width: 0,
				// transformOrigin: '0 50%'
			})

      tl.set(headerTitle, {
				height: '0',
				transformOrigin: '0 0'
			})

      tl.set(rule1, {
				height: '140px',
				transformOrigin: '0 0'
			})



      tl.to(rightSide, 1, {
				width: '80vw',
        x: 130,
        // transformOrigin: '100% 50%',
				ease: easeA
			}, "first");

      tl.to(headerTitle, 1.2, {
      	height: '30px',
      	ease: easeA
      }, "second-=0.5" );

      tl.to(rule1, 1.2, {
      	height: '8px',
      	ease: easeA
      }, "second-=0.5" );

      tl.to(rightSide, .8, {
        scale: 1,
        ease: easeB
      }, "second+=0.2");

      // tl.to(playBtn, 1, {
      //   opacity: .5,
      //   ease: Power4.easeOut
      // }, "intro");
		},
		afterEnter() {
      const tl = new TimelineMax;

      console.log('after');
      // tl.to(headerTitle, 1.5, {
			// 	height: '30px',
			// 	ease: Power4.easeOut
		  // }, '-=1.5' );
      //
      // tl.to(rule1, 1.5, {
			// 	height: '8px',
			// 	ease: Power4.easeOut
		  // }, '-=1.5' );

		},
		leave(el, done) {
      const tl = new TimelineMax({
				onComplete: done
			})

      tl.to(rightSide, 1, {
        // width: 0,
        //
        // transformOrigin: '100% 50%',
        // x: window.innerWidth * 1.5,
        // x: 130,
				ease: easeA
		    });

      tl.to(headerTitle, .2, {
				height: '0',
				ease: easeB
		    });

      tl.to(rule1, .2, {
				height: '40px',
				ease: easeB
		    });

      TweenMax.fromTo(el, 1, {
				autoAlpha: 1
			}, {
				autoAlpha: 0,
				ease: Power4.easeOut,
				onComplete: done
			});
		}

  }, // END methods
})
