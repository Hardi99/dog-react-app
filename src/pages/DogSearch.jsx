import { useState, useEffect } from "react";
import axios from "axios";

const DogSearch = () => {
  const [breeds, setBreeds] = useState({});  // Stocke la liste des races
  const [breed, setBreed] = useState('');    // Race sélectionnée par l'utilisateur
  const [images, setImages] = useState([]);  // Images à afficher
  const [error, setError] = useState('');    // Gestion des erreurs
  const [isLoading, setIsLoading] = useState(false);  // Indicateur de chargement
  const [searchTriggered, setSearchTriggered] = useState(false);  // Déclencheur de la recherche
  const [popupImage, setPopupImage] = useState(null); // Pour gérer l'image du popup
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Gérer l'état d'ouverture du popup

  // URL de l'API Dog CEO pour récupérer la liste des races
  const breedsUrl = "https://dog.ceo/api/breeds/list/all";

  // URL de l'API Dog CEO pour rechercher des images par race
  const getBreedImageUrl = (breed) => `https://dog.ceo/api/breed/${breed}/images`;

  // useEffect pour récupérer la liste des races au chargement du composant
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get(breedsUrl);
        setBreeds(response.data.message);  // Stocke la liste des races
      } catch (error) {
        setError("Erreur lors de la récupération de la liste des races.");
      }
    };

    fetchBreeds();
  }, []);  // Exécuté uniquement au chargement du composant

  // useEffect pour rechercher les images après validation de la race
  useEffect(() => {
    const fetchDogImages = async () => {
      if (!searchTriggered || breed === '') return;

      // Validation de l'entrée utilisateur
      if (!breeds[breed.toLowerCase()]) {
        setError("Race de chien non valide, veuillez entrer une race correcte.");
        setImages([]);
        return;
      }

      setError('');
      setIsLoading(true);

      try {
        const response = await axios.get(getBreedImageUrl(breed.toLowerCase()));
        setImages(response.data.message);  // Stocke les images reçues
      } catch (error) {
        setError("Erreur lors de la récupération des images. Veuillez réessayer.");
        setImages([]);
      }

      setIsLoading(false);
    };

    fetchDogImages();
  }, [searchTriggered, breed, breeds]);

  // Fonction pour déclencher la recherche
  const handleSearch = () => {
    setSearchTriggered(true);
  };

  // Ouvrir le popup avec l'image cliquée
  const openPopup = (image) => {
    setPopupImage(image); // Définit l'image du popup
    setIsPopupOpen(true); // Ouvre le popup
  };

  // Fermer le popup
  const closePopup = () => {
    setIsPopupOpen(false); // Ferme le popup
    setPopupImage(null);   // Réinitialise l'image du popup
  };

  return (
    <>
      {/* Popup d'affichage d'image */}
      {isPopupOpen && (
        <div id="popup-bg" className="active" onClick={closePopup}>
          <div id="popup-content" onClick={(e) => e.stopPropagation()}>
            <div id="popup-close" onClick={closePopup}>
              <ion-icon name="close-circle"></ion-icon>
            </div>
            <img id="popup-img" src={popupImage} alt="Popup Dog" />
          </div>
        </div>
      )}
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <div className="gallery-container">
            <div className="dog-search-container">
              <h2>Rechercher des images par race de chien</h2>
              <nav>
                <input
                  type="text"
                  placeholder="Entrez la race de chien (ex: beagle)"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className="breed-input"
                />
                <button onClick={handleSearch} className="search-button">Rechercher</button>          
              </nav>
              <h1 className="galleryH1" style={images.length > 0 ? {display:'none'} : {display:'block'}}>Aucune image à afficher</h1>
              {error && <p className="error-message">{error}</p>}
            </div>
              {images.length > 0 ? (
                <div className="gallery">
                    {images.map((img, index) => (
                      <div key={index} className="gallery-item" onClick={() => openPopup(img)}>
                        <img src={img} alt={`Dog breed ${breed}`} />
                      </div>
                    ))}
                </div> 
              ) : null}         
          </div>
        )}
    </>
  );
};

export default DogSearch;