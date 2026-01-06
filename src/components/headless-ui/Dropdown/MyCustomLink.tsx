import React from 'react';

interface MyCustomLinkProps {
  href: string;
  onClick: () => void;
  children: React.ReactNode; // Add this line to accept children
}

const MyCustomLink: React.FC<MyCustomLinkProps> = ({ href, onClick, children }) => {
  return (
    <a className='ui-dropdown-item' href={href} onClick={onClick}>
      {children}
    </a>
  );
};

export default MyCustomLink;
