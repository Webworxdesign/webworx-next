import React from 'react'
import { motion } from 'framer-motion';
import styles from './Curve.module.scss';

export default function Curve() {
    const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
    const initialPath = `M100 0 L200 0 L200 ${innerHeight} L100 ${innerHeight} Q-100 ${innerHeight/2} 100 0`
    const targetPath = `M100 0 L200 0 L200 ${innerHeight} L100 ${innerHeight} Q100 ${innerHeight/2} 100 0`
    
    const curve = {
        initial: {
            d: initialPath
        },
        enter: {
            d: targetPath,
            transition: {duration: 2, ease: [0.76, 0, 0.24, 1]}
        },
        exit: {
            d: initialPath,
            transition: {duration: 1.5, ease: [0.76, 0, 0.24, 1]}
        }
    }

    return (
        <svg className={`svgCurve ${styles.svgCurve}`}>
            <motion.path variants={curve} initial="initial" animate="enter" exit="exit"></motion.path>
        </svg>
    )
}
