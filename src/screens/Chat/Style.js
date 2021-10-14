import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  iconWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 60,
  },
  iconSearch: {
    position: 'absolute',
    left: 20,
    marginVertical: 15,
    fontSize: 25,
    color: '#000000',
  },
  input: {
    flex: 1,
    width: '100%',
    height: 60,
    position: 'relative',
    paddingLeft: 60,
    paddingRight: 40,
    backgroundColor: '#EFEEEE',
    color: '#000000',
    borderRadius: 20,
  },
});
