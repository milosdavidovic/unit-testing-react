import React from "react";

interface Props {
  text: string;
}

const Header: React.FC<Props> = ({ text }) => {
  return <h1>{text}</h1>;
};

export default Header;
