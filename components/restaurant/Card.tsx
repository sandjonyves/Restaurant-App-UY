import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import CustomButton from '../CustomButton';
import OrderForm from './OrderForm';
import { useSelector } from 'react-redux';
import { Dispatch } from 'redux';

interface Restaurant {
  id: number;
  name: string;
  ordered: boolean;
  validated: boolean;
}

interface Props {
  restaurants: Restaurant[];
  setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
  // disable_button: boolean;
  plateImage: any;
 
  dish_selector: any; // Vous pouvez définir un type plus précis si possible
}

const Card: React.FC<Props> = ({
  restaurants,
  setRestaurants,
  plateImage,
  // disable_button,
  dish_selector,
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenQrCode, setIsOpenQrCode] = useState<boolean>(false);

  const handleShow = () => {
    setIsOpenModal(false);
  };

  const commandDish = (id: number) => {
    setRestaurants(prevRestaurants =>
      prevRestaurants.map(restaurant =>
        restaurant.id === id ? { ...restaurant, ordered: true } : restaurant
      )
    );
  };

  useEffect(() => {
    console.log('Dish Selector:', dish_selector);
  }, [dish_selector]); // Ajouté dish_selector comme dépendance

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 8 }}>
      <View className="flex flex-col bg-gray-100 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mb-4">
        <Text className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          12h30-16h
        </Text>

        <Image
          source={plateImage}
          className="rounded-xl w-full h-48"
          resizeMode="cover"
        />

        <View className="flex justify-center p-4">
          <Text className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {dish_selector ? dish_selector.name : 'Aucun plat pour le moment, veuillez patienter...'}
          </Text>
          <View className="ml-5 mb-4">
            <Text>Fruit: {dish_selector ? dish_selector.fruit : ''}</Text>
            <Text>Obstacle: {dish_selector ? dish_selector.proteine : ''}</Text>
          </View>

          <CustomButton
            padding={1}
            label='Commander'
            width={'sm'}
            onPress={() => {
               // Exemple d'utilisation, remplacez par l'ID approprié
              setIsOpenModal(true);
            }}
            disable={restaurants[dish_selector.restaurant_id-1].ordered}
          />
        </View>
      </View>

      <NativeBaseProvider>
        <OrderForm commandDish={commandDish} dish_selector={dish_selector} isOpen={isOpenModal} handleShow={handleShow} />
      </NativeBaseProvider>
    </ScrollView>
  );
};

export default Card;