import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import className from 'classnames/bind';
import styles from './AnimatedText.module.scss';

let cx = className.bind(styles);

const AnimatedText = ({ text, delay = 0 }) => {

  const textRef = useRef(null);

  useLayoutEffect(() => {
    const letters = textRef.current.children;
 
    gsap.fromTo(letters, {
      opacity: 0,
      top: 20,
      stagger: 0.1, // Stagger the animations with a 0.1s delay between each letter
      ease: 'power1.out',
    }, {
        opacity: 1,
        top: 0,
        stagger: 0.1,
        delay: delay,
        ease: 'expo.out',
    });
  }, [text]);

  return (
    <div ref={textRef}>
      {text.split('').map((letter, index) => (
        <span className={cx('letter-span')} key={index}>{letter}</span>
      ))}
    </div>
  );
};

export default AnimatedText;