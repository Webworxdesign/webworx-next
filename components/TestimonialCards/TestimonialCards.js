'use client';
import React, { useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import { gql, useQuery } from '@apollo/client';
import gsap from "gsap";
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from  'keen-slider/react';

import className from 'classnames/bind';
import styles from './TestimonialCards.module.scss';
import Image from "next/image";

let cx = className.bind(styles);

export default function TestimonialCards() {

    const [play, setPlay] = useState(true);
    const [sliderStatus, setSliderStatus] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [btnHover, setBtnHover] = useState(false);
    const [perView, setPerView] =useState(0);
    const [sliderItemsAmount, setSliderItemsAmount] = useState(0);

    // Gsap Animations   
    const toggleSliderBtn = useRef(); 
    const buttonTimeline = useMemo(() => gsap.timeline({ paused: true }), []);
    const slidesTimeline = useMemo(() => gsap.timeline({ paused: true }), []);
    const slidesHoverRotateTimeline = useMemo(() => gsap.timeline({ paused: true }), []);

    const SliderItemsRefs = useRef([]);
    SliderItemsRefs.current = [];
  
    const addToSliderItemsRefs = sliderItemRef => {
      if (sliderItemRef && !SliderItemsRefs.current.includes(sliderItemRef)) {
          SliderItemsRefs.current.push(sliderItemRef);
      }
    };

    const [sliderRef, instanceRef] = useKeenSlider(
      {
        initial: 0,
        breakpoints: {
          "(min-width: 992px)": {
            slides: {
              perView: 3.3,
              spacing: 30,
            },
          },
          "(min-width: 700px) and (max-width: 991px)": {
            slides: {
              perView: 2.3,
              spacing: 30,
            },
          },
          "(max-width: 700px)": {
            slides: {
              perView: 1.3,
              spacing: 20,
            },
          },
        },
        slideChanged() {
          console.log('slide changed')
        }, 
        slideChanged(slider) {
          setCurrentSlide(slider.track.details.rel)
        },
        created(slider) {
          setLoaded(true)
          setPerView(Math.floor(slider.options.slides.perView))
        },
        optionsChanged(slider){
          setPerView(Math.floor(slider.options.slides.perView))
        }
      }
    )

    const [sliderOff, setSliderOff] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        let btnTopPos = '35%';
        let btnLeftPos = '30%';
        if(document.documentElement.clientWidth < 767) {
          btnTopPos = '60%';
          btnLeftPos = '40%';
        }
        buttonTimeline
          .to(toggleSliderBtn.current, 0.1, { opacity: 0 })
          .to(toggleSliderBtn.current, 0.1, { top: btnTopPos, left: btnLeftPos, delay: 0.15 })
          .to(toggleSliderBtn.current, 0.1, { opacity: 1, delay: 0.15 });
  
        
        SliderItemsRefs.current.forEach( (slideItem, index) => {
          const slideItemWidth = slideItem ? slideItem.offsetWidth : 0;
          const positionTopArray = [0, 30, 10, 55, 70];
          let positionLeftArray = [20, 89, 181, 87, 176];
          if(document.documentElement.clientWidth < 767) {
            positionLeftArray = [20, 49, 121, 7, 76];
          }
          let setLeft = -(((slideItemWidth + 50) * index) - positionLeftArray[index]);
          if(document.documentElement.clientWidth < 767) {
            setLeft = -((slideItemWidth + 20) * index - positionLeftArray[index]);
          }
  
          const hoverRotationArray = [5, -5.01, 6.9, -3.02, 8.15];
  
          slidesTimeline
          .to(
            slideItem,{ 
              left: setLeft, 
              top: positionTopArray[index], 
              duration: 1,
              ease: "power3.inOut", 
            }, 
            "<"
          );
  
          slidesHoverRotateTimeline
          .to(
            slideItem,{ 
              rotate: hoverRotationArray[index], 
              duration: 1,
              ease: "power3.inOut", 
            }, 
            "<"
          );
  
        })

      }, 500);

      


    console.log('sliderItemsAmount', sliderItemsAmount)
  
  
    }, [sliderItemsAmount]);
  
    useEffect(() => {
      if (play) {
        setSliderItemsAmount(SliderItemsRefs.current.length);
        buttonTimeline.play();
        slidesTimeline.play()
      } else {
        setSliderItemsAmount(SliderItemsRefs.current.length);
        buttonTimeline.reverse();
        slidesTimeline.reverse()
      }
    }, [play]);
  
    useEffect(() => {
      if (btnHover && sliderStatus) {
        setSliderItemsAmount(SliderItemsRefs.current.length);
        slidesHoverRotateTimeline.play();
      } else {
        setSliderItemsAmount(SliderItemsRefs.current.length);
        slidesHoverRotateTimeline.reverse();
      }
    }, [btnHover]);

    const toggleSlider = () => {

      setSliderOff(!sliderOff);

      setPlay(!play)

      // Move Slider's index to 0 which is the first slide 
      instanceRef.current?.moveToIdx(0);

      slidesHoverRotateTimeline.reverse();

    }

    const { loading, error, data } = useQuery(GetTestimonialsPosts);
    
    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error :(</p>;

    const testimonials = data.testimonials.nodes;

    return (
        <section id="testimonial-section" className={cx('testimonial-cards', !sliderOff ? 'slider-on' : 'slider-off')}>  
            <div className="container">
              
              <div ref={sliderRef} className={cx('keen-slider', 'keenslider-wrapper')}>
                {testimonials.map( (testimonial, index) => {
                  return (
                    <div key={index} className={cx('keen-slider__slide', 'number-slide'+index + 1, 'keen-slide', 'slider-item')} ref={addToSliderItemsRefs}>
                      <div className={cx('testimonial-card', `testimonial-card-${index}`)}>
                        <div className={cx('testimonial-card-image')}>
                          {testimonial.featuredImage && <Image src={testimonial.featuredImage.node.sourceUrl} alt={testimonial.title} height={390} width={380} />}
                        </div>
                        {!sliderOff && (
                          <div className={cx('testimonial-card-content')}>
                            { testimonial.content && <div className={cx('content')} dangerouslySetInnerHTML={{ __html: testimonial.content ?? '' }} /> }
                            { testimonial.TestimonialFields.author && <div className={cx('company-author')}>{testimonial.TestimonialFields.author}</div> }
                            { testimonial.TestimonialFields.company && <div className={cx('company-name')}>{testimonial.TestimonialFields.company}</div> }
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className={cx('testimonial-blurb')}>
                <p>Testimonials</p>
                <h2>What Our Clients Say</h2>
                <p>Our clients are our partners and trust us to help tell their stories.</p>
              </div>

              <button ref={toggleSliderBtn} className={cx('testimonial-button')} onClick={ toggleSlider } >
                {sliderOff ? 'View all' : 'Close'}
              </button>
              
            </div>
        </section>
    );
}

const GetTestimonialsPosts = gql`
query Testimonials {
  testimonials {
    nodes {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      TestimonialFields {
        author
        company
        companyUrl
      }
    }
  }
}
`;