import React, { useState, useEffect } from 'react';

function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        setLoading(true);
        fetch(`/api/search?q=${encodeURIComponent(query)}`)
          .then(res => res.json())
          .then(data => setResults(data.results || []))
          .catch(err => console.error(err))
          .finally(() => setLoading(false));
      } else {
        setResults([]);
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black opacity-80 flex items-center justify-center z-999" onClick={onClose}>
      <div className="bg-white p-6 rounded shadow w-full max-w-md" onClick={e => e.stopPropagation()}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded mb-4"
        />
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <ul className="space-y-2">
            {results.map((item, idx) => (
              <li key={idx} className="p-2 border rounded hover:bg-gray-100">{item.title}</li>
            ))}
            {results.length === 0 && query && !loading && (
              <li className="text-center text-gray-500">No results found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default GlobalSearchModal;
