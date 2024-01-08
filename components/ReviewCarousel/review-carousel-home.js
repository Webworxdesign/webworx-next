import React, { useState, useLayoutEffect, useEffect, useRef, useMemo } from "react"
import { gql, useQuery } from '@apollo/client' 
import gsap from "gsap"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import styles from "./review-carousel.module.scss" 
import Image from "next/image";
import useWindowDimensions from './../../fragments/WindowDimensions';
import ViewArrowIcon from "../../assets/svg/ViewArrowIcon"

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


export default function ReviewCarouselHome() {

  // Animation States 
  const [play, setPlay] = useState(true);
  const [sliderStatus, setSliderStatus] = useState(true) 
  const [currentSlide, setCurrentSlide] = useState(0) 
  const [sliderItemWidth, setSliderItemWidth] = useState(0)
  const [loaded, setLoaded] = useState(false) 
  const [buttonText, setButtonText] = useState(true);
  const [btnHover, setBtnHover] = useState(false);
  const [perView, setPerView] = useState(0);

  
  const { loading, error, data } = useQuery(GetTestimonialsPosts);

  // Gsap Animations   
  const toggleSliderBtn = useRef(); 
  const sliderImage = useRef();
  const slidesTimeline = useMemo(() => gsap.timeline({ paused: true }), []);
  const slidesHoverRotateTimeline = useMemo(() => gsap.timeline({ paused: true }), []);

  const SliderItemsRefs = useRef([]);
  SliderItemsRefs.current = [];

  const addToSliderItemsRefs = sliderItemRef => {
    if (sliderItemRef && !SliderItemsRefs.current.includes(sliderItemRef)) {
        SliderItemsRefs.current.push(sliderItemRef);
    }
  };

  // Slider Init
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    breakpoints: {
      "(min-width: 992px)": {
        slides: {
          perView: 3.4,
          spacing: 30,
        },
      },
      "(min-width: 701px) and (max-width: 991px)": {
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
  })

  // Slider Toggle Function
  const handleSliderStatus = () => { 

    setPlay(!play)

    // Toggle slider state (Only adds classes and does not enable and disable slider anymore)
    setSliderStatus(!sliderStatus)

    // Move Slider's index to 0 which is the first slide 
    instanceRef.current?.moveToIdx(0);

    // Change button text
    setTimeout(() => { 
      setButtonText(!buttonText);
    }, 1500);

    slidesHoverRotateTimeline.reverse();

  }

  const { height, width } = useWindowDimensions();

  useLayoutEffect(() => {

    let screenWidth = document.documentElement.clientWidth;

    screenWidth > 1280 ? setSliderItemWidth( ( 1280 / 3.4 ) - 30 ) : 0;

    screenWidth < 1280 && screenWidth > 992 ? setSliderItemWidth( ( screenWidth / 3.4 ) - 30 ) : 0;
	
    screenWidth < 991 && screenWidth > 701 ? setSliderItemWidth( screenWidth / 2.3 - 30 ) : 0;
	
    screenWidth < 700 ? setSliderItemWidth( screenWidth / 1.3 - 20 ) : 0;

    SliderItemsRefs.current.forEach( (slideItem, index) => {
      
      const positionTopArray = [0, 0, 0, 0, 0, 0];
      let positionLeftArray = [100, 100, 80, 60, 50, 20];

      if(width < 1280) { positionLeftArray = [0, 20, 60, 0, 20, 60]; }

      let setLeft = -( sliderItemWidth * index - positionLeftArray[index] );

      if(width < 1280) { setLeft = -( sliderItemWidth * index - positionLeftArray[index]); }
        
      const hoverRotationArray = [5, -5.01, 6.9, -3.02, 8.15, -4.02];

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
          duration: 1.6, 
          ease: "power3.inOut", 
        }, 
        "<"
      );

    })

  }, [loading]);

  useEffect(() => {

    if (play) {
      slidesTimeline.play();
    } else {
      slidesTimeline.reverse();
    }

  }, [play]);

  useEffect(() => {

    if (btnHover && sliderStatus) {
      slidesHoverRotateTimeline.play();
    } else {
      slidesHoverRotateTimeline.reverse();
    }

  }, [btnHover]);
  
  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  const testimonials = data.testimonials.nodes;

 
  return (
    <section className={`container-fluid px-0 ${styles['toggle-slider']} ${!sliderStatus ? styles['slider-on'] : styles['slider-off']}`}>

      <div className="container">

        <div className="row">

          <div className={`navigation-wrapper ${styles['reviewCarouselWrapper']} col-12 order-2 order-md-1`}>

            <div className={`keen-slider ${styles['slider-wrapper']}`} ref={sliderRef}>
              {testimonials.map( (testimonial, index) => {
                
                if (index > 5) { return; }

                return( 
                  <div 
                    key={`slide-${index+1}`} 
                    className={`keen-slider__slide number-slide${index+1} ${styles.keenSlide} ${styles['slider-item']}`}
                    ref={addToSliderItemsRefs} >
                    <div ref={sliderImage} className={styles['testimonial-image']} >
                      {testimonial.featuredImage && <Image src={testimonial.featuredImage.node.sourceUrl} alt={testimonial.title} height={390} width={380} />}
                    </div>
                    <section>
                      <div className={`${styles['testimonial-content']}`} dangerouslySetInnerHTML={{ __html: testimonial.content ?? '' }} />
                      <div className={styles.userContent}>
                        <div className={styles.userInfo}>
                          <p className={styles['testimonial-author']}>{testimonial.TestimonialFields.author}</p>
                          <p className={styles['testimonial-company']}>{testimonial.TestimonialFields.company}</p>
                        </div>
                      </div>
                    </section>
                  </div>
                )
              })}
            </div>

            <div className={`${styles.buttonWrapper} ${styles.homeReview}`}>
              {loaded && instanceRef.current && (
                <>

                  <button 
                    onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
                    className={styles['arrow-right']} 
                    aria-label="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" >
                      <path stroke="#222222" strokeLinecap="round" strokeWidth={3} d="M2.022 21.879 20.113 3.788M3.5 1.591h18.651" />
                      <path fill="#222222" d="M20.735 19.818a1.5 1.5 0 0 0 3 0h-3Zm0-18.818v18.818h3V1h-3Z" />
                    </svg>
                  </button>
                </>
              )}
            </div>

          </div>

          <div className={`${styles['slider-toggler-row']} col-12 order-1 order-md-2`}>
            <div className="row">
              <div className={`${styles['review-slider-column']} col-12 col-md-6 order-2 order-md-1`}>
                
                
                <button 
                  className={`${styles['view-slider-btn']} ${styles['view']} ${play ? styles['active'] : ''}`} 
                  onClick={handleSliderStatus} 
                  onMouseEnter={() => setBtnHover(true)} 
                  onMouseLeave={() => setBtnHover(false)} 
                  aria-label="button"
                >
                  View All
                </button> 
                
                <button 
                  className={`${styles['view-slider-btn']} ${styles['close']} ${!play ? styles['active'] : ''}`} 
                  onClick={handleSliderStatus} 
                  aria-label="button"
                >
                  Close
                </button> 
                
              </div>
              <div className={`${styles['review-content-column']} col-12 col-md-6 order-1 order-md-2`}>
                  <p className={styles['overline']}>Testimonials</p>
                  <h2 className="">What Our Clients Say</h2>
                  <p className={styles['description']}>Our clients are our partners and trust us to help tell their stories.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
