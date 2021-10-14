import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  loading: {
    height: '100%',
    justifyContent: 'center',
  },
  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginBottom: 5,
    alignSelf: 'center',
  },
  icon: {
    fontSize: 50,
    backgroundColor: 'grey',
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
  },
  textView: {
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 100,
  },
  text: {
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    paddingHorizontal: 15,
    marginHorizontal: 25,
    color: '#393939',
    fontWeight: '900',
    width: 338,
    height: 52,
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
});