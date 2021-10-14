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
    padding: 35,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 15,
    padding: 10,
    width: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonOpen: {
    backgroundColor: '#FFCD61',
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: '#393939',
    marginHorizontal: 10,
  },
  textClose: {
    color: '#FFCD61',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textOpen: {
    color: '#393939',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
});
