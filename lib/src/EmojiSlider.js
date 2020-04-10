import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { Slider } from "@miblanchard/react-native-slider";

export default class EmojiSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0.45,
      mood: null,
      yValue: new Animated.Value(0),
      downValue: new Animated.Value(0),
    };
    let selectedImage = 8;
    let selectedMood = "";
  }

  moveAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.yValue, {
          toValue: -10,
          duration: 1000,
        }),
        Animated.timing(this.state.yValue, {
          toValue: 0,
          duration: 800,
        }),
      ])
    ).start();
  };

  downMoveAnimation = () => {
    Animated.timing(this.state.downValue, {
      toValue: 0,
      duration: 5000,
    });
  };

  selectedImage = (item) => {
    const animatedStyles = {
      transform: [
        {
          translateY: this.state.yValue,
        },
      ],
    };
    if (item.id === selectedImage) {
      return (
        <View style={{ height: 350, marginTop: 30 }}>
          <Animated.Image
            source={item.source}
            style={[styles.imageView, animatedStyles]}
          />
          {this.moveAnimation()}
          <View>
            <Image
              style={{ width: 25, height: 5, marginTop: 10 }}
              source={require("example/assets/emo7.png")}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View>
          {this.downMoveAnimation()}
          <Animated.Image
            style={[
              { width: 25, height: 35, marginTop: 50 },
              { bottom: this.state.downValue },
            ]}
            source={item.source}
          />
        </View>
      );
    }
  };

  renderImageContent = () => {
    const images = [
      { id: 0, source: require("example/assets/emo1.png") },
      { id: 1, source: require("example/assets/emo2.png") },
      { id: 2, source: require("example/assets/emo3.png") },
      { id: 3, source: require("example/assets/emo4.png") },
      { id: 4, source: require("example/assets/emo5.png") },
      { id: 5, source: require("example/assets/emo6.png") },
    ];

    return (
      <View style={styles.imageListContainer}>
        {images.map((item) => {
          return this.selectedImage(item);
        })}
      </View>
    );
  };

  onChange = (data) => {
    this.setState({ value: data });
    let obj = [
      {
        value: selectedImage,
        mood: selectedMood,
      },
    ];
    this.props.onChange && this.props.onChange(obj);
  };

  render() {
    const { images } = this.props;
    const { value } = this.state;
    let number = value;
    number = parseFloat(value);
    number = number.toFixed(0);

    if (value > 0.3 && value <= 1.25) {
      selectedImage = 0;
      selectedMood = "cry";
    } else if (value > 1.9 && value < 3.1) {
      selectedImage = 1;
      selectedMood = "unhappy";
    } else if (value >= 3.6 && value < 4.6) {
      selectedImage = 2;
      selectedMood = "worried";
    } else if (value >= 5.2 && value < 6.23) {
      selectedImage = 3;
      selectedMood = "happy";
    } else if (value >= 7 && value < 7.9) {
      selectedImage = 4;
      selectedMood = "laughing";
    } else if (value >= 8.7 && value < 9.5) {
      selectedImage = 5;
      selectedMood = "love";
    } else {
      selectedImage = null;
      selectedMood = "";
    }
    return (
      <View>
        <View style={styles.sliderContainer}>
          {this.renderImageContent()}
          <Slider
            minimumValue={0}
            maximumValue={10}
            animateTransition
            minimumTrackTintColor="#d14ba6"
            thumbStyle={styles.thumb}
            trackStyle={styles.track}
            value={this.state.value}
            onValueChange={(value) => this.onChange(value)}
          />
        </View>
      </View>
    );
  }
}
const COLORS = {
  BLACK: "black",
  WHITE: "white",
};
const styles = StyleSheet.create({
  imageListContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 100,
    width: "100%",
  },
  sliderContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },

  thumb: {
    backgroundColor: "#f8a1d6",
    borderColor: "#a4126e",
    borderRadius: 10,
    borderWidth: 5,
    height: 20,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    width: 20,
  },
  track: {
    backgroundColor: "#cabcdb",
    borderRadius: 4,
    height: 10,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1,
    width: "100%",
  },
  imageView: {
    width: 25,
    height: 35,
  },
});
