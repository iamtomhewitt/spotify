import React from 'react';

const BadgeText = ({ children }: Props) => (
  <div style={{
    borderRadius: '0 0 50px 50px',
    bottom: '0',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'iamtomhewitt-font',
    fontSize: '3rem',
    height: '23%',
    lineHeight: '1',
    position: 'absolute',
    textAlign: 'left',
  }}>
    {children}
  </div>
);

type Props = {
  children: React.ReactNode,
}

export default BadgeText;