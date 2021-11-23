import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  loading: {
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    height: '35%',
    justifyContent: 'center',
  },
  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  titleProfile: {
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#393939',
    paddingTop: 5,
  },
  menuContainer: {
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
  textEditImage: {
    top: 65,
    left: 70,
    width: 35,
    borderRadius: 35,
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 35,
    color: '#393939',
    backgroundColor: '#FFCD61',
    textAlign: 'center',
    position: 'absolute',
  },
});
