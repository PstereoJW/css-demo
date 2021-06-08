import React, { useState } from 'react';

const MouseMove = () => {
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);
  let lastX: number = 0;
  let lastY: number = 0;

  const handleMouseMove = (e) => {
    if (lastX && lastY) {
      setTranslateX(e.clientX - lastX);
      setTranslateY(e.clientY - lastY);
    }
    lastX = e.clientX;
    lastY = e.clientY;
  };

  return (
    <div
        onMouseMove={handleMouseMove}
        style={{
        transform: `translateX(${translateX}px)translateY(${translateY}px)`
      }}
    >
      <div style={{ width: 100, height: 100, backgroundColor: 'blue' }} />
    </div>
  );
};

export default MouseMove;
