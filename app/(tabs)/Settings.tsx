import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { View, TextInput, Button, Text, FlatList } from 'react-native';


const Settings = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
      // Établir la connexion WebSocket
      const ws = new WebSocket('ws://192.168.43.84:8000/ws/student/1/'); // Remplacez par l'URL de votre WebSocket

      ws.onopen = () => {
        console.log('test')
          console.log('Connexion WebSocket établie');
      };

      ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.message) {
              setMessages((prevMessages:any) => [...prevMessages, data.message]);
              console.log(data.message)
            } else if (data.error) {
              console.error('Erreur:', data.error);
          }
      };

      ws.onclose = () => {
          console.log('Connexion WebSocket fermée');
      };

      setSocket(ws);

      // Nettoyage de l'effet
      return () => {
          ws.close();
      };
  }, []);

  const sendMessage = () => {
    console.log('skfdhjhfj')
      if (socket && message) {
        Alert.alert('dsjkdjksjdks')
          socket.send(JSON.stringify({ message }));
          // setMessage(''); // Réinitialiser le champ de message
      }
  };

  return (
      <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24 }}>Chat</Text>
          <FlatList
              data={messages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <Text>{item}</Text>}
              style={{ marginVertical: 10 }}
          />
          <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
              value={message}
              onChangeText={setMessage}
              placeholder="Entrez votre message"
          />
          <Button title="Envoyer ds" onPress={()=>sendMessage} />
      </View>
  );
};
export default Settings