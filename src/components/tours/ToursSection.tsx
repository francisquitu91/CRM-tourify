import React, { useState } from 'react';

interface Tour {
  url: string;
  title: string;
  label: string;
}

const initialTours: Tour[] = [
  {
    url: 'https://fundolosperales.tourify.cl',
    title: 'Fundo Los Perales',
    label: 'Terrenos industriales',
  },
  {
    url: 'https://storytelling.tourify.cl',
    title: 'Universidad Adolfo Ibañez',
    label: 'Tours Inmersivos',
  },
  {
    url: 'https://360.uai.cl',
    title: 'Universidad Adolfo Ibañez',
    label: 'Universidad',
  },
  {
    url: 'https://tours.tourify.cl/tours/mVUwaKj2PpDTu?sceneId=_9svlG32T',
    title: 'Auto360.cl muestra',
    label: 'Spin car 360',
  },
  {
    url: 'https://tours.tourify.cl/tours/cbdqKz69F',
    title: 'Colegio Sagrados Corazones',
    label: 'Colegios',
  },
  {
    url: 'https://tours.tourify.cl/tours/agTRENzGR',
    title: 'PUC',
    label: 'Universidad',
  },
];

export const ToursSection: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [newTour, setNewTour] = useState({ url: '', title: '', label: '' });

  const handleAddTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTour.url || !newTour.title || !newTour.label) return;
    setTours([...tours, newTour]);
    setNewTour({ url: '', title: '', label: '' });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Tours Virtuales</h2>
      <form onSubmit={handleAddTour} className="flex flex-wrap gap-2 mb-6">
        <input
          type="url"
          placeholder="URL del tour"
          value={newTour.url}
          onChange={e => setNewTour({ ...newTour, url: e.target.value })}
          className="border border-gray-300 rounded px-2 py-1 flex-1 min-w-[180px]"
          required
        />
        <input
          type="text"
          placeholder="Mini título"
          value={newTour.title}
          onChange={e => setNewTour({ ...newTour, title: e.target.value })}
          className="border border-gray-300 rounded px-2 py-1 flex-1 min-w-[120px]"
          required
        />
        <input
          type="text"
          placeholder="Etiqueta"
          value={newTour.label}
          onChange={e => setNewTour({ ...newTour, label: e.target.value })}
          className="border border-gray-300 rounded px-2 py-1 flex-1 min-w-[100px]"
          required
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700">Agregar</button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tours.map((tour, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow border border-gray-200 p-4 flex flex-col">
            <div className="flex items-center mb-2">
              <span className="text-lg font-semibold text-gray-900 mr-2">{tour.title}</span>
              <span className="text-xs bg-indigo-100 text-indigo-700 rounded px-2 py-0.5">{tour.label}</span>
            </div>
            <a href={tour.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 mb-2 truncate">{tour.url}</a>
            <div className="aspect-video w-full rounded overflow-hidden border">
              <iframe
                src={tour.url}
                title={tour.title}
                className="w-full h-full min-h-[200px]"
                allowFullScreen
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
