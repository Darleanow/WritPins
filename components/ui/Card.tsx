import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className, onClick }) => (
  <div className={`card ${className}`} onClick={onClick}>
    {children}
  </div>
);

export default Card;

