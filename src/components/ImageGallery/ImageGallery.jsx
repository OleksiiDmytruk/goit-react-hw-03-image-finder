import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <List>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem key={id} url={webformatURL} />
      ))}
    </List>
  );
};
