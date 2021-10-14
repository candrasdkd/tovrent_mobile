import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    height: '100%',
  },
  imagesWrapper: {
    width: 338,
    height: 201,
    borderRadius: 10,
    marginBottom: 5,
  },
  imageView: {
    alignSelf: 'center',
    borderRadius: 10,
    shadowOffset: {width: 15, height: 10},
    shadowColor: '#000',
    shadowOpacity: 1,
    elevation: 15,
    backgroundColor: '#000',
  },
  textTitleCode: {
    fontSize: 17,
    fontWeight: '600',
    color: '#393939',
    textAlign: 'center',
  },
  textCode: {
    fontSize: 20,
    fontWeight: '600',
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  textView: {
    marginHorizontal: 30,
  },
  textOrder: {
    marginVertical: 15,
  },
  textVehicle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#393939',
    marginVertical: 4.5,
  },
  borderBottom: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#DFDEDE',
  },
  textUser: {
    fontSize: 16,
    fontWeight: '600',
    color: '#393939',
    marginVertical: 1.5,
  },
  textPrice: {
    fontSize: 30,
    fontWeight: '600',
    color: '#393939',
    marginTop: 20,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
