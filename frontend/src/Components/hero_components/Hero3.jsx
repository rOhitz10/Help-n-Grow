import React from 'react';

const StickyMiddle = () => {
  return (
    <div className="h-screen w-full bg-gray-900 text-white">

      <div className="h-screen ">

        <div className="h-[200vh] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-700 to-gray-900">
            <div className="h-[40vh] flex justify-center items-center text-center">
            </div>

            <div className='bg-black h-[40%] w-[20%] opacity-30 relative bottom-60 left-10  hover:opacity-100 '>
             <img className='h-full w-full  opacity-30 hover:opacity-100 ' src="https://blogger.googleusercontent.com/img/a/AVvXsEjeEXbGghFnR6RiMRhKxNWbo34wIIlLX1Y-MyBz0oll1qXoJDETIbBRMMjvzVlpcRACqP-Wa8GRa1SyGGx0nfR_4lYhK4inYbzY95rlgQ2DyhV6tSeZQSqCpC6eATuDndYnM_b5wX0yvNdBEJCyqdsfwov3lcoNIuMsPfXQNHQQNcijJQOIB-9g8_jVs_s=rw" alt="" />
            </div>

            <div className='bg-black h-[35%] w-[20%] opacity-30 relative  left-[70%] bottom-5 hover:opacity-100 '>
             <img className='h-full w-full  opacity-30 hover:opacity-100 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXFqXzCNVznROvjih99Oi7zkIyTQFYnZ7kw&s" alt="" />
            </div>


          </div>

          <div className="sticky top-1/4 z-10 h-[40vh] flex justify-center items-center">
            <div className="bg-white text-black rounded-lg p-6 shadow-lg shadow-current hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500">
              <h2 className="text-4xl font-bold ">Help'n'Groww</h2>
           
            </div>
          </div>

          <div className='bg-black h-[20%] w-[40%] opacity-30 relative  left-[40%]  hover:opacity-100 '>
             <img className='h-full w-full  opacity-30 hover:opacity-100 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXFqXzCNVznROvjih99Oi7zkIyTQFYnZ7kw&s" alt="" />
            </div>
          <div className='bg-black h-[25%] w-[45%] opacity-30 relative top-60 left-10  hover:opacity-100 '>
             <img className='h-full w-full  opacity-30 hover:opacity-100 ' src="https://blogger.googleusercontent.com/img/a/AVvXsEjeEXbGghFnR6RiMRhKxNWbo34wIIlLX1Y-MyBz0oll1qXoJDETIbBRMMjvzVlpcRACqP-Wa8GRa1SyGGx0nfR_4lYhK4inYbzY95rlgQ2DyhV6tSeZQSqCpC6eATuDndYnM_b5wX0yvNdBEJCyqdsfwov3lcoNIuMsPfXQNHQQNcijJQOIB-9g8_jVs_s=rw" alt="" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default StickyMiddle;
