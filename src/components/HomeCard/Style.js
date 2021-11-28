import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 15,
    alignItems: 'center',
  },
  titleCard: {
    fontFamily: 'Nunito-Bold',
    fontSize: 22,
    // fontWeight:'7900',
  },
  subtitleCard: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
  },
  scrollContainer: {
    marginBottom: 10,
  },
  cardContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  shadow: {
    width: 265,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#000',
    // opacity: 0.25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 7,
  },
  loading: {
    height: 50,
  },
});
