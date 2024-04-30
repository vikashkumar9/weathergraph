import React from 'react';
import Zonebtn from './Zonebtn';

interface ZonesProps {
  zone: string;
  onZoneChange: (newZone: string) => void;
}

const Zones: React.FC<ZonesProps> = ({ onZoneChange }) => {
  return (
    <div>
      <Zonebtn onClick={() => onZoneChange('1')}>Zone 1</Zonebtn>
      <Zonebtn onClick={() => onZoneChange('2')}>Zone 2</Zonebtn>
      <Zonebtn onClick={() => onZoneChange('3')}>Zone 3</Zonebtn>
      <Zonebtn onClick={() => onZoneChange('4')}>Zone 4</Zonebtn>
      <Zonebtn onClick={() => onZoneChange('5')}>Zone 5</Zonebtn>
    </div>
  );
};

export default Zones;
