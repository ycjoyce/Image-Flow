export interface Tag {
  type: string;
  title: string;
}

export interface Photo {
  id: string;
  width: number;
  height: number;
  blur_hash: string;
  description?: string;
  alt_description?: string;
  urls: {
    regular: string;
    thumb: string;
  };
  tags_preview?: Tag[];
}
