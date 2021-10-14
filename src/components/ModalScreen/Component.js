import * as React from 'react';
import {View, Pressable, Modal, Text} from 'react-native';
import styles from './Style';

const Component = props => {
  const {modalVisible, hideModal, text, submitHandler} = props;
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
            <Text style={styles.modalText}>{text}</Text>
            <View style={styles.buttonView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={hideModal}>
                <Text style={styles.textClose}>NO</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={submitHandler}>
                <Text style={styles.textOpen}>YES</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Component;
