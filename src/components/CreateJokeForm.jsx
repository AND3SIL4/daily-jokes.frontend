// src/components/CreateJokeForm.jsx
import { useState } from 'react';

export function CreateJokeForm({ baseUrl }) {
  const [jokeText, setJokeText] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulación de envío a una API
    setTimeout(async () => {
      console.log('Chiste enviado:', { content: jokeText });
      setIsSubmitting(false);
      setShowSuccess(true);
      setJokeText('');

      try {
        const response = await fetch(`${baseUrl}/joke`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: jokeText,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al enviar la calificación');
        }

        const data = await response.json();
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }

      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="joke"
            className="block text-gray-700 font-medium mb-2"
          >
            Tu chiste
          </label>
          <textarea
            id="joke"
            value={jokeText}
            onChange={(e) => setJokeText(e.target.value)}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Escribe aquí tu chiste..."
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSubmitting || !jokeText.trim()}
            className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 
              ${
                isSubmitting || !jokeText.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar chiste'}
          </button>

          {showSuccess && (
            <div className="text-green-600 ml-4 animate-pulse">
              ¡Chiste enviado con éxito!
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
