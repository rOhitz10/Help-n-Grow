import React from 'react'

function Marque() {


const brands = [
    { id: 1, name: 'Brand 1', logo: 'https://via.placeholder.com/100x50?text=Brand1' },
    { id: 2, name: 'Brand 2', logo: 'https://via.placeholder.com/100x50?text=Brand2' },
    { id: 3, name: 'Brand 3', logo: 'https://via.placeholder.com/100x50?text=Brand3' },
    { id: 4, name: 'Brand 4', logo: 'https://via.placeholder.com/100x50?text=Brand4' },
    { id: 5, name: 'Brand 5', logo: 'https://via.placeholder.com/100x50?text=Brand5' },
    { id: 6, name: 'Brand 6', logo: 'https://via.placeholder.com/100x50?text=Brand6' },
    // Add more brands if needed
  ];

  return (
    <div className="overflow-hidden bg-black">
      <div className="flex items-center animate-marquee whitespace-nowrap">
        <h1 className='font-extrabold shadow-xl shadow-white text-4xl text-[#ff9a60]'>Help 'n' Groww</h1>
        
      </div>
    </div>
  );
}

export default Marque;
