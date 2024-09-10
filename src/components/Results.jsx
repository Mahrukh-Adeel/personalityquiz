import React, { useContext } from "react";
import { UserContext } from './UserContext';

export default function Results({ element, artwork, onReset }) {
  const { name } = useContext(UserContext);

  return (
    <div>
      <p>
        <strong>{name}</strong>, your element is: {element}
      </p>

      {artwork ? (
        <div className="artwork">
          <h2>{artwork.title}</h2>
          <img
            className="mx-auto w-1/2"
            src={artwork.image_url || 'https://images.pexels.com/photos/4439425/pexels-photo-4439425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
            alt={artwork.title}
            onError={(e) => e.target.src = 'https://via.placeholder.com/150'} 
            style={{ maxWidth: '50%', height: '300px' }} 
          />
          <p>{artwork.artist_display || "Unknown Artist"}</p>
          <p>{artwork.date_display || "Date Unknown"}</p>
        </div>
      ) : (
        <p>No artwork found.</p>
      )}

      <button onClick={onReset} className="bg-white p-2 border-black border-[1px]" >Retake Quiz</button>
    </div>
  );
}
