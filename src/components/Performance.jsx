import React, { useRef } from 'react'
import { performanceImages, performanceImgPositions } from '../constants'
import { useMediaQuery } from 'react-responsive'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'

const Performance = () => {

    const isMobile = useMediaQuery({ query: '(max-width: 1024px)'});
    const sectionRef = useRef(null);

    useGSAP(()=>{

        gsap.fromTo(
            ".content p",
            { opacity: 0, y: 10},
            {
                opacity: 1,
                y:0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.content p',
                    start: 'top bottom',
                    end: 'top center',
                    scrub: true,
                    invalidateOnRefresh: true,
                }
                
            }
        );

        if(isMobile) return;

        const tl = gsap.timeline({
            defaults: { ease: "power1.inOut", duration: 2, overwrite: "auto"},
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "center center",
                scrub: 1,
                invalidateOnRefresh: true,
            },
        });

        performanceImgPositions.forEach((pos)=>{
            if(pos.id === 'p5') return

            gsap.set(`.${pos.id}`, { y:100, autoAlpha: 1 });

            const toVars = { y: 0, autoAlpha: 1};
            if(pos.left !=undefined) toVars.left = `${pos.left}%`;
            if(pos.right !=undefined) toVars.right = `${pos.right}%`;
            if(pos.bottom !=undefined) toVars.bottom = `${pos.bottom}%`;
            if(pos.transform !=undefined) toVars.transform = `${pos.transform}%`;

            tl.to(`.${pos.id}`, toVars, 0);

        });
        return () => {
            tl.scrollTrigger && tl.scrollTrigger.kill();
            tl.kill();
        }
    },{scope : sectionRef, dependencies:[isMobile]})
  return (
    <section id="performance" ref={sectionRef}>
        <h2>Next-level graphics performance. Game on.</h2>

        <div className="wrapper">
            {performanceImages.map(({src , id})=>(
                <img key={id} src={src} alt={id} className={id} />
            ))}
        </div>
        <div className="content">
            <p>
                AI in the fast lane. MacBook Air delivers blazing-fast AI performance thanks to the powerful combination of the GPU, 
                Neural Engine, and unified memory in M5.{' '}<span className='text-white'> With a Neural Accelerator built into each GPU core, </span>{' '}AI tasks run with amazing efficiency. 
                From AI image upscaling to running the latest large language models. You’ll be more productive and creative than ever.
            </p>
        </div>
    </section>
  )
}

export default Performance
