import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconHeader from '../../components/IconHeader/Component';
import {Picker} from '@react-native-picker/picker';
import styles from './Style';
const Component = props => {
  const [location, setLocation] = React.useState('');
  const [type, setType] = React.useState('');
  console.log(props.route.params);
  const searchHandler = () => {
    const filterQuery = `${props.route.params.sendQuery}&location=${location}&typeId=${type}`;
    props.navigation.navigate('search', {sendQuery: filterQuery});
    // if (this.props.auth.token === '') {
    //   null;
    // } else {
    //   notifikasi.configure();
    //   notifikasi.sendChannel('1');
    //   notifikasi.notificationSchedule(
    //     '1',
    //     'New Diskon',
    //     'Segera login untuk mendapatkan diskon nnya',
    //   );
    // }
  };
  return (
    <>
      <View style={styles.menuItem}>
        <IconHeader
          text="Filter"
          route={() => props.navigation.goBack('search')}
        />
        <TouchableOpacity style={styles.boxSelect}>
          <Picker
            selectedValue={location}
            onValueChange={(itemValue, index) => setLocation(itemValue)}>
            <Picker.Item
              style={styles.textInput}
              enabled={false}
              label="Your Location"
            />
            <Picker.Item style={styles.textInput} label="Bali" value="Bali" />
            <Picker.Item
              style={styles.textInput}
              label="Yogyakarta"
              value="Yogyakarta"
            />
            <Picker.Item
              style={styles.textInput}
              label="Jakarta"
              value="Jakarta"
            />
            <Picker.Item
              style={styles.textInput}
              label="Kalimantan"
              value="Kalimantan"
            />
            <Picker.Item
              style={styles.textInput}
              label="Malang"
              value="Malang"
            />
          </Picker>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boxSelect}>
          <Picker
            selectedValue={location}
            onValueChange={(itemValue, index) => setLocation(itemValue)}>
            <Picker.Item
              style={styles.textInput}
              enabled={false}
              label="Star Rating"
            />
            <Picker.Item style={styles.textInput} label="1" value={1} />
            <Picker.Item style={styles.textInput} label="2" value={2} />
            <Picker.Item style={styles.textInput} label="3" value={3} />
            <Picker.Item style={styles.textInput} label="4" value={4} />
            <Picker.Item style={styles.textInput} label="5" value={5} />
          </Picker>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxSelect}>
          <Picker
            selectedValue={location}
            onValueChange={(itemValue, index) => setLocation(itemValue)}>
            <Picker.Item
              style={styles.textInput}
              enabled={false}
              label="Price"
            />
            <Picker.Item style={styles.textInput} label="1" value={1} />
            <Picker.Item style={styles.textInput} label="2" value={2} />
            <Picker.Item style={styles.textInput} label="3" value={3} />
            <Picker.Item style={styles.textInput} label="4" value={4} />
            <Picker.Item style={styles.textInput} label="5" value={5} />
          </Picker>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boxSelect}>
          <Picker
            selectedValue={location}
            onValueChange={(itemValue, index) => setLocation(itemValue)}>
            <Picker.Item
              style={styles.textInput}
              enabled={false}
              label="Date"
            />
            <Picker.Item style={styles.textInput} label="1" value={1} />
            <Picker.Item style={styles.textInput} label="2" value={2} />
            <Picker.Item style={styles.textInput} label="3" value={3} />
            <Picker.Item style={styles.textInput} label="4" value={4} />
            <Picker.Item style={styles.textInput} label="5" value={5} />
          </Picker>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boxSelect}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue, index) => setType(itemValue)}>
            <Picker.Item
              style={styles.textInput}
              enabled={false}
              label="Type"
            />
            <Picker.Item style={styles.textInput} label="Cars" value={1} />
            <Picker.Item style={styles.textInput} label="Motorbike" value={2} />
            <Picker.Item style={styles.textInput} label="Bike" value={3} />
          </Picker>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchContainer}>
          <Text style={styles.textMenu}>No Prepayment</Text>
          <Icon name="chevron-forward-outline" style={styles.iconMenu} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchContainer}>
          <Text style={styles.textMenu}>Deals</Text>
          <Icon name="chevron-forward-outline" style={styles.iconMenu} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchContainer}>
          <Text style={styles.textMenu}>Only show available</Text>
          <Icon name="chevron-forward-outline" style={styles.iconMenu} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={searchHandler}>
          <Text style={styles.textButton}>Apply</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Component;
