const ButtonType = ["DEFAULT", "POSITIVE", "NEGATIVE"] as const;
interface Props {
  type?: typeof ButtonType[number];
  text?: string;
  onClick?: () => void;
}

const Button = ({ type = "DEFAULT", text, onClick }: Props) => {
  const buttonType = ButtonType.includes(type) ? type : ButtonType[0];

  return (
    <button className={`btn btn-${buttonType} `} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
