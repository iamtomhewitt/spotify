import React from 'react';

const RoundedSquare = ({ children, darkColour, height = 640, lightColour, width = 640 }: Props) => (
  <div style={{
    background: `linear-gradient(225deg, ${lightColour}, ${darkColour})`,
    borderRadius: '50px',
    color: '#fff',
    display: 'flex',
    height: `${height}px`,
    padding: '4%',
    width: `${width}px`,
  }}>
    {children}
  </div>
);

type Props = {
  lightColour: string;
  darkColour: string;
  children: React.ReactNode;
  height?: number;
  width?: number;
}

export default RoundedSquare;