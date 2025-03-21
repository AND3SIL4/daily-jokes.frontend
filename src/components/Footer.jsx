// src/components/Footer.jsx
export function Footer() {
  return (
    <footer className="bg-indigo-900 text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">JokesApp para Yiss</h3>
            <p className="text-indigo-200">
              Dedicado a una persona muy pila y capaz de lo que se proponga y
              todas las personas que necesitan una sonrisa cada día. Con cariño,
              para ti que estás leyendo esto (Yiss).
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-indigo-800 text-center text-indigo-300 text-sm">
          <p>
            © {new Date().getFullYear()} JokesApp. Con 💜 para sacarte una
            sonrisa.
          </p>
        </div>
      </div>
    </footer>
  );
}
