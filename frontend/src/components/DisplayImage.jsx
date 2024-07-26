import React from 'react'
import { IoMdCloseCircle } from 'react-icons/io'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center'>

        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>
            <button className='block ml-auto text-2xl cursor-pointer' onClick={onClose}>
                <IoMdCloseCircle size={24} />
            </button>
            <div className='flex justify-center p-4 max-w-[80vw] max-h-[80vh]'>
                <img src={imgUrl} alt="{imgUrl}" className='w-full h-full'/>
            </div>
        </div>
     
    </div>
  )
}

export default DisplayImage