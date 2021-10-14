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
    width: 265,
    height: 200,
    borderRadius: 10,
  },
});
