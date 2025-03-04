import React , { useEffect , useState , useCallback } from 'react';
import axios from 'axios';

const CatGallery = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [breed, setBreed] = useState('');
  const [limit, setLimit] = useState(5);

  const fetchCats = useCallback(async () =>{
    setLoading(true);
    try {
      const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_ids=${breed}`);
      setCats(prevCats => [...prevCats, ...response.data]);
    } catch (error) {
      console.error("Something false...", error);
    } finally {
      setLoading(false);
    }
  }, [limit, breed]);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  const handleLoadMore = () => {
    setLimit(prevLimit => prevLimit + 5);
  };

  const handleBreedChange = (event) => {
    setBreed(event.target.value);
    setCats([]);
    setLimit(5);
  };

  return (
    <div>
      <h1>Random Cat Images Gallery</h1>
      <select onChange={handleBreedChange} value={breed}>
        <option value="">All Breed</option>
        <option value="siam">Siamese</option>
        <option value="beng">Bengel</option>
        <option value="pers">Peesian</option>
      </select>
      <div className="gallery">
        {loading ? (
          <p>Loading...</p>
        ) : (
          cats.map(cat => (
            <div key={cat.id} className="cat-card">
              <img src={cat.url} alt="cat" />
            </div>
          ))
        )}
      </div>
      <button onClick={handleLoadMore} disabled={loading}>
        {loading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
};

export default CatGallery;