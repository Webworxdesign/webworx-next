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
        y: 80,
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
    console.log(buttonHoverPos);
  },[buttonHoverPos])

  const buttonHover = (e) => {
    const bounding = e.target.getBoundingClientRect()
    setButtonHoverPos({
      // x:Math.round(((e.clientX/e.pageX)-0.5 + Number.EPSILON) * 10) / 10,
      // y:Math.round(((e.clientY/e.pageY)-0.5 + Number.EPSILON) * 10) / 10
      x:(Math.round(bounding.x + Number.EPSILON))/10,
      y:(Math.round(bounding.y + Number.EPSILON))/10
    })
    console.log('happening',buttonOuter.current.getBoundingClientRect() );
  }

  return (
    <footer className={cx('component')} >
      <div className="button-outer" ref={buttonOuter} onMouseOver={(e)=>{buttonHover(e)}} >
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