import React from 'react';

interface ZonebtnProps {
  children: React.ReactNode;
  props?: any;
}

const Zonebtn: React.FC<ZonebtnProps> = ({ children, ...props }) => {
  return (
    <div className='btn btn-light rounded-pill bg-white mx-2 my-4' {...props}>
      {children}
    </div>
  );
};
export default Zonebtn;
