import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Pressable,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconHeader from '../../components/IconHeader/Component';
import styles from './Style';
const Component = props => {
  const passedData = props.route.params;
  const [location, setLocation] = React.useState(
    passedData.location ? passedData.location : null,
  );
  const [minPrice, setMinPrice] = React.useState(
    passedData.minPrice ? passedData.minPrice : null,
  );
  const [maxPrice, setMaxPrice] = React.useState(
    passedData.maxPrice ? passedData.maxPrice : null,
  );
  const [type, setType] = React.useState(
    passedData.type ? passedData.type : null,
  );
  const [sort, setSort] = React.useState(
    passedData.sort ? passedData.sort : null,
  );
  const [showLocation, setShowLocation] = React.useState(false);
  const [showPrice, setShowPrice] = React.useState(false);
  const [showType, setShowType] = React.useState(false);
  const [showSort, setShowSort] = React.useState(false);

  const searchHandler = () => {
    props.navigation.navigate('search', {
      location,
      minPrice,
      maxPrice,
      type,
      keyword: passedData.keyword,
      sort,
    });
  };

  return (
    <>
      <View style={styles.menuItem}>
        <IconHeader
          text="Filter"
          route={() => props.navigation.goBack('search')}
        />
        <TouchableOpacity
          style={styles.touchContainer}
          onPress={() => setShowLocation(true)}>
          <Text style={styles.textMenu}>Your Location</Text>
          <Text style={styles.value}>{location ? location : 'Select'}</Text>
          <Icon name="chevron-forward-outline" style={styles.iconMenu} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchContainer}
          onPress={() => setShowPrice(true)}>
          <Text style={styles.textMenu}>Price</Text>
          <Text style={styles.value}>
            {minPrice === null && 'Select'}
            {minPrice === 0 && `≤ ${maxPrice}`}
            {maxPrice === 0 && `≥ ${minPrice}`}
            {minPrice && maxPrice && `${minPrice} - ${maxPrice}`}
          </Text>
          <Icon name="chevron-forward-outline" style={styles.iconMenu} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchContainer}
          onPress={() => setShowType(true)}>
          <Text style={styles.textMenu}>Type</Text>
          <Text style={styles.value}>
            {type === 1 && 'Car'}
            {type === 2 && 'Motorbike'}
            {type === 3 && 'Bike'}
            {!type && 'Select'}
          </Text>
          <Icon name="chevron-forward-outline" style={styles.iconMenu} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchContainer}
          onPress={() => setShowSort(true)}>
          <Text style={styles.textMenu}>Sort By</Text>
          <Text style={styles.value}>
            {sort === 1 && 'Lowest Price'}
            {sort === 2 && 'Highest Price'}
            {sort === 3 && 'A to Z'}
            {sort === 4 && 'Z to A'}
            {!sort && 'Select'}
          </Text>
          <Icon name="chevron-forward-outline" style={styles.iconMenu} />
        </TouchableOpacity>
        {showLocation === true && (
          <>
            <View style={styles.modalView} />
            <Pressable
              style={styles.modalHide}
              onPress={() => setShowLocation(false)}>
              <View style={styles.modalBody}>
                <TouchableHighlight
                  underlayColor={'#EEEEEE'}
                  activeOpacity={0.5}
                  style={[styles.selectedView, styles.borderSelectedTop]}
                  onPress={() => [
                    setLocation('Yogyakarta'),
                    setShowLocation(false),
                  ]}>
                  <Text style={styles.textSelected}>Yogyakarta</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={'#EEEEEE'}
                  activeOpacity={0.5}
                  style={styles.selectedView}
                  onPress={() => [
                    setLocation('Jakarta'),
                    setShowLocation(false),
                  ]}>
                  <Text style={styles.textSelected}>Jakarta</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  activeOpacity={0.5}
                  underlayColor={'#EEEEEE'}
                  style={styles.selectedView}
                  onPress={() => [
                    setLocation('Kalimantan'),
                    setShowLocation(false),
                  ]}>
                  <Text style={styles.textSelected}>Kalimantan</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={'#EEEEEE'}
                  activeOpacity={0.5}
                  style={[styles.selectedView, styles.borderSelectedBottom]}
                  onPress={() => [
                    setLocation('Malang'),
                    setShowLocation(false),
                  ]}>
                  <Text style={styles.textSelected}>Malang</Text>
                </TouchableHighlight>
              </View>
            </Pressable>
          </>
        )}
        {showPrice === true && (
          <>
            <View style={styles.modalView} />
            <Pressable
              style={styles.modalHide}
              onPress={() => setShowPrice(false)}>
              <View style={styles.modalBody}>
                <TouchableHighlight
                  underlayColor={'#EEEEEE'}
                  activeOpacity={0.5}
                  style={[styles.selectedView, styles.borderSelectedTop]}
                  onPress={() => [
                    setMinPrice(0),
                    setMaxPrice(50 * 1000),
                    setShowPrice(false),
                  ]}>
                  <Text style={styles.textSelected}> ≤ 50.000</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={'#EEEEEE'}
                  activeOpacity={0.5}
                  style={styles.selectedView}
                  onPress={() => [
                    setMinPrice(50 * 1000),
                    setMaxPrice(100 * 1000),
                    setShowPrice(false),
                  ]}>
                  <Text style={styles.textSelected}>50.000 - 100.000</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  activeOpacity={0.5}
                  underlayColor={'#EEEEEE'}
                  style={styles.selectedView}
                  onPress={() => [
                    setMinPrice(100 * 1000),
                    setMaxPrice(250 * 1000),
                    setShowPrice(false),
                  ]}>
                  <Text style={styles.textSelected}> 100.000 - 250.000</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={'#EEEEEE'}
                  activeOpacity={0.5}
                  style={[styles.selectedView, styles.borderSelectedBottom]}
                  onPress={() => [
                    setMinPrice(250 * 1000),
                    setMaxPrice(500 * 1000),
                    setShowPrice(false),
                  ]}>
                  <Text style={styles.textSelected}>250.000 - 500.000</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={'#EEEEEE'}
                  activeOpacity={0.5}
                  style={[styles.selectedView, styles.borderSelectedBottom]}
                  onPress={() => [
                    setMinPrice(500 * 1000),
                    setMaxPrice(1000 * 1000),
                    setShowPrice(false),
                  ]}>
                  <Text style={styles.textSelected}>500.000 - 1.000.000</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={'#EEEEEE'}
                  activeOpacity={0.5}
                  style={[styles.selectedView, styles.borderSelectedBottom]}
                  onPress={() => [
                    setMinPrice(1000 * 1000),
                    setMaxPrice(0),
                    setShowPrice(false),
                  ]}>
                  <Text style={styles.textSelected}> ≥ Rp. 1.000.000</Text>
                </TouchableHighlight>
              </View>
            </Pressable>
          </>
        )}
        {showType === true && (
          <>
            <View style={styles.modalView} />
            <Pressable
              style={styles.modalHide}
              onPress={() => setShowType(false)}>
              <View style={styles.modalBody}>
                <TouchableHighlight
                  underlayColor={'#EEEEEE'}
                  activeOpacity={0.5}
                  style={[styles.selectedView, styles.borderSelectedTop]}
                  onPress={() => [setType(1), setShowType(false)]}>
                  <Text style={styles.textSelected}>Car</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={'#EEEEEE'}
                  activeOpacity={0.5}
                  style={styles.selectedView}
                  onPress={() => [setType(2), setShowType(false)]}>
                  <Text style={styles.textSelected}>Motorbike</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  activeOpacity={0.5}
                  underlayColor={'#EEEEEE'}
                  style={styles.selectedView}
                  onPress={() => [setType(3), setShowType(false)]}>
                  <Text style={styles.textSelected}>Bike</Text>
                </TouchableHighlight>
              </View>
            </Pressable>
          </>
        )}
        {showSort === true && (
          <>
            <View style={styles.modalView} />
            <Pressable
              style={styles.modalHide}
              onPress={() => setShowSort(false)}>
              <View style={styles.modalBody}>
                <TouchableHighlight
                  underlayColor={'#EEEEEE'}
                  activeOpacity={0.5}
                  style={[styles.selectedView, styles.borderSelectedTop]}
                  onPress={() => [setSort(1), setShowSort(false)]}>
                  <Text style={styles.textSelected}>Lowest Price</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={'#EEEEEE'}
                  activeOpacity={0.5}
                  style={styles.selectedView}
                  onPress={() => [setSort(2), setShowSort(false)]}>
                  <Text style={styles.textSelected}>Highest Price</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  activeOpacity={0.5}
                  underlayColor={'#EEEEEE'}
                  style={styles.selectedView}
                  onPress={() => [setSort(3), setShowSort(false)]}>
                  <Text style={styles.textSelected}>A to Z</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  activeOpacity={0.5}
                  underlayColor={'#EEEEEE'}
                  style={styles.selectedView}
                  onPress={() => [setSort(4), setShowSort(false)]}>
                  <Text style={styles.textSelected}>Z to A</Text>
                </TouchableHighlight>
              </View>
            </Pressable>
          </>
        )}
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
