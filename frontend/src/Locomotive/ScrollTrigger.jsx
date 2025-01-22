import React from 'react'

useEffect(() => {
 let ctx = gsap.context(() => {
   const tl = gsap.timeline({
     scrollTrigger: {
       trigger: heroContainerRef.current,
       scroller: '.App',
       start: 'top top',
       scrub: 1,
     },
   });

   tl.to(textColRef.current, {
     x: 200,
     opacity: 0,
   });
   tl.to(
     imageWrapperRef.current,
     {
       x: -200,
       opacity: 0,
     },
     0
   );
 });
 return () => ctx.revert();
}, []);

export default ScrollTrigger
