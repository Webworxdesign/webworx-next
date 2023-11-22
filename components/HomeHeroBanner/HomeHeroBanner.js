'use client';
import React, { useLayoutEffect, useRef } from 'react'
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import className from 'classnames/bind';
import styles from './HomeHeroBanner.module.scss';
import { Container, ContentWrapper} from './../../components'
import bannerImg from './../../assets/images/home-banner-img.jpg';


let cx = className.bind(styles);

export default function HomeHeroBanner() {

    const bannerImgRef = useRef(null);
    const bannerDescRef = useRef(null);

    useLayoutEffect( () => {
        gsap.registerPlugin(ScrollTrigger);

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: document.documentElement,
                scrub: true,
                start: "top",
                end: "+=300px",
            },
        })

        timeline
            .fromTo( 
                bannerImgRef.current, 
                { clipPath: "inset(100%)", height: 0, duration: 5 },
                { clipPath: "inset(0)", height: 500, duration: 5 }
            )
            .fromTo(
                bannerDescRef.current, 
                { opacity: 0, duration: 5 }, 
                { opacity:1, duration: 10 }
            )
    }, [])

    return (
        <div className={cx('home-hero-banner')}>

            <Container>
                <ContentWrapper>
                    <h2>We build engaging</h2>
                    <h1 className="mb-0">Digital</h1>
                </ContentWrapper>
            </Container>

            <div ref={bannerImgRef} className={cx('banner-img')} style={{ backgroundImage: `url(${bannerImg.src})`}}>
                {/* <Image 
                    src={bannerImg} 
                    alt='banner' 
                    style={{objectFit: "cover"}} /> */}
            </div>

            <Container>
                <ContentWrapper>
                    <h1>Experiences</h1>
                    <h3 className={cx('banner-description')} ref={bannerDescRef}>that help businesses to connect with customers in a meaningful way</h3>
                </ContentWrapper>
            </Container>
                
        </div>
    )
}
