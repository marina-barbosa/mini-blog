import React, { useState } from 'react';

export const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query); // Executa a função onSubmit passada como prop
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-2 items-baseline'>
      <div className="w-full relative">
        <input
          id="search"
          placeholder="Buscar por tags..."
          className="peer h-10 w-full border-b-2 border-gray-300 text-black bg-transparent placeholder-transparent focus:outline-none focus:border-black"
          type="text" name="search" required value={query}
          onChange={(e) => setQuery(e.target.value)}

        />
        <label
          htmlFor="search"
          className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm cursor-pointer"
        >Buscar por tag</label>
      </div>

      <button type="submit" className="btn-dark">Buscar</button>
    </form>
  );
};
