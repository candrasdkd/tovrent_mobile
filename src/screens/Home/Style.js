import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  loading: {
    height: '100%',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgHome: {
    width: '100%',
    height: 280,
  },
  backgroundHeader: {
    flex: 1,
    backgroundColor: 'rgba(28, 31, 29, 0.4)',
  },
  searchSection: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    fontSize: 25,
    color: '#fff',
  },
  button: {
    position: 'absolute',
    top: 60,
    width: 338,
    height: 57,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 30,
    backgroundColor: '#FFCD61',
    borderRadius: 10,
  },
  textButton: {
    color: '#393939',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 25,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    paddingLeft: 20,
    paddingRight: 50,
    textDecorationLine: 'none',
    backgroundColor: 'rgba(36, 25, 25, 0.5)',
    color: '#fff',
    borderRadius: 10,
  },
});
