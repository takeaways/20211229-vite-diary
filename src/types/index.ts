export type Content = {
  id: string;
  author: string;
  content: string;
  emotion: string;
  created_at: number;
};

export type Emotion = {
  emotion_id: number;
  emotion_img: string;
  emotion_description: string;
};
