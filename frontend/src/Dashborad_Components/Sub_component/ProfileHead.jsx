import React from 'react'

function ProfileHead() {
  return (
    <div className='min-h-60 bg-slate-100 relative rounded-3xl'>
     <div className='bg-orange-600 min-h-36 rounded-b-2xl'>
      <img className='h-36 w-full' src="https://img.freepik.com/free-photo/fantasy-water-representation_23-2151149381.jpg" alt="" />
      <div className='bg-black h-28 w-28 rounded-full absolute bottom-14 left-11'>
        {/* image */}
      </div>
     </div>
       <div className='mt-14  flex  justify-center'>
        <ul className='flex gap-6 font-thin'>
         <li className='border-b-2 hover:border-orange-300'>Profile</li>
         <li className='border-b-2 hover:border-orange-300'>Password</li>
         <li className='border-b-2 hover:border-orange-300'>Financial info</li>
         <li className='border-b-2 hover:border-orange-300'>Transaction Password</li>
         {/* <li className='border-b-2 hover:border-orange-300'>Activity Log</li> */}
        </ul>
       </div>
    </div>
  )
}

export default ProfileHead
