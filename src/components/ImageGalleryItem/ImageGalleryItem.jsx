import { Item, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ url }) => {
  return (
    <Item>
      <Img src={url} />
    </Item>
  );
};
