import * as React from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Style';

const Component = props => {
  const {modalVisible, hideModal, text, cameraHandler, galleryHandler} = props;
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => {
          hideModal;
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.exitModal} onPress={hideModal}>
              <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalText}>{text}</Text>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={cameraHandler}>
                <Icon name="camera" style={styles.iconSize} />
                <Text style={styles.textClose}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonOpen]}
                onPress={galleryHandler}>
                <Icon name="images" style={styles.iconSize} />
                <Text style={styles.textOpen}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Component;
