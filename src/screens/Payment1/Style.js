import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  loading: {
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#fff',
  },
  scrollContainer: {
    backgroundColor: '#fff',
  },
  progressView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  progress: {
    width: 50,
    height: 5,
    // marginHorizontal: 25,
  },
  textProgress: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: '#FFf',
    padding: 6,
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    backgroundColor: '#A52A2A',
  },
  opacity: {
    opacity: 0.5,
  },
  input: {
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(217, 217, 217, 0.3)',
    paddingHorizontal: 15,
    marginHorizontal: 25,
    color: '#999999',
    fontWeight: '600',
    width: 338,
    height: 52,
    marginBottom: 20,
  },
  select: {
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(217, 217, 217, 0.3)',
    color: '#000',
    marginHorizontal: 25,
    fontWeight: '600',
    width: 338,
    height: 52,
    marginBottom: 20,
  },
  textSelect: {
    color: '#000',
  },
  placeHolderSelected: {
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
});
