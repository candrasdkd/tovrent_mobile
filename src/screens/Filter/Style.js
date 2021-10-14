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
});
