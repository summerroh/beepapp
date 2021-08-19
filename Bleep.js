import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, Image, ImageBackground, TouchableWithoutFeedback , Alert, Button } from 'react-native';
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
        <Image source={ imgSource } style={styles.image}/> );
    }

//playing sound starts
//tutorial: https://www.youtube.com/watch?v=HCvp2fZh--A
    async componentDidMount() {
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: false,
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
    };

    stopSound() {
      this.sound.stopAsync();
    }
//playing sounds finish

    pressin=() => {
      this.setState({ pressing: !this.state.pressing })
      this.playSound()
    }

    pressout=() => {
      this.setState({ pressing: !this.state.pressing })
      this.stopSound()
    }

    
    render() {
      return (
          <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#00000000" translucent={true}/>
            <ImageBackground source={require('./assets/metal_background.jpg')} style={styles.backgroundimage}>
              <View style={styles.contents}>
                  {/* <Text style={styles.text}>Hold to Bleep</Text> */}
                  <TouchableWithoutFeedback
                    onPressIn={ () => this.pressin() } 
                    onPressOut={ () => this.pressout() } >    
                    {this.renderImage()}
                  </TouchableWithoutFeedback>
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
  image:
  {
    // Setting up image width.
    width: 204,
    // Setting up image height.
    height: 204
  },
  text: {
    color: "white",
    fontSize: 30,
    marginBottom: 10
}
});