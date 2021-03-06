import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  loading: {
    height: '100%',
    justifyContent: 'center',
  },
  body: {
    backgroundColor: '#fff',
  },
  iconLeft: {
    top: 20,
    left: 5,
    position: 'absolute',
  },
  iconRight: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 20,
    right: -40,
    position: 'absolute',
  },
  sizeIcon: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
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
  bgReservation: {
    width: 413,
    height: 299,
  },
  titleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  chatIcon: {
    fontSize: 30,
    color: '#FFCD61',
    fontWeight: 'bold',
    marginVertical: 15,
  },
  titleText: {
    // fontFamily: 'Roboto-Regular',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#393939',
    marginVertical: 15,
  },
  subtitleText: {
    // fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '600',
    color: '#4E4E4E',
    marginBottom: 5,
  },
  availableTxt: {
    color: '#087E0D',
    fontWeight: '700',
    marginBottom: 5,
    fontSize: 16,
  },
  notAvailableTxt: {
    color: '#9B0A0A',
    fontWeight: '700',
    marginBottom: 5,
    fontSize: 16,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  textLocation: {
    color: '#999999',
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  iconLocation: {
    width: 38,
    height: 38,
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 10,
    marginVertical: 5,
    color: '#F8A170',
    backgroundColor: 'rgba(255, 199, 167, 0.5)',
    borderRadius: 10,
  },
  countBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
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
  pickerWrapper: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  dateBox: {
    backgroundColor: 'rgba(57, 57, 57, 0.1)',
    color: 'rgba(57, 57, 57, 0.8)',
    justifyContent: 'center',
    width: 200,
    borderRadius: 10,
    paddingLeft: 16,
  },
  textDate: {
    fontSize: 15,
    color: 'rgba(57, 57, 57, 0.8)',
  },
  selectBox: {
    backgroundColor: 'rgba(57, 57, 57, 0.1)',
    width: 120,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  textSelect: {
    fontSize: 15,
    color: 'rgba(57, 57, 57, 0.8)',
  },
  buttonEnabled: {
    marginTop: 20,
    height: 50,
    backgroundColor: '#FFCD61',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  disabledReseveTxt: {
    fontSize: 20,
    fontWeight: '700',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: 'rgba(0, 0, 0, 0.3)',
  },
  buttonDisabled: {
    marginTop: 20,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
