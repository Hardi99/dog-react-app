import axios from "axios";
import { useEffect, useState } from "react";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [popupImage, setPopupImage] = useState(null); // Pour gérer l'image du popup
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Gérer l'état d'ouverture du popup

  // Fetch images au chargement du composant
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random/14');
        setImages(response.data.message);
      } catch (error) {
        console.error("Erreur lors de la récupération des images", error);
      }
    };
    fetchImages();
  }, []);

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

      {/* Galerie d'images */}
      <div className="gallery-container">
        <div className="gallery">
          {images.map((image, index) => (
            <div
              key={index}
              className="gallery-item"
              onClick={() => openPopup(image)}
            >
              <img src={image} alt={`Dog ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;