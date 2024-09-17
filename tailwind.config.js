/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
 './App.{js,jsx,ts,tsx}',
  './src/**/*.{js,jsx,ts,tsx}',
  './components/**/*.{js,jsx,ts,tsx}',
  './app/**/*.{js,jsx,ts,tsx}',
  './app/(tabs)/**/*.{js,jsx,ts,tsx}',
 
],
  theme: {
    extend: {

      colors : {
        light: {
          text: '#11181C',
          background: '#fff',
          tint: '#0a7ea4',
          icon: '#687076',
          tabBarActiveTintColor:'#FFA001',
          tabBarInactiveTintColor:'#CDCDE0',
        },
        dark: {
          text: '#ECEDEE',
          background: '#151718',
          tint: '#fff',
          icon: '#9BA1A6',
          tabIconDefault: '#CDCDE0',
          tabIconSelected: '#FFA001',
        },
    },
    }
  },
  plugins: [],
}

