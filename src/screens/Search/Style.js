import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  loading: {
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchSection: {
    marginHorizontal: 16,
    marginVertical: 15,
  },
  filter: {
    fontSize: 16,
    borderBottomWidth: 1,
  },
  searchIcon: {
    position: 'absolute',
    right: 20,
    top: 10,
    fontSize: 25,
    color: '#fff',
  },
  input: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 50,
    backgroundColor: 'rgba(96, 98, 102, 0.5)',
    color: '#fff',
    borderRadius: 10,
  },
  cardWrapper: {
    marginHorizontal: 25,
    marginVertical: 15,
  },
  card: {
    width: 120,
    height: 105,
    borderRadius: 20,
  },
  itemMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    width: 50,
    height: 23,
    left: 80,
    top: -9,
    position: 'absolute',
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgb(245, 164, 42)',
    borderRadius: 40,
  },
  titleText: {
    fontFamily: 'Nunito-Reguler',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#393939',
  },
  subtitleText: {
    fontFamily: 'Nunito-Reguler',
    fontSize: 14,
    color: '#4E4E4E',
  },
  greenText: {
    fontFamily: 'Nunito-Reguler',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
  },
  priceText: {
    fontFamily: 'Nunito-Reguler',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#393939',
    marginVertical: 10,
  },
});
