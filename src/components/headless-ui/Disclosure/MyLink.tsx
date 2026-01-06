import React from "react";

interface MyCustomLinkProps {
  children: React.ReactNode; // Add this line to accept children
}

const MyCustomLink: React.FC<MyCustomLinkProps> = ({ children }) => {
  return <a href="/samplepage">{children}</a>;
};

export default MyCustomLink;
