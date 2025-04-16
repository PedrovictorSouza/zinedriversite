import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UnityInstanceManager from '../utils/UnityInstanceManager';
import './WebGLContainer.css';

const WebGLContainer = ({ className = '' }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let canvas = null;

    const initUnity = async () => {
      try {
        canvas = document.querySelector("#unity-canvas");
        await UnityInstanceManager.initialize(canvas);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao inicializar Unity:', error);
        setIsLoading(false);
      }
    };

    initUnity();

    return () => {
      UnityInstanceManager.quit();
    };
  }, []);

  return (
    <div className={`webgl-container ${className}`}>
      <canvas id="unity-canvas" style={{ width: '100%', height: '100%' }}></canvas>
      {isLoading && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          color: 'white' 
        }}>
          Carregando Unity WebGL...
        </div>
      )}
    </div>
  );
};

WebGLContainer.propTypes = {
  className: PropTypes.string,
};

export default WebGLContainer; 