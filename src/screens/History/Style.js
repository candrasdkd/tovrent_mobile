import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  loading: {
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  itemView: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  selectView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textDate: {
    paddingLeft: 120,
  },
  titleHeader: {
    fontFamily: 'Nunito-Reguler',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 28,
  },
  textHandler: {
    textAlign: 'center',
  },
  dataContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    flexDirection: 'column',
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  text: {
    fontFamily: 'Nunito-Reguler',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#393939',
  },
  titleCard: {
    fontFamily: 'Nunito-Bold',
    fontSize: 22,
    // fontWeight:'7900',
  },
  scrollContainer: {
    marginBottom: 10,
  },
  cardContainer: {
    marginVertical: 10,
  },

  card: {
    width: 101,
    height: 88,
    borderRadius: 10,
  },
});
