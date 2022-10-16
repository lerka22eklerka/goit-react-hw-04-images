import { useEffect, useState } from "react";
import { getData } from '../API/ApiQuery';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { Button } from './Button/Button';
import { AppStyled } from './App.styled';


export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [imgData, setImgData] = useState([]);
  const [largeImg, setLargeImg] = useState(null)


useEffect(() => {
  if (query === '') {
    return;
  }
  async function getImages() {
    try {
      setIsLoading(true);
      const {hits} = await getData(query, page);
      // const { hits } = dataHits;
      // const isRequiredHits = hits.map(
      //   ({ id, largeImageURL, webformatURL, tags }) => ({
      //     id,
      //     largeImageURL,
      //     webformatURL,
      //     alt: tags,
      //   })
      // );
      // const isRequiredHits = hits => {
      //   return hits.map(
      //     ({ id, webformatURL, largeImageURL, tags }) => {
      //       return { id, webformatURL, largeImageURL, alt: tags };
      //     });
      // };
    
      setImgData(prevImg => [...prevImg, ...hits]);
    } catch (error) {
     console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  getImages();
}, [query, page]);

const onChangeQuery = query => {
  setQuery(query);
  setPage(1);
  setImgData([]);
};

const handleLoadMore = () => {
  setPage(prevPage => prevPage + 1);
};

  const toggleLargeSize = largeImg => {
  setLargeImg(largeImg);
};

return (
  <AppStyled>
    <Searchbar onSubmit={onChangeQuery} />
    {imgData.length > 0 && (
      <ImageGallery data={imgData} toggleLargeSize={toggleLargeSize} />
    )}
    {isLoading && <Loader />}
    {imgData.length > 0 && !isLoading && (
      <Button type="button" onClick={handleLoadMore}/>
    )}
    {largeImg && (
      <Modal largeImg={largeImg.url} alt={query} onClose={toggleLargeSize}>
        <img alt={query} src={largeImg.url} />
      </Modal>
    )}
  </AppStyled>
);
}



