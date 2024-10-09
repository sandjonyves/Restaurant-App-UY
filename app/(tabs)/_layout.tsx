
import { ColorValue,  ImageSourcePropType } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Restaurant from './Restaurant';
import Create from './create';
import Study from './Study';
import Setting from './Settings';
import { icons } from '../../constants';

import { useSelector, UseSelector } from 'react-redux';
import { decodeJWT } from '@/utils/decodeJWT';




import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { getPathDown } from "@/components/curve";
import { Svg, Path } from "react-native-svg";
import { height, scale } from "react-native-size-scaling";
import { getHeaderTitle } from "@react-navigation/elements";
import { createDrawerNavigator,DrawerContentScrollView,
  DrawerItem,
  DrawerItemList } from '@react-navigation/drawer';
import { DrawerActions,useNavigation } from '@react-navigation/native';
// ICON
import {
  MaterialCommunityIcons,MaterialIcons,FontAwesome,
  Ionicons,
  EvilIcons,
  Entypo,
  AntDesign
} from "@expo/vector-icons";

import Constants from "expo-constants";

import HomeScreen from '.';

import CustomButton from '@/components/CustomButton';


type TabIconProps = {
  icon?: ImageSourcePropType;
  color?: ColorValue;
  name?: string;
  focused?: boolean;
};

const Tab = createBottomTabNavigator();

const TabsItem = ({ icon, color, name }: TabIconProps) => {



  return (
    <View style={styles.TabsItem}>
      <Image source={icon} resizeMode="contain" tintColor={color} style={styles.TabsIcon} />
      <Text style={[styles.TabsTitle, { color }]}>
        {name}
      </Text>
    </View>
  );
};






const Drawer = createDrawerNavigator();


const CustomTitleTab = ({ children }: any) => {
  return (
    <View style={styles.tabTitle}>
      <Text style={styles.tabTitleText}>{children}</Text>
    </View>
  );
};

// Custom Drawer Navigator
const CustomDrawerContent = (props: any)=>{

  const {state, navigation} = props
  const seletor_auth = useSelector(state=>state.auth.user)
  const [dataDecodeUser,setDataDecodeUser] = useState({
    'role':''
  })

  const autoristion_selector = useSelector(state => state.autorisation.disable)

  


  const [ autorizierToOrder,setAutorizerToOrder] = useState<boolean>()
  
  useEffect(
    ()=>{
        setDataDecodeUser(decodeJWT(seletor_auth.access))
        console.log('dadsadsadsa',seletor_auth )
  },[])

  return (
   <View style={{flex:1,height:'100%'}}>
         <DrawerContentScrollView {...props}>
          {/* <DrawerItemList {...props} /> */}
          <View style={{width:'100%',height:'100%', flex:1}}>
            {/* header top */}
              <View style={{width:'100%',paddingVertical:30, paddingHorizontal:20, borderBottomColor:'#F5F4F4',borderBottomWidth:1}}>
                 <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
                      <View 
                      className='w-80 h-'
                      style={{width:80,height:80,borderRadius:40, backgroundColor:'gray',justifyContent:'center',alignItems:'center'}}
                      >
                        <Image source={require('@/assets/images/avatar/6.png')} style={{width:70,height:70, borderRadius:35}} />
                      {/* <MaterialIcons   name='account-box'/> */}
                      <View className='w-80 bg-red-300'></View>
                      </View>
                      <View style={{paddingTop:10}}>
                          <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>Sandjon Yves</Text>
                          <Text style={{fontSize:14,fontWeight:'400',color:'black'}}>Web Developer</Text>
                      </View>
                 </View>
              </View>

              {/* menu */}
              {/* <Text>sjdhs</Text> */}
              {/* <View style={{flex:1,height:'100%'}}>
                  {
                    props.state.routes.map((route:any, index:any)=>{
                        const {drawerIcon,drawerLabel} = props.descriptors[route.key].options;
                        const focused = index === props.state.index;
                        //console.warn(route.name)
                        return (
                          <TouchableOpacity
                            key={route.key}
                            style={{width:'100%',paddingVertical:10,paddingHorizontal:20, flexDirection:'row',alignContent:'center'
                              
                            }}
                            onPress={() => navigation.navigate(route.name)}
                          >
                            <View style={{width:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
                                {
                                  drawerIcon && drawerIcon({ focused, color: focused?'#fff':'green', size: 30 })
                                }
                                {
                                  drawerLabel && drawerLabel({ focused, color: 'black' })
                                }
                            </View>
                          </TouchableOpacity>
                        )
                    })
                  }
              </View> */}
               <View className='bg-gree-500 flex-1 w-full  flex-cols space-y-5 mb-0'>
               {/* <NativeBaseProvider> */}
                {/* <IconButton aria-label='dfsdf'><Text></Text></IconButton> */}
               
          {
            dataDecodeUser.role ==='ADMIN'? <CustomButton icon={true} iconName= {'qrcode-scan'} label={` Scanner`} variant='primary' padding={2} onPress={()=> navigation.navigate('Scanner')} />
                                          :<CustomButton icon={true} iconName= {'qrcode-scan'} label={` Scanner`} variant='primary' padding={2} onPress={()=> navigation.navigate('Scanner')} />
          }

        <CustomButton  label='Deconnexion' variant='secondary' padding={2} disable={false} />
        <CustomButton label='SUpprimer son compte' variant='danger' padding={2} />
        {/* </NativeBaseProvider> */}
        </View>
          </View>
        </DrawerContentScrollView>
       
       
        <View style={{padding:30, backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:14,color:'black'}}>CentCent App, Version 1.0.1</Text>
            
            
        </View>
   </View>
  );
}

