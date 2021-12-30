import { Emotion } from "types";

interface Props extends Emotion {
  onClick: (emotion: number) => void;
  isSelected: boolean;
}
const EmotionItem = ({
  emotion_description,
  emotion_id,
  emotion_img,
  onClick,
  isSelected,
}: Props) => {
  const onClickEmotion = () => {
    onClick(emotion_id);
  };
  return (
    <div
      className={`EmotionItem ${isSelected ? `EmotionItem_on_${emotion_id}` : "EmotionItem_off"}`}
      onClick={onClickEmotion}
    >
      <img src={emotion_img} alt={emotion_description} />
      <span>{emotion_description}</span>
    </div>
  );
};

export default EmotionItem;
