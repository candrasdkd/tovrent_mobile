import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: 'rgba(28, 31, 29, 0.5)',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    marginTop: 10,
    marginLeft: 10,
  },
  iconText: {
    fontFamily: 'Nunito-Regular',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleForget: {
    fontFamily: 'Roboto-Black',
    lineHeight: 42,
    textAlign: 'center',
    color: '#fff',
    fontSize: 36,
    marginTop: 100,
    paddingHorizontal: 10,
    marginBottom: 150,
  },
  input: {
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: 10,
    marginHorizontal: 30,
    marginTop: 20,
    fontWeight: '900',
    height: 50,
    color: '#fff',
  },
  buttonSend: {
    height: 50,
    marginTop: 30,
    backgroundColor: '#FFCD61',
    borderRadius: 10,
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: '#393939',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 25,
  },
  buttonResend: {
    height: 50,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitleText: {
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});