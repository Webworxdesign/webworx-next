'use client';
import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import className from 'classnames/bind';
import styles from './ProjectScroller.module.scss';
import Link from 'next/link';

let cx = className.bind(styles);

const GetProjectsPosts = gql`
query Projects {
  projects {
    nodes {
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      title
      link
    }
  }
}
`;

export default function ProjectScroller({ }) {

    const { loading, error, data } = useQuery(GetProjectsPosts);

    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const projectCard = useRef([])
  
    gsap.registerPlugin(ScrollTrigger);
  
    useLayoutEffect(() => { 
        if (!loading && data) {

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
        }
    }, [loading, data]);
    
    useEffect(()=>{
        setTimeout(() => {      
            const element = projectCard.current;
            
            element.forEach((ele)=>{
              const handleMouseMove = (event) => {
                const { clientX, clientY } = event;
                const { left, top, width, height } = ele.getBoundingClientRect();
          
                const xPercent = ((clientX - left) / width - 0.5) // Normalize mouse position
                const yPercent = ((clientY - top) / height - 0.5) 
                
                gsap.to(ele, {
                  duration: 0.5,
                  rotationX: 5 * yPercent, // Adjust the tilt sensitivity by changing the multiplier
                  rotationY: 5 * xPercent,
                  transformPerspective: 500,
                  ease: 'power2.out',
                });
              };
          
              const handleMouseLeave = () => {
                gsap.to(ele, {
                  duration: 0.5,
                  rotationX: 0,
                  rotationY: 0,
                  ease: 'power2.out',
                });
              };
          
              ele.addEventListener('mousemove', handleMouseMove);
              ele.addEventListener('mouseleave', handleMouseLeave);
          
              return () => {
                ele.removeEventListener('mousemove', handleMouseMove);
                ele.removeEventListener('mouseleave', handleMouseLeave);
              };
            })
          }, 5000);
    },[])

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error :(</p>;
  
    const projects = data.projects.nodes;

    return (
        <section className={cx('project-horizontal-scroller')} ref={triggerRef}>

            <div className="container">

                <h2 className='section-title'>Our Work</h2>

                <div className={cx('pin-wrap')} ref={sectionRef}>
                    { projects.map((project, index) => (
                        
                        <Link href={project.link} className={cx('project-item')} key={index} ref={(el) => (projectCard.current[index] = el)} >
                            <div className={cx('project-image')}>
                                {project.featuredImage.node.mediaItemUrl ? (
                                    <Image
                                        src={project.featuredImage.node.mediaItemUrl}
                                        alt={project.title}
                                        width={500}
                                        height={500}
                                    />
                                ) : (
                                    ''
                                )}
                            </div>
                            <h3 className={cx('project-title')}>{project.title}</h3>

                        </Link>
                    ))}
                </div>    
            </div>     
        </section>
    )
}
