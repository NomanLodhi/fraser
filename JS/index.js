

 
 const words = ["Elevate", "Enhance", "Sell"];
 const introText = document.querySelector(".intro-text");
 let index = 0;
 
 function changeTextAndAnimate() {
   if (index < words.length) {
     introText.textContent = words[index];
     index++;
     setTimeout(changeTextAndAnimate, 1000); // 1s between each word
   } else {
     // After words change, slide up the intro section
     gsap.to(".intro", {
       y: "-100%",
       duration: 3,
       ease: "power2.out",
       onComplete: playRemainingAnimations // trigger rest after animation
     });
   }
 }
 
 function playRemainingAnimations() {
   gsap.to(".divider-sec", {
     opacity: 0,
     repeat: 1,
     yoyo: true,
     duration: 0.5,
     ease: "power1.inOut"
   });
 
   gsap.to(".tagline-heading", {
     y: 0,
     opacity: 1,
     duration: 1,
     ease: "power2.out"
   });
 
   gsap.to(".tagline-text", {
     y: 0,
     opacity: 1,
     duration: 2,
     ease: "power2.out"
   });
 
   gsap.to(".appointment-btn", {
     y: 0,
     opacity: 1,
     duration: 3,
     ease: "power2.out"
   });
 }
 
 
 changeTextAndAnimate();
 
  


const smoothScroll=()=>{
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

 




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
smoothScroll();
