import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {Slider} from '@miblanchard/react-native-slider';

export default class EmojiSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      mood: null,
      fadeValue: new Animated.Value(0),
      yValue: new Animated.Value(0),
    };
    let selectedImage = 8;
    let selectedMood = '';
  }

  moveAnimation = () => {
    Animated.timing(this.state.yValue, {
      toValue: 10,
      duration: 1000,
      //easing: Easing.back(),
    }).start(() => {
      Animated.timing(this.state.yValue, {
        toValue: 6,
        duration: 1000,
        //easing: Easing.linear,
      }).start(() => {
        this.moveAnimation();
      });
    });
  };

  selectedImage = (item) => {
    if (item.id === selectedImage) {
      return (
        <View style={{height: 350, marginTop: 30}}>
          {/* <Image
              style={{width: 25, height: 34, marginTop: 0, marginLeft: 25}}
              source={item.source}
            /> */}
          <Animated.Image
            source={item.source}
            style={[
              styles.imageView,
              {bottom: this.state.yValue},
            ]}></Animated.Image>
          {this.moveAnimation()}
          <View>
            <Image
              style={{width: 25, height: 5, marginTop: 10, marginLeft: 25}}
              source={require('example/assets/emo7.png')}
            />
          </View>
        </View>
      );
    } else {
      return (
        <Image
          style={{width: 25, height: 34, marginTop: 50, marginLeft: 20}}
          source={item.source}
        />
      );
    }
  };

  renderImageContent = () => {
    const {images} = this.props;

    return (
      <View style={styles.flatListContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={images}
          renderItem={({item}) => {
            return this.selectedImage(item);
          }}
          keyExtractor={(index) => {
            return index;
          }}
        />
      </View>
    );
  };

  onChange = (data) => {
    this.setState({value: data});
    let obj = [
      {
        value: this.state.value,
        mood: selectedMood,
      },
    ];
    this.props.onChange && this.props.onChange(obj);
  };

  render() {
    const {value} = this.state;
    let number = value;
    number = parseFloat(value);
    number = number.toFixed(0);
    if (value > 0.5 && value <= 1.4) {
      selectedImage = 0;
      selectedMood = 'cry';
    } else if (value > 2.3 && value < 3) {
      selectedImage = 1;
      selectedMood = 'unhappy';
    } else if (value >= 4 && value < 4.6) {
      selectedImage = 2;
      selectedMood = 'worried';
    } else if (value >= 5.6 && value < 6.2) {
      selectedImage = 3;
      selectedMood = 'happy';
    } else if (value >= 7.2 && value < 7.8) {
      selectedImage = 4;
      selectedMood = 'laughing';
    } else if (value >= 8.8) {
      selectedImage = 5;
      selectedMood = 'love';
    } else {
      selectedImage = 6;
    }
    return (
      <View style={styles.container}>
        <View style={styles.sliderContainer}>
          {/* <Animated.View
            style={[
              styles.animationView,
              {bottom: this.state.yValue},
            ]}></Animated.View> */}
          {this.renderImageContent()}
          <Slider
            minimumValue={1}
            maximumValue={10}
            animateTransition
            minimumTrackTintColor="#d14ba6"
            thumbStyle={styles.thumb}
            trackStyle={styles.track}
            value={this.state.value}
            onValueChange={(value) => this.onChange(value)}
          />
          <Text>Value: {number}</Text>
        </View>
      </View>
    );
  }
}
const COLORS = {
  BLACK: 'black',
  WHITE: 'white',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#b991bf',
  },
  flatListContainer: {
    height: 100,
    width: '100%',
  },
  sliderContainer: {},
  thumb: {
    backgroundColor: '#f8a1d6',
    borderColor: '#a4126e',
    borderRadius: 10,
    borderWidth: 5,
    height: 20,
    shadowColor: COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.35,
    shadowRadius: 2,
    width: 20,
  },
  track: {
    backgroundColor: '#cabcdb',
    borderRadius: 4,
    height: 10,
    shadowColor: COLORS.BLACK,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 1,
    width: '80%',
    left: 20,
  },
  animationView: {
    width: 100,
    height: 200,
    backgroundColor: 'skyblue',
  },
  imageView: {
    width: 25,
    height: 35,
    marginLeft: 25,
  },
});
