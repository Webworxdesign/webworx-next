'use client';
import React from 'react'
import className from 'classnames/bind';
import styles from './ServiceItem.module.scss';

let cx = className.bind(styles);

export default function ServiceItem({index, title, breakDown, setModal}) {

  return (
      <div 
        onMouseEnter={() => {setModal({active: true, index})}} 
        onMouseLeave={() => {setModal({active: false, index})}} 
        className={cx('service')} >
        <h2>{title}</h2>
        <div className={cx('service-items')}>
          {breakDown && breakDown.serviceItem.map((item, index) => (
            <p key={index}>{item.serviceItemTitle}</p>
          ))}
        </div>
      </div>
  )
}
