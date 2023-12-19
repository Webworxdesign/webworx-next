'use client';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
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
import ProjectArrow from '../../assets/svg/PorjectArrow';
import { StartProjectButton } from '../StartProjectButton';
gsap.registerPlugin(ScrollTrigger);

let cx = className.bind(styles);

export default function HomeHeroBanner() {

    const { featuredHeroVideo } = ThemeSettings();

    
    const heroVideo = featuredHeroVideo ? featuredHeroVideo.mediaItemUrl : null;

    const [hoverState,setHoverState] = useState(false)

    const heroContainer = useRef(null);
    const bannerImgRef = useRef(null);
    const bannerDescRef = useRef(null);
    const studioTextRef = useRef(null);
    const buttonTrack = useRef(null)
    const buttonTrackClone = useRef(null)

    useLayoutEffect( () => {

        const bannerImgAnime = bannerImgRef.current;
        gsap.fromTo( 
            bannerImgAnime, 
            { opacity: 0},
            { opacity: 1, duration: 2, delay: 2 }
        )

        const heroContainerWrapper = heroContainer.current;
        gsap.to( 
            bannerImgAnime, { 
                height: document.documentElement.clientWidth > 768 ? '650px' : '300px', 
                width: ( Number(document.documentElement.clientWidth) - Number(heroContainer.current.offsetWidth) ) / 2 + Number(heroContainer.current.offsetWidth), 
                borderTopRightRadius: 0, 
                borderBottomRightRadius: 0, 
                x: 10, 
                marginTop: 0, 
                duration: 10,
                ease: "power3.out",
                scrollTrigger: {
                    trigger:  heroContainerWrapper,
                    start: "-100px",
                    end: "350px",
                    scrub: true,
                    markers: true,
                    invalidateOnRefresh: true,
                }
            }
        )

        const studioTextAnime = studioTextRef.current;
        gsap.fromTo(
            studioTextAnime, 
            { 
                left: '100%',
                x: '-15%',
            }, 
            { 
                left: '0%', 
                x: '0%',
                duration: 10, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger:  heroContainerWrapper,
                    start: "top 150px",
                    end: "bottom 200px",
                    scrub: true,
                    invalidateOnRefresh: true,
                } 
            }
        )

        const bannerDescAnime = bannerDescRef.current;
        gsap.fromTo(
            bannerDescAnime, 
            { 
                opacity: 0, 
                y: 100,
            }, 
            { 
                opacity: 1, 
                y: 0,
                duration: 20, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger:  heroContainerWrapper,
                    start: "top 100px",
                    end: "bottom top 400px",
                    scrub: true,
                    markers: false, 
                    invalidateOnRefresh: true,
                }
            }
        )

    }, [])

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
        <div className={cx('home-hero-banner')}>
            
            <div className="container" ref={heroContainer}>
                <h2><AnimatedText text="We are a creative" /></h2>
                <h1 className="mb-0"><AnimatedText text="Design &" delay={0.5} /></h1>
                
                <div className={cx('banner-img')} ref={bannerImgRef}>
                    {heroVideo ? (
                        <video autoPlay loop muted playsInline>
                            <source src={heroVideo} type="video/mp4" />
                        </video>
                    ) : (
                        <Image src={bannerImg} alt="banner image" />
                    )}
                    
                </div>
                
                <h1>
                    <AnimatedText text="Development" delay={1} />
                    <div className={cx('studio-text', 'mt-2')} ref={studioTextRef}>
                        <AnimatedText text="Studio" delay={1.5} />
                    </div>
                </h1>
                <div  className={cx('banner-description')} ref={bannerDescRef}>
                    <h3>that help businesses to connect with customers in a meaningful way</h3>
                    <StartProjectButton />
                </div>
            </div>
                            
        </div>
    )
}
