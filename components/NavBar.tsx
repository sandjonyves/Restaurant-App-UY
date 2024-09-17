import React, { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CustomNavbarProps {
  currentRoute?: string;
  labels?: string[];
  setShowRestaurant1?:Dispatch<SetStateAction<boolean>>;
  setChangePage?: Dispatch<SetStateAction<boolean>>;
}

const CustomNavbar: React.FC<CustomNavbarProps> = ({ setChangePage, currentRoute, labels = ['Restaurant1', 'about', 'Contact'] }) => {
  const navigation = useNavigation();
  
  const [ActiveNavItem,setActiveNavItem]  = useState<boolean>(true) 
  const [StyleNavItemActive,setNavItemActivte] = useState<string>('text-light-tabBarActiveTintColor text-sm  border-b-4 border-light-tabBarActiveTintColor ')
  const [StyleNavItemDefault,setStyleNavItemDefault,] = useState<string>('text-white text-sm ')
  return (
    <View style={styles.navbar} className='flex flex-row justify-around '>
        <TouchableOpacity
            onPress={() => {setChangePage?.(true);setActiveNavItem(true)}} 
            className=''
          >
            <Text  className={`${ActiveNavItem? StyleNavItemActive:StyleNavItemDefault}`}>restaurant I</Text>
          </TouchableOpacity>
          <TouchableOpacity
          
            onPress={() => {setChangePage?.(false);setActiveNavItem(false)}} // Passer la valeur appropriée ici
          >
            <Text className={`${ActiveNavItem? StyleNavItemDefault:StyleNavItemActive}`}>{"restaurant II"}</Text>
          </TouchableOpacity>
      {/* <FlatList
        data={labels}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        contentContainerStyle={styles.navbarContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.navItem,
              currentRoute === item ? styles.activeNavItem : null,
            ]}
            onPress={() => setChangePage?.(true)} // Passer la valeur appropriée ici
          >
            <Text >{item}</Text>
          </TouchableOpacity>
        )}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#2c3e50',
    paddingVertical: 12,
  },
  navbarContent: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },

  activeNavItem: {
    backgroundColor: '#34495e',
  },
  navText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    width: 16,
  },
});

export default CustomNavbar;
