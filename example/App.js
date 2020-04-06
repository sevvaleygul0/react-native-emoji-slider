/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import EmojiSlider from 'example/lib/src/EmojiSlider.js';

const images = [
  {id: 0, source: require('example/assets/emo1.png')},
  {id: 1, source: require('example/assets/emo2.png')},
  {id: 2, source: require('example/assets/emo3.png')},
  {id: 3, source: require('example/assets/emo4.png')},
  {id: 4, source: require('example/assets/emo5.png')},
  {id: 5, source: require('example/assets/emo6.png')},
];

const emojiFeatures = {
  height: 34,
  width: 24,
  marginLeft: 25,
};
const sliderTrackFeatures = {
  backgroundColor: '#cabcdb',
  borderRadius: 1,
  height: 10,
  shadowColor: 'black',
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.15,
  shadowRadius: 1,
  width: '100%',
};
const shadowFeatures = {
  height: 5,
  width: 25,
  marginLeft: 25,
};

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <EmojiSlider
        images={images}
        emojiFeatures={emojiFeatures}
        sliderTrackFeatures={sliderTrackFeatures}
        shadowFeatures={shadowFeatures}
        onChange={res => {
          console.log('res:', res);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#b991bf',
  },
});

export default App;
