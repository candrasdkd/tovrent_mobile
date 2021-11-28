import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  menuItem: {
    backgroundColor: '#fff',
    height: '100%',
  },
  touchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 15,
  },
  iconMenu: {
    fontSize: 25,
    color: '#999999',
  },
  textMenu: {
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
    fontWeight: '900',
    marginVertical: 15,
    marginHorizontal: 15,
    color: '#393939',
  },
  button: {
    width: 338,
    height: 57,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 30,
    backgroundColor: '#FFCD61',
    borderRadius: 10,
    // justifyContent: 'center',
  },
  textButton: {
    color: '#393939',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 25,
    textAlign: 'center',
  },
  boxSelect: {
    borderColor: '#000',
  },
  textInput: {
    fontSize: 20,
    color: '#393939',
  },
  value: {
    position: 'absolute',
    right: '6%',
    fontSize: 15,
    color: '#999999',
  },
  modalView: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    opacity: 0.3,
  },
  modalHide: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '50%',
    paddingHorizontal: '10%',
  },
  modalBody: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
  },
  borderSelectedTop: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  borderSelectedBottom: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  selectedView: {
    borderBottomWidth: 1,
    borderColor: 'rgba(158, 150, 150, .5)',
  },
  textSelected: {
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 8,

    // lineHeight: 20,
  },
});
