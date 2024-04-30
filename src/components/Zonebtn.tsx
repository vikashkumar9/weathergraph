import React from 'react';

interface ZonebtnProps {
  children: React.ReactNode;
  props?: any;
  onClick?: () => void;
}

const Zonebtn: React.FC<ZonebtnProps> = ({ children, onClick, ...props }) => {
  return (
    <div
      className='btn btn-light rounded-pill bg-white mx-2 my-4'
      {...props}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
export default Zonebtn;
