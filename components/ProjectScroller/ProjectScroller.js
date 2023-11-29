'use client';
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import className from 'classnames/bind';
import styles from './ProjectScroller.module.scss';
import ProjectsPosts from '../../constants/ProjectsPosts';

let cx = className.bind(styles);

export default function ProjectScroller({ }) {

    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
  
    gsap.registerPlugin(ScrollTrigger);
  
    useLayoutEffect(() => { 

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
    
    const { nodes } = ProjectsPosts();
    const projects = nodes ? nodes : [];

    return (
        <section className={cx('project-horizontal-scroller')} ref={triggerRef}>

            <div className="container">
                <h2 className='section-title'>Our Work</h2>
            </div>

            <div className={cx('pin-wrap')} ref={sectionRef}>
                { projects.map((project, index) => (
                    
                    <div className={cx('project-item')} key={index}>
                        <div className={cx('project-image')}>
                            {project.featuredImage.node.mediaItemUrl ? (
                                <Image
                                    src={project.featuredImage.node.mediaItemUrl}
                                    alt={project.title}
                                    width={500}
                                    height={500}
                                />
                             ) : (
                                <div className={cx('no-image')}></div>
                             )}
                        </div>
                        <h3 className={cx('project-title')}>{project.title}</h3>

                    </div>
                ))}
            </div>         
        </section>
    )
}
