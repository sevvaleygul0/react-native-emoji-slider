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

const App: () => React$Node = () => {
  return (
    <EmojiSlider
      images={images}
      onChange={(res) => {
        console.log('res:', res);
      }}
    />
  );
};

export default App;
