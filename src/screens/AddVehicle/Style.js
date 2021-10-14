import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  imageProfile: {
    width: 400,
    height: 299,
    marginBottom: 5,
  },
  button: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#393939',
    marginBottom: 10,
    color: '#FFCD61',
  },
  textButton: {
    color: '#FFCD61',
    fontWeight: '600',
    fontSize: 15,
  },
  textInput: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: '600',
    marginHorizontal: 30,
  },
  input: {
    width: 250,
    height: 37,
    fontSize: 12,
    fontWeight: '600',
    alignSelf: 'center',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: '#C4C4C4',
    backgroundColor: '#fff',
    color: '#393939',
  },
  selectBox: {
    marginHorizontal: 30,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#C4C4C4',
  },
  textSelect: {
    color: '#393939',
  },

  multiLine: {
    width: 350,
    height: 40,
    fontSize: 12,
    fontWeight: '600',
    alignSelf: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: '#C4C4C4',
    backgroundColor: '#fff',
    color: '#393939',
  },
  countBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginVertical: 30,
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
  saveButton: {
    width: 314,
    height: 50,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#FFCD61',
  },
  saveText: {
    color: '#393939',
    fontWeight: '600',
    fontSize: 15,
  },
  cancelButton: {
    width: 314,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#393939',
    marginTop: 10,
    marginBottom: 20,
  },
  errorText: {
    position: 'absolute',
    top: 280,
    left: 30,
    height: 25,
    color: 'red',
    backgroundColor: 'rgba(24, 26, 24, 0.7)',
    fontSize: 16,
    fontWeight: '700',
    borderRadius: 10,
  },
});