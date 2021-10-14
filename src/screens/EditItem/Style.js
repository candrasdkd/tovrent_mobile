import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  loading: {
    height: '100%',
    justifyContent: 'center',
  },
  body: {
    backgroundColor: '#fff',
    flex: 1,
  },
  iconLeft: {
    top: 20,
    left: 15,
    position: 'absolute',
  },
  iconRight: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 20,
    right: 20,
    position: 'absolute',
  },
  textIcon: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
    alignItems: 'center',
    width: '30%',
    backgroundColor: '#FFCD61',
    marginRight: 10,
    borderRadius: 10,
  },
  imagesWrapper: {
    width: '100%',
    height: 299,
    marginBottom: 20,
  },
  icon: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  upload: {
    marginHorizontal: 10,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBody: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  input: {
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    marginBottom: 15,
  },
  boxSelect: {
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    marginBottom: 15,
  },
  textInput: {
    fontSize: 15,
    color: '#000',
  },
  countBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  countWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCount: {
    fontSize: 17,
    fontWeight: '600',
  },
  buttonCount: {
    height: 21,
    width: 21,
    borderRadius: 21,
    backgroundColor: '#FFCD61',
    marginHorizontal: 10,
  },
  amount: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    marginHorizontal: 35,
  },
  textButtonCount: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    marginVertical: 20,
    height: 50,
    backgroundColor: '#FFCD61',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  reservationText: {
    fontSize: 20,
    fontWeight: '700',
  },
});
