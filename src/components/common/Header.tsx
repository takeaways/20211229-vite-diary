import { ReactNode } from "react";

interface props {
  headText?: string;
  leftChild?: ReactNode;
  rightChild?: ReactNode;
}

const Header = ({ headText, leftChild, rightChild }: props) => {
  return (
    <header>
      <div className="head_btn_left">{leftChild}</div>
      <div className="head_text">{headText}</div>
      <div className="head_btn_right">{rightChild}</div>
    </header>
  );
};

export default Header;
