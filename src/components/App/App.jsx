import { useState, useEffect } from "react";
import { imageApi } from "../services/imageApi";
import { Toaster } from "react-hot-toast";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (query === "") {
      setHasMore(false);
      return;
    }

    async function getImages() {
      try {
        setLoading(true);
        setHasMore(false);
        setError(false);
        const newImages = await imageApi(query, page);

        if (newImages.length === 0) {
          setHasMore(false);
        } else {
          setHasMore(true);
          setImages((prevState) => [...prevState, ...newImages]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setHasMore(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (images.length > 0) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [images]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ImageGallery items={images} onImageClick={handleImageClick} />

      {error && <ErrorMessage />}
      {loading && <Loader />}
      {hasMore && <LoadMoreBtn onClick={handleLoadMore} />}

      <ImageModal
        isOpen={!!selectedImage}
        onClose={closeModal}
        imageSrc={selectedImage}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
