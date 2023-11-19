'use client';
import React, { useLayoutEffect, useRef } from 'react'
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

let cx = className.bind(styles);

export default function Intro() {

  const background = useRef(null);
  const introImage = useRef(null);

  useLayoutEffect( () => {
      gsap.registerPlugin(ScrollTrigger);

      const timeline = gsap.timeline({
          scrollTrigger: {
              trigger: document.documentElement,
              scrub: true,
              start: "top",
              end: "+=500px",
          },
      })

      timeline
          .from(background.current, {clipPath: `inset(15%)`})
          .to(introImage.current, {height: "200px"}, 0)
  }, [])

  return (
      <div className={cx('homeHeader')}>
          <div className={cx('backgroundImage')} ref={background}>
              <Image 
                  src={'/images/background.jpeg'}
                  fill={true}
                  alt="background image"
                  priority={true}
              />
          </div>
          <div className={cx('intro')}>
                  <div ref={introImage} data-scroll data-scroll-speed="0.3" className={cx('introImage')}>
                      <Image
                          src={'/images/intro.png'}
                          alt="intro image"
                          fill={true} 
                          priority={true}
                      />
                  </div>
                  <h1 data-scroll data-scroll-speed="0.7">SMOOTH SCROLL</h1>
           </div>
      </div>
  )
}
