import React from 'react'
import CategoryList from '../components/CategoryList'
import SliderProducts from '../components/SliderProducts'
import HorizontalCardProduct from '../components/HorizontalCard'
import VerticalCardProduct from '../components/VerticalCard'


const Home = () => {
  return (
    <div>
      <CategoryList/>
      <SliderProducts/>

      <HorizontalCardProduct category={"airpods"}   title={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"camera"}    title={"Lo más popular en Cámaras"}/>
      
      <VerticalCardProduct category={"Cellphone"} title={"Celulares en descuento"}/>
      <VerticalCardProduct   category={"mouse"}  title={"Mouse"}/>
    </div>
  )
}

export default Home