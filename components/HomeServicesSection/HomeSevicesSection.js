'use client';
import {useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import ServicesPosts from '../../constants/ServicesPosts.js';
import className from 'classnames/bind';
import styles from './HomeServicesSection.module.scss';
import { Container, ContentWrapper} from '..'
import { ServiceItem } from './ServiceItem';
import { ServiceModal } from './ServiceModal';

let cx = className.bind(styles);

export default function HomeServiceSection() {
  
  const { nodes } = ServicesPosts();
  const services = nodes ? nodes : [];

  const [modal, setModal] = useState({active: false, index: 0})

  return (
    <section className={cx('home-services-section')}>
        <div className='container'>
            <h2 className='section-title'>Services</h2>
            {
              services.map( (service, index) => {

                const { s, title } = service;

                return <ServiceItem index={index} title={title} breakDown={s} setModal={setModal} key={index} />
                
              })
            }
            <ServiceModal modal={modal} services={services}/>
        </div>
    </section>
  )
}
