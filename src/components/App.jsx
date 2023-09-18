import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Layout } from './Layout';
import { getSearch } from './api';
import { Searchbar } from './Searchbar/Searchbar';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    value: '',
    page: 1,
    images: [],
    totalImg: null,
    isLoading: false,
    error: null,
  };

  handleSubmit = value => {
    this.setState({
      value,
      page: 1,
      images: [],
      error: null,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;
    if (prevState.value !== value || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const { totalHits, hits } = await getSearch(value, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalImg: totalHits,
        }));
      } catch (error) {
        this.setState({ error: toast.error('Oops! Something went wrong...') });
      } finally {
        console.log(Toaster);
        this.setState({ isLoading: false });
      }
    }
  }

  onMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { isLoading, totalImg, images } = this.state;

    return (
      <Layout>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        {images.length === 0 && toast.error('Sorry, nothing found')}

        {images.length !== 0 && <ImageGallery images={images} />}

        {images.length > 0 && images.length < totalImg && (
          <Button onClick={this.onMore} />
        )}
        <GlobalStyle />
        <Toaster position="top-right" />
      </Layout>
    );
  }
}