const TabRootLayout = () => {
  const [maxWidth, setMaxWidth] = useState(Dimensions.get("window").width);
  const heightHeader = Constants.statusBarHeight + 50;
  const returnpathDown = getPathDown(maxWidth, 60, 50);
  const [changePage,setChangePage] = useState<boolean>(true)

  const translation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([ 
        Animated.timing(translation, {
          toValue: 60, 
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(translation, {
          toValue: 1, 
          duration: 1000, 
          useNativeDriver: false,
        }),
      ])
    );
    animation.start(); 


    return () => animation.stop();
  }, [translation]);

  return (
    <>
     <Tab.Navigator
        screenOptions={{
          headerShown: true, // kaka
             tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 84,
        },
          header: ({ navigation, route, options }) => {
         

            const title = getHeaderTitle(options, route.name);

            if (title === "Home" || "Restaurant") {
              return (
                <>
                  <View
                    style={{
                      width: "100%",//   TabsIcon: {
                        //     width: 30,
                        //     height: 30,
                        //   },
                        //   TabsTitle: {
                        //     fontSize: 10,
                        //   },
                        //   TabsItem: {
                        //     display: 'flex',
                        //     justifyContent: 'center',
                        //     alignItems: 'center',
                      height: heightHeader,
                      backgroundColor: "green",
                      paddingTop: Constants.statusBarHeight,
                    }}
                  >
                    {/* header */}
                    <View style={styles.headerTop}>
                      <View>
                        <View style={styles.headerContent}>
                          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <Ionicons name="filter" size={35} color="white" />
                          </TouchableOpacity>
                          <View
                            style={{
                              flexShrink: 1,
                              flex: 1,
                              // justifyContent: "center",
                              // alignItems: "center",
                            }}
                          >

                           {/* <CustomNavbar setChangePage={setChangePage}/> */}
                           <Text className='text-center text-white font-bold text-4xl'>
                            CentCent
                           </Text>

                          </View>
                          <TouchableOpacity>
                            <View>
                              <EvilIcons name="bell" size={40} color="white" />
                              <View
                                style={{
                                  width: 22,
                                  height: 22,
                                  borderRadius: 20,
                                  backgroundColor: "red",
                                  position: "absolute",
                                  top: -5,
                                  right: 0,
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    color: "white",
                                    textAlign: "center",
                                    fontSize: 10,
                                    fontWeight: "bold",
                                  }}
                                >
                                  99
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </>
              );
            }

            else {
              return null;
            }
          },
        }}
      >
        <Tab.Screen
          name="index"
          component={()=><HomeScreen/>}
          options={{
            title: "Home",
            // headerStyle:styles.headerStyle,
            tabBarIcon: ({ color, focused }) => {
              return (
                <MaterialCommunityIcons name="home" size={30} color={color} />
              );
            },
            tabBarLabel: () => <CustomTitleTab>Home</CustomTitleTab>,
          }}
        />

<Tab.Screen 
        name="Study" 
        component={Study} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabsItem icon={icons.studying} color={color} name="Study" focused={focused} />
          ),
        }} 
      />
      
      <Tab.Screen 
        name="Restaurant" 
        component={()=> <Restaurant />} 
        options={{
          // headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabsItem icon={icons.restaurant} color={color} name="Restaurant" focused={focused} />
          ),
        }} 
      />

      <Tab.Screen 
        name="Setting" 
        component={Setting} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabsItem icon={icons.setting} color={color} name="Setting" focused={focused} />
          ),
        }} 
      />
      </Tab.Navigator>
    </>
  );
};



const MyDrawerApp = ()=>{
  const router = useRouter();
  const navigation = useNavigation();
  return (
    <Drawer.Navigator 
    
    screenOptions={{ 
      headerShown: false,
     
      drawerActiveTintColor: "white",
      drawerInactiveTintColor: "white",
     drawerActiveBackgroundColor: "green",
     drawerInactiveBackgroundColor: "transparent",
     drawerStyle: { backgroundColor: "white" , width:300, height: "100%", padding:0, margin:0 },
    }}
      drawerContent={(props)=> <CustomDrawerContent {...props} /> }
    >
     
       <Drawer.Screen name="Home" component={TabRootLayout}
         options={{
           drawerIcon: ({focused,color,size})=>{
            return (
                <View style={{backgroundColor:focused?"green":"#fff", borderRadius:8, padding:2}}>
                    <MaterialCommunityIcons name="home-outline" size={size} color={color} />
                </View>
            )
           },
           drawerLabel:({focused,color})=>{
            return (
              <View style={{flex:1}}>
                <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{flex:1,color:focused?"green":color,fontSize:16,fontWeight:500,paddingLeft:10}}>Home</Text>
                    <Entypo name="chevron-right" size={16} color={color} />
                </View>
              </View>
            )
           }
         }}
       />




    </Drawer.Navigator>
  );
}



const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "green",
    height: 80, // Specify the height of your custom header
  },
  tabTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabTitleText: {
    fontSize: 14,
    color: "white",
    paddingVertical: 10,
    fontWeight: "bold",
  },
  headerTop: {
    width: "100%",
    paddingHorizontal: 20,
  },
  headerContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
    TabsIcon: {
    width: 30,
    height: 30,
  },
  TabsTitle: {
    fontSize: 10,
  },
  TabsItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}});

//export default TabRootLayout;
export default MyDrawerApp;
