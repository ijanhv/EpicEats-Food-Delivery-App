import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'

const Categories = () => {
  const items = [
    {
      _id: 1,
      name: 'Breakfast',
      image: 'https://links.papareact.com/ikj',
      color: 'bg-[#f59e0b]',
    },
    {
      _id: 2,
      name: 'Lunch',
      image: 'https://links.papareact.com/3pn',
      color: 'bg-[#10b981]',
    },
    {
      _id: 3,
      name: 'Snacks',
      image: 'https://links.papareact.com/28w',
      color: 'bg-[#f472b6]',
    },
  
    {
      _id: 5,
      name: 'Drinks',
      image: 'https://links.papareact.com/2fm',
      color: 'bg-[#ec4899]',
    }
  ]
  return (
    <ScrollView
    horizontal
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
    >
       {items.map((category) => (
        <CategoryCard
          key={category._id}
          title={category.name}
          color={category.color}
          // imgUrl={urlFor(category.image).width(200).url()}
        />
      ))}
    </ScrollView>
  )
}

export default Categories