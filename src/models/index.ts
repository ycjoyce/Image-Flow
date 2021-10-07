export interface Photo {
  id: string;
  width: number;
  height: number;
  blur_hash: string;
  description: string;
  urls: {
    regular: string;
    thumb: string;
  };
}
