'use client';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap';
import styles from './StartProjectButton.module.scss';
import className from 'classnames/bind';
import ProjectArrow from '../../assets/svg/PorjectArrow';

let cx = className.bind(styles);

export default function StartProjectButton() {
    
    const [hoverState,setHoverState] = useState(false)
    
    const buttonTrack = useRef(null)
    const buttonTrackClone = useRef(null)

    useEffect(() => {
        let topText = gsap.timeline()
        let bottomText = gsap.timeline()
        
        if(hoverState) {
          //Top Text
          topText.to(buttonTrack.current,{
            duration: 1,
            ease: "power4.out",
            repeat: 0,
            rotationX: 120,
            transformOrigin: "right top",
            y: -80,
            skewX: "-7deg"
          })
          //Bottom Text
          bottomText.to(buttonTrackClone.current,{
            duration: 1,
            ease: "power4.out",
            repeat: 0,
            rotationX: 0,
            transformOrigin: "right top",
            y: -35,
            skewX: "0deg"
          })
          // return () => topText.revert();
        } else {
          topText.to(buttonTrack.current,{
            duration: 1,
            ease: "power4.out",
            repeat: 0,
            rotationX: 0,
            transformOrigin: "right top",
            y: 0,
            skewX: "0deg"
          })
          //Bottom Text
          bottomText.to(buttonTrackClone.current,{
            duration: 1,
            ease: "power4.out",
            repeat: 0,
            rotationX: -120,
            transformOrigin: "right top",
            y: 95,
            skewX: "7deg"
          })
        } 
       
      }, [hoverState])

    return (
        
        <button className={cx('btn', 'btn-primary', 'marquee')} onMouseEnter={() => {setHoverState(true)}} onMouseLeave={() => {setHoverState(false)}}>
            <div className="marquee__inner" ref={buttonTrack}>
                <span className="marquee__line">Start a project <span className={cx('arrow-button')}><ProjectArrow width="20px" height="21px" stroke="#ffffff" fill="#ffffff" /></span></span>
                <span className="marquee__line">Start a project <span className={cx('arrow-button')}><ProjectArrow width="20px" height="21px" stroke="#ffffff" fill="#ffffff" /></span></span>
            </div>
            <div className="marquee__inner" ref={ buttonTrackClone }>
                <span className="marquee__line">Start a project <span className={cx('arrow-button')}><ProjectArrow width="20px" height="21px" stroke="#ffffff" fill="#ffffff" /></span></span>
                <span className="marquee__line">Start a project <span className={cx('arrow-button')}><ProjectArrow width="20px" height="21px" stroke="#ffffff" fill="#ffffff" /></span></span>
            </div>
        </button>
    )
}
