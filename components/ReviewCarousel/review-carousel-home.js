import React, { useState, useLayoutEffect, useEffect, useRef, useMemo } from "react"
import { gql, useQuery } from '@apollo/client' 
import gsap from "gsap"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import styles from "./review-carousel.module.scss" 
import Image from "next/image";
import useWindowDimensions from './../../fragments/WindowDimensions';

export default function ReviewCarouselHome() {

  const [play, setPlay] = useState(true);
  const [sliderStatus, setSliderStatus] = useState(true) 
  const [currentSlide, setCurrentSlide] = useState(0) 
  const [loaded, setLoaded] = useState(false) 
  const [buttonText, setButtonText] = useState('View All');
  const [btnHover, setBtnHover] = useState(false);
  const [perView, setPerView] = useState(0);
  const [sliderAmount, setSliderAmount] = useState(0);
  // Animation States 

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
      buttonText == 'View All' && setButtonText('Hide')
      buttonText == 'Hide' && setButtonText('View All')
    }, 500);

    slidesHoverRotateTimeline.reverse();

  }

  const { height, width } = useWindowDimensions();

  useEffect(() => {

    if (SliderItemsRefs.current.length === sliderAmount) {


      setTimeout(() => {
        let btnTopPos = '35%';
        let btnLeftPos = '30%';
        if(width < 767) {
          btnTopPos = '60%';
          btnLeftPos = '40%';
        }
        buttonTimeline
          .to(toggleSliderBtn.current, 0.1, { opacity: 0 })
          .to(toggleSliderBtn.current, 0.1, { top: btnTopPos, left: btnLeftPos, delay: 0.15 })
          .to(toggleSliderBtn.current, 0.1, { opacity: 1, delay: 0.15 });
  
        SliderItemsRefs.length && SliderItemsRefs.current.forEach( (slideItem, index) => {
          const slideItemWidth = slideItem ? slideItem.offsetWidth : 0;
          const positionTopArray = [0, 30, 10, 55, 70];
          let positionLeftArray = [20, 89, 181, 87, 176];
          if(width < 767) {
            positionLeftArray = [20, 49, 121, 7, 76];
          }
          let setLeft = -(((slideItemWidth + 50) * index) - positionLeftArray[index]);
          if(width < 767) {
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
    }

  }, [SliderItemsRefs.current, sliderAmount]);

  useEffect(() => {
    if (!loading && data) {
      if (play) {
        buttonTimeline.play();
        slidesTimeline.play()
      } else {
        buttonTimeline.reverse();
        slidesTimeline.reverse()
      }
    }
  }, []);

  useEffect(() => {
    if (!loading && data) {
      if (btnHover && sliderStatus) {
        slidesHoverRotateTimeline.play();
      } else {
        slidesHoverRotateTimeline.reverse();
      }
    }
  }, [btnHover]);


  const { loading, error, data } = useQuery(GetTestimonialsPosts);
  
  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  const testimonials = data.testimonials.nodes;

 
  return (
    <div className={`container-fluid ${styles['toggle-slider']} ${!sliderStatus ? styles['slider-on'] : styles['slider-off']}`}>
      <div className="container">
        <div className={styles['row']}>
          <div className={`${styles['review-slider-column']} col-md-6 order-2 order-md-1`}>

            <button 
              className={`${styles['view-carousel-btn']} btnz`} 
              onClick={handleSliderStatus} 
              onMouseEnter={() => setBtnHover(true)} 
              onMouseLeave={() => setBtnHover(false)} 
              ref={toggleSliderBtn}
              aria-label="button2"
            >
              {buttonText}
            </button> 

            <div className={`navigation-wrapper ${styles['reviewCarouselWrapper']}`}>

              <div className={`keen-slider ${styles['slider-wrapper']}`} ref={sliderRef}>
                {testimonials.map( (testimonial, index) => {
                  return( 
                    <div 
                      key={`slide-${index+1}`} 
                      className={`keen-slider__slide number-slide${index+1} ${styles.keenSlide} ${styles['slider-item']}`}
                      ref={addToSliderItemsRefs}>
                      <div className={styles.image} >
                        {testimonial.featuredImage && <Image src={testimonial.featuredImage.node.sourceUrl} alt={testimonial.title} height={390} width={380} />}
                      </div>
                      <section>
                        <div className={`${styles.contentWrapper}`}>
                          <h3 className="small mb-0"><div dangerouslySetInnerHTML={{ __html: testimonial.content ?? '' }} /></h3>
                        </div>
                        <div className={styles.userContent}>
                          <div className={styles.userInfo}>
                            <p className="mb-0">
                              <b>{testimonial.TestimonialFields.author}</b>
                            </p>
                            <p className="mb-0 body2">{testimonial.TestimonialFields.company}</p>
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
                      // buttonStyle={["arrow-left", "green"]}
                      onClick={ (e) => e.stopPropagation() || instanceRef.current?.prev() } 
                      className={ `${ currentSlide === 0? styles.disabledArrow : "" } ` } 
                      aria-label="button"
                    >
                      Left Large Arrow
                    </button>

                    <button
                      // buttonStyle={["arrow-right", "green"]}
                      onClick={(e) =>
                        e.stopPropagation() || instanceRef.current?.next()
                      }
                      className={`${ currentSlide === instanceRef.current.track.details.slides.length - perView ? styles.disabledArrow : "" }  `} 
                      aria-label="button"
                    >
                      Right Large Arrow
                    </button>
                  </>
                )}
              </div>
              
            </div>
          </div>
          <div className={`${styles['review-content-column']} col-md-6 order-1 order-md-2`}>
              <p className="overline">Testimonials</p>
              <h2 className="max-w-250 max-w-md-450 mx-auto">What Our Clients Say</h2>
              <p className="max-w-300 max-w-md-750 mx-auto">Our clients are our partners and trust us to help tell their stories.</p>
          </div>
        </div>
      </div>
    </div>
  )
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
