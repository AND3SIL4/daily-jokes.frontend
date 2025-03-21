// src/components/JokeCard.jsx
import { useState } from 'react';

export function JokeCard({ joke, baseUrl }) {
  const [rating, setRating] = useState(joke.score);
  const [hasRated, setHasRated] = useState(false);

  const handleRate = async (newRating) => {
    setRating(newRating);
    setHasRated(true);

    try {
      const response = await fetch(`${baseUrl}/joke/${joke.id}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score: newRating,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar la calificación');
      }

      const data = await response.json();
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded">
            {joke.date}
          </span>
        </div>

        <p className="text-gray-800 text-lg mb-4">"{joke.content}"</p>

        <div className="mt-6">
          <p className="text-gray-700 font-medium mb-2">
            {hasRated
              ? '¡Gracias por calificar!'
              : '¿Qué te pareció este chiste?'}
          </p>

          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRate(star)}
                disabled={hasRated}
                className={`text-5xl ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-400 focus:outline-none transition-colors duration-200 ${
                  hasRated ? 'cursor-default' : 'cursor-pointer'
                }`}
                aria-label={`Calificar con ${star} estrellas`}
              >
                ★
              </button>
            ))}
            <span className="ml-2 text-gray-600 text-sm">
              {rating > 0 ? `${rating} de 5` : 'Sin calificar'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
