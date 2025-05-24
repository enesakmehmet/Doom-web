import React from 'react';
import { servicesLibrary } from '../components/services/ServicesLibrary';

const Hizmetler = () => (
  <div className="page-content">
    <h1>Hizmetler</h1>
    <div className="services-list">
      {servicesLibrary.map((service, idx) => (
        <div className="service-item card" key={idx}>
          <div className="service-icon" style={{ fontSize: '2.4rem', marginBottom: '0.6rem' }}>{service.icon}</div>
          <h2>{service.title}</h2>
          <p className="service-desc">{service.description}</p>
          <div className="service-details">{service.details}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Hizmetler;
