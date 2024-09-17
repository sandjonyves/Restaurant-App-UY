import { Image, StyleSheet, Platform, Text, View, TouchableOpacity } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
import { Link, router } from 'expo-router';
import './tailwind.css'
import QrCode from '@/components/QrCode';
import { Button,NativeBaseProvider } from 'native-base';

export default function HomeScreen() {
  return (
    <NativeBaseProvider>
   <View className='m-5'>
      <Text className='bg-red-400'>
      kjdkjk dahgdhsgdas da
     </Text>

     <Link href={'/Restaurant'}>
        login fdsf
     </Link>
    <TouchableOpacity
    onPress={()=> router.push('/Sign-in')}
    >
      <Text>
        Testm m,m.,mm,.m
      </Text>
      {/* <QrCode></QrCode> */}
    </TouchableOpacity>
    <Button><Text></Text></Button>
   </View>
   </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
