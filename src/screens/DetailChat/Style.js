import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  header: {
    alignItems: 'center',
    elevation: 10,
    paddingBottom: 10,
  },
  headerContainer: {backgroundColor: 'white', paddingHorizontal: 18},
  title: {
    marginTop: 25,
    flexDirection: 'row',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 28,
    fontWeight: '600',
    marginLeft: 20,
  },
  chatContainer: {
    paddingHorizontal: 18,
  },
  messageContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#DFDEDE',
    marginHorizontal: 18,
    marginBottom: 18,
    alignItems: 'center',
  },
  camIcon: {marginRight: 10},
  sendIcon: {marginRight: 18},
  messageInput: {paddingLeft: 18, flex: 1, paddingVertical: 0},
});
