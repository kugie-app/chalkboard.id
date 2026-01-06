import React from "react";

interface MyLinkProps {
  children: React.ReactNode; // Add this line to accept children
}

const MyLink: React.FC<MyLinkProps> = ({ children }) => {
  return <a className="ui-dropdown-item" href="/samplepage">{children}</a>;
};

export default MyLink;
