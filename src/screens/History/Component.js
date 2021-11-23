import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import styles from './Style';
import {API_URL} from '@env';
import {
  actionHistoryOwner,
  historyUserAction,
} from '../../redux/ActionCreators/history';
import {connect} from 'react-redux';

class History extends React.Component {
  // navigattionHandler = () => {
  //   if(this.props.auth.userInfo.statusLevel)
  // };
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const params = this.props.auth.userInfo.Id;
      const token = this.props.auth.token;
      if (!token) {
        this.props.navigation.replace('login');
      } else {
        if (this.props.auth.userInfo.statusLevel === 3) {
          this.props.historyUser(params, token);
        }
        if (this.props.auth.userInfo.statusLevel === 2) {
          this.props.historyOwner(params, token);
        }
      }
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    // console.log(this.historyDetail());
    return (
      <>
        {this.props.history.historyUser.length ? (
          <View style={styles.container}>
            <Text style={styles.titleHeader}>History Order</Text>

            <View style={styles.itemView}>
              <View style={styles.selectView}>
                <Text style={styles.textDate}>A week ago</Text>
                <Text>Select</Text>
              </View>
              <FlatList
                data={this.props.history.historyUser}
                renderItem={({item: history}) => {
                  return (
                    <View style={styles.dataContainer}>
                      <TouchableOpacity
                        style={styles.cardContainer}
                        onPress={() => {
                          history.status_number === 1 ||
                          (this.props.auth.userInfo.statusLevel === 2 &&
                            history.status_number === 2)
                            ? this.props.navigation.navigate('third-payment', {
                                historyId: history.id,
                                userId: history.user,
                                statusHistory: history.status_number,
                              })
                            : this.props.navigation.navigate('history-detail', {
                                historyId: history.id,
                                userId: history.user,
                              });
                        }}>
                        <Image
                          style={styles.card}
                          source={{
                            uri: `${API_URL}${history.picture.split(',')[0]}`,
                          }}
                        />
                      </TouchableOpacity>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>{history.name}</Text>
                        <Text>
                          {new Date(history.to_date).toLocaleDateString()} to{' '}
                          {new Date(history.from_date).toLocaleDateString()}
                        </Text>
                        <Text style={styles.text}>
                          Prepayment : Rp.
                          {Number(history.price).toLocaleString('de-DE')}
                        </Text>
                        <Text style={{color: 'green'}}>
                          {this.props.auth.userInfo.statusLevel === 3
                            ? history.userStatus
                            : history.ownerStatus}
                        </Text>
                      </View>
                    </View>
                  );
                }}
                keyExtractor={(_, index) => index}
              />
            </View>

            {/* <Text style={styles.textHandler}>YOU DON'T HAVE ORDER RECORD</Text> */}
          </View>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = ({auth, history}) => {
  return {
    auth,
    history,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    historyUser: (params, token) => {
      dispatch(historyUserAction(params, token));
    },
    historyOwner: (params, token) => {
      dispatch(actionHistoryOwner(params, token));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(History);
