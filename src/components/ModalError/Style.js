import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  centeredView: {
    position: 'absolute',
  },
  modalBackground: {
    backgroundColor: 'rgba(28, 31, 29, 0.6)',
    height: '100%',
    justifyContent: 'center',
  },
  modalView: {
    marginHorizontal: 25,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingBottom: 30,
  },

  button: {
    position: 'absolute',
    right: 10,
    borderRadius: 10,
    padding: 3,
    width: 30,
    height: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: '#E3242B',
    marginHorizontal: 10,
  },
  textClose: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  modalText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 50,
    marginBottom: 70,
    textAlign: 'center',
    color: '#000',
  },
  iconError: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
    fontSize: 70,
    color: '#E3242B',
  },
});
