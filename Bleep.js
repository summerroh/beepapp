import React, {Component} from 'react';

// import * as React from 'react';

import { StyleSheet, Text, View, StatusBar, Image, ImageBackground, TouchableWithoutFeedback , Alert, Button } from 'react-native';
// import Sound from 'react-native-sound';
import { Audio } from 'expo-av';
import button from './assets/button.png';
import buttonPressed from './assets/button_pressed.png';






export default class Bleep extends Component {

    constructor() {
      super();
      this.state = { 
        pressing: true
      };
    }

    static navigationOptions = {
      header: null,
    };

    renderImage()  {
      var imgSource = this.state.pressing? button : buttonPressed;
      return (
        <Image source={ imgSource }/> );
    }

//playing sound starts
    async componentDidMount() {
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      });

      this.sound = new Audio.Sound()

      const status = {
        shouldPlay: false
      };

      this.sound.loadAsync(require('./assets/bleepshort.mp3'), status, false);
    }
   
    playSound() {
      // if(this.state.pressing) {alert("Bleeeeeep!!")};

      this.sound.playAsync();
      alert("Bleeeeeep!!")
    };
//playing sounds finish



    render() {
      return (
          <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#00000000" translucent={true}/>
            <ImageBackground source={require('./assets/metal_background.jpg')} style={styles.backgroundimage}>
              <View style={styles.contents}>
                  {/* <Text style={styles.text}>Hold to Bleep</Text> */}
                  <TouchableWithoutFeedback  
                    onPressIn={ () => this.setState({ pressing: !this.state.pressing }) } 
                    onPressOut={ () => this.setState({ pressing: !this.state.pressing }) } >    
                    {this.renderImage()}
                  </TouchableWithoutFeedback >

                  <Button
                  title='Play Sound'
                  color='#3CBBB1'
                  onPress={this.playSound.bind(this)} />

              </View>
            </ImageBackground>  
          </View>
      );
      }
      }

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "column"
    //   paddingHorizontal: 30,
    //   paddingVertical: 100,
    //   backgroundColor: "pink"
  },
  backgroundimage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  contents:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  image: {
  },
  text: {
    color: "white",
    fontSize: 30,
    marginBottom: 10
}
});