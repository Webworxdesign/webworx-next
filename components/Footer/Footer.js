import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import classNames from 'classnames/bind';
import { Container, ContentWrapper, NavigationMenu } from '../../components';
import { gql, useQuery } from '@apollo/client';
import styles from './Footer.module.scss';
import Image from 'next/image';
import ProjectArrow from '../../assets/svg/PorjectArrow';

let cx = classNames.bind(styles);

export default function Footer({ title, menuItems }) {
  const year = new Date().getFullYear();
  const { loading, error, data } = useQuery(FoooterContent);
  const buttonTrack = useRef()
  const buttonTrackClone = useRef()
  const projectButton = useRef()
  const buttonOuter = useRef()
  const [pageLoaded,setPageLoaded] = useState(false)
  const [hoverState,setHoverState] = useState(false)
  const [buttonHoverPos,setButtonHoverPos] = useState({x:0,y:0})
  
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
        y: -30,
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
        y: 90,
        skewX: "7deg"
      })
    } 
   
  }, [hoverState])

  useEffect(()=>{
    let buttonTimeline = gsap.timeline()
     buttonTimeline.to(projectButton.current,{
      rotationY: buttonHoverPos.y, 
      rotationX: buttonHoverPos.x,
      ease: "power4.out",
    });
  },[buttonHoverPos])

  //Attach event listeners to footer elements
  useEffect(()=>{
    setTimeout(() => {

      const footerLogo = document.querySelectorAll('.social-icons figure')
      footerLogo.forEach((ele)=>{
        const xTo = gsap.quickTo(ele, "x", {duration: 1, ease: "elastic.out(1, 0.3)"})        
        const yTo = gsap.quickTo(ele, "y", {duration: 1, ease: "elastic.out(1, 0.3)"})       
        
        const mouseMove = (e) => {          
          const { clientX, clientY } = e;          
          const {height, width, left, top} = ele.getBoundingClientRect();          
          const x = clientX - (left + width/2)          
          const y = clientY - (top + height/2)          
          xTo(x)          
          yTo(y)          
        }        
        
        const mouseLeave = (e) => {          
          gsap.to(ele, {x: 0, duration: 0.6})          
          gsap.to(ele, {y: 0, duration: 0.6})          
          xTo(0)          
          yTo(0)          
        }        
        
        ele.addEventListener("mousemove", mouseMove)        
        ele.addEventListener("mouseleave", mouseLeave)        
        
        return () => {          
          ele.removeEventListener("mousemove", mouseMove)          
          ele.removeEventListener("mouseleave", mouseLeave)          
        }
      })
    }, 6000)

    setTimeout(() => {      
      const element = [buttonOuter.current];
      element.push(...document.querySelectorAll('.footer-logo'))

      element.forEach((ele)=>{
        const handleMouseMove = (event) => {
          const { clientX, clientY } = event;
          const { left, top, width, height } = ele.getBoundingClientRect();
    
          const xPercent = ((clientX - left) / width - 0.5) // Normalize mouse position
          const yPercent = ((clientY - top) / height - 0.5) * 4
          console.log(yPercent,xPercent);
          gsap.to(ele, {
            duration: 0.5,
            rotationX: 10 * yPercent, // Adjust the tilt sensitivity by changing the multiplier
            rotationY: 10 * xPercent,
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
    }, 6000);

  },[])


  return (
    <footer className={cx('component')} >
      <div className="button-outer" ref={buttonOuter} >
        <button className="btn btn-primary marquee" onMouseEnter={() => {setHoverState(true)}} onMouseLeave={() => {setHoverState(false)}} ref={projectButton} >
            <div className="marquee__inner" ref={buttonTrack} >
                <span className="marquee__line">Start a project <ProjectArrow /></span>
                <span className="marquee__line">Start a project <ProjectArrow /></span>
                <span className="marquee__line">Start a project <ProjectArrow /></span>
                <span className="marquee__line">Start a project <ProjectArrow /></span>
            </div>
            <div className="marquee__inner clone" ref={ buttonTrackClone } >
                <span className="marquee__line">Start a project <ProjectArrow /></span>
                <span className="marquee__line">Start a project <ProjectArrow /></span>
                <span className="marquee__line">Start a project <ProjectArrow /></span>
                <span className="marquee__line">Start a project <ProjectArrow /></span>
            </div>
        </button>
      </div>
      {data?.pages?.nodes[0]?.content && <div dangerouslySetInnerHTML={{ __html: data.pages.nodes[0].content ?? '' }} />}
    </footer >
  );
}

const FoooterContent = gql `query GetPosts {
  pages(where: {title: "Footer"}) {
    nodes {
      id
      title
      date
      content
    }    
  }
}`