import React, { useRef, useEffect } from 'react';

const BilibiliBar = () => {
  const myPics = useRef<HTMLCanvasElement>(null);
  // When true, moving the mouse draws on the canvas
  let isDrawing = false;
  let x = 0;
  let y = 0;
  useEffect(() => {
    console.log(myPics.current);
    const context = myPics.current?.getContext('2d'); // The x and y offset of the canvas from the edge of the page
    const rect = myPics.current?.getBoundingClientRect();

    // Add the event listeners for mousedown, mousemove, and mouseup
    myPics.current?.addEventListener('mousedown', (e) => {
      if (!rect) return;
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      isDrawing = true;
    });

    myPics.current?.addEventListener('mousemove', (e) => {
      console.log(e);
      if (!rect) return;
      if (isDrawing === false) {
        drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (!rect) return;
      if (isDrawing === true) {
        drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
        x = 0;
        y = 0;
        isDrawing = false;
      }
    });
  }, []);

  function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  }

  return (
    <div>
      <h1>Drawing with mouse events</h1>

      <canvas ref={myPics}
          height="360"
          width="560"
      ></canvas>
    </div>
  );
};

export default BilibiliBar;
