import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';

interface CustomOverlayProps {
  visible: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const CustomOverlay: React.FC<CustomOverlayProps> = ({ visible, position, size }) => {
  if (!visible) return null;

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={{ ...styles.scannerArea, left: position.x, top: position.y, width: size.width, height: size.height }} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerArea: {
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
  },
});

export default CustomOverlay;