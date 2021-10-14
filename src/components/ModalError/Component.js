import * as React from 'react';
import {View, Pressable, Modal, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Style';

const Component = props => {
  const {error, modalVisible, hideModal} = props;
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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={hideModal}>
              <Text style={styles.textClose}>X</Text>
            </Pressable>
            <Text style={styles.modalText}>{error}</Text>
            <Icon name="remove-circle" style={styles.iconError} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Component;
