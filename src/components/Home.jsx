import React from 'react';
import PropTypes from 'prop-types';
import './Home.css';

const Home = ({ children, className = '' }) => {
  return (
    <div className={`home-container ${className}`}>
      <div className="home-content">
        {children}
      </div>
    </div>
  );
};

Home.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Home; 