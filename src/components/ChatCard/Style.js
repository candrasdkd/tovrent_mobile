import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  chatWrapper: {
    height: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
  },
  titleChat: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },
  timeWrapper: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#9A9A9D',
    marginBottom: 6,
  },
  notificaton: {
    width: 20,
    height: 20,
    borderRadius: 20,
    textAlign: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#FFCD61',
  },
});
