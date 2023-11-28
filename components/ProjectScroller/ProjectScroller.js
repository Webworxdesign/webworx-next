'use client';
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import className from 'classnames/bind';
import styles from './ProjectScroller.module.scss';
import { Container, ContentWrapper} from '..'
import ThemeSettings from '../../constants/themeSettings';

let cx = className.bind(styles);

export default function ProjectScroller({ }) {

    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
  
    gsap.registerPlugin(ScrollTrigger);
  
    useLayoutEffect(() => { 

        console.log(document.documentElement.clientWidth)



        const sectionScrollWidth = Number(sectionRef.current.scrollWidth) - Number(sectionRef.current.offsetWidth);

        const pin = gsap.fromTo(
            sectionRef.current,
            {
            translateX: 0,
            },
            {
            translateX: "-" + sectionScrollWidth + "px",
            ease: "none",
            duration: 1,
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
                pin: true,
            },
            }
        );
        return () => {
            {/* A return function for killing the animation on component unmount */ }
            pin.kill();
        };
    }, []);

    return (
        <section className={cx('project-horizontal-scroller')} ref={triggerRef}>

            <div className="container">
                <h2 className='section-title'>Our Work</h2>
            </div>

            <div className={cx('pin-wrap')} ref={sectionRef}>
                <div className={cx('project-item')}>
                    1
                </div>
                <div className={cx('project-item')}>
                    2
                </div>
                <div className={cx('project-item')}>
                    3
                </div>
                <div className={cx('project-item')}>
                    4
                </div>
                <div className={cx('project-item')}>
                    5
                </div>
                <div className={cx('project-item')}>
                    6
                </div>
            </div>         
        </section>
    )
}
