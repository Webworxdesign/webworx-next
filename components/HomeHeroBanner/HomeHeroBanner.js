'use client';
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import className from 'classnames/bind';
import styles from './HomeHeroBanner.module.scss';
import { Container, ContentWrapper} from './../../components'
import bannerImg from './../../assets/images/home-banner-img.jpg';
import bannerCards from './../../assets/images/banner-cards.jpg';
import ThemeSettings from './../../constants/themeSettings';
import AnimatedText from '../AnimatedText/Animatedtext';

let cx = className.bind(styles);

export default function HomeHeroBanner() {

    const { featuredHeroVideo } = ThemeSettings();

    
    const heroVideo = featuredHeroVideo ? featuredHeroVideo.mediaItemUrl : null;

    const heroContainer = useRef(null);
    const bannerImgRef = useRef(null);
    const bannerDescRef = useRef(null);

    useLayoutEffect( () => {

        const bannerMaxWidth = ( Number(document.documentElement.clientWidth) - Number(heroContainer.current.offsetWidth) ) / 2 + Number(heroContainer.current.offsetWidth);

        gsap.registerPlugin(ScrollTrigger);

        const timeline = gsap.timeline({
            scrollTrigger: { 
                trigger: document.documentElement,
                scrub: true, 
                start: "top",
                end: "800px top", 
            },
        })

        // bannerImgRef height dependent on screen size
        const bannerImgHeight = document.documentElement.clientWidth > 768 ? '75vh' : '30vh';

        timeline
            .fromTo( 
                bannerImgRef.current, 
                { duration: 50 },
                { height: bannerImgHeight, width: bannerMaxWidth, borderTopRightRadius: 0, borderBottomRightRadius: 0, x: 10, marginTop: 0, duration: 5  }
            )
            .fromTo(
                bannerDescRef.current, 
                { opacity: 0, duration: 5 }, 
                { opacity:1, duration: 10 }
            ) 

        gsap.fromTo( 
            bannerImgRef.current, 
            { opacity: 0},
            { opacity: 1, duration: 2, delay: 3 }
        )
    }, [])

    return (
        <div className={cx('home-hero-banner')}>
            
            <div className="container" ref={heroContainer}>
                <h2><AnimatedText text="We are a creative" /></h2>
                <h1 className="mb-0"><AnimatedText text="Design &" delay={1} /></h1>
                
                <div className={cx('banner-img')} ref={bannerImgRef}>
                    {heroVideo ? (
                        <video autoPlay loop muted playsInline>
                            <source src={heroVideo} type="video/mp4" />
                        </video>
                    ) : (
                        <Image src={bannerImg} alt="banner image" />
                    )}
                    
                </div>
                
                <h1><AnimatedText text="Development" delay={2} /></h1>
                <div  className={cx('banner-description')} ref={bannerDescRef}>
                    <h3>that help businesses to connect with customers in a meaningful way</h3>
                    <button className="btn btn-primary marquee" style={{width: '200px'}}>
                        <div className="marquee__inner">
                            <span className="marquee__line">Start a project +</span>
                            <span className="marquee__line">Start a project +</span>
                        </div>
                    </button>
                </div>
            </div>
                            
        </div>
    )
}
