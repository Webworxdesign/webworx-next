import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import className from 'classnames/bind';
import styles from './AnimatedText.module.scss';

let cx = className.bind(styles);

const AnimatedText = ({ text, delay = 0 }) => {

  const textRef = useRef(null);

  useLayoutEffect(() => {
    const letters = textRef.current.children;

    gsap.fromTo(
      letters,
      { 
        y: 40,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        delay: delay,
        duration: 2,
        ease: 'power4.out', 
      }
    )
  }, [text]);

  return (
    <div ref={textRef}>
      {text.split('').map((letter, index) => (
        
        <span className={cx('letter-span', letter == '&' ? 'small' : '')} key={index}>{letter}{letter == ' ' ? <span dangerouslySetInnerHTML={{__html: '&nbsp;'}} /> : ''}</span>

      ))}
    </div>
  );
};

export default AnimatedText;