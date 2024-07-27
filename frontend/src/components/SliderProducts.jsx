import React, { useEffect, useState } from 'react';
import image1 from '../assets/slider/imagen1_web.png';
import image2 from '../assets/slider/imagen1_web.png';
import image3 from '../assets/slider/imagen1_web.png';
import image4 from '../assets/slider/imagen1_web.png';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";


const SliderProducts = () => {

    const [currentImage, setCurrentImage] = useState(0)
    const desktopImages = [
       image1,
       image2,
       image3,
       image4         
    ]

    const nextImage = () =>{
        if(desktopImages.length - 1 > currentImage){
            setCurrentImage(preve => preve + 1)
        } 
    }  

    const preveImage = () =>{
        if(currentImage !== 0){
            setCurrentImage(preve => preve - 1)
        } 
    } 

    useEffect(()=>{
        const interval = setInterval(() => {
            if(desktopImages.length - 1 > currentImage) {
                nextImage()  
            }else{
                setCurrentImage(0) 
            }
        }, 5000);

        return ()=> clearInterval(interval)
    }, [currentImage])

    return (
    <div className='container mx-auto px-4 rounded'>
        <div className='h-56 md:h-72 w-full bg-slate-300 relative'>

            <div className='absolute z-10 h-full w-full md:flex items-center'>
                <div className='flex justify-between w-full text-3xl'>
                    <button onClick={preveImage} className='bg-gray-400 bg-opacity-50 shadow-md p-1'><FaAngleLeft /></button>
                    <button onClick={nextImage} className='bg-gray-400 bg-opacity-50 shadow-md  p-1'><FaAngleRight /></button> 
                </div>
            </div>    

          {/*version para escritorio y tablet*/}
          <div className='hidden md:flex w-full h-full overflow-hidden'>
            {
                desktopImages.map((image, index)=>{
                return (
                <div className='w-full h-full min-w-full min-h-full transition-all' key={image} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                    <img src={image} className='w-full h-full' />
                </div>
                )
                })
            }
          </div>

          {/*version para telefonos móviles*/}
          <div className='flex w-full h-full overflow-hidden md:hidden'>
            {
                desktopImages.map((image, index)=>{
                return (
                <div className='w-full h-full min-w-full min-h-full transition-all' key={image} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                    <img src={image} className='w-full h-full object-cover' />
                </div>
                )
                })
            }
          </div>
          
        </div>
    </div>
  )
}

export default SliderProducts