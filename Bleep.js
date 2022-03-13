import React, {useState, useEffect} from 'react';
import { StyleSheet, View, StatusBar, Image, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Audio } from 'expo-av';
import button from './assets/button.png';
import buttonPressed from './assets/button_pressed.png';
import { AdMobBanner } from 'expo-ads-admob';

function Bleep() {
    const [pressing, setPressing] = useState(false);
    const [sound, setSound] = useState();
    
    const renderImage = () => {
      let imgSource = pressing? buttonPressed : button;
      return (
        <View>
          <Image source={ button } style={[styles.image, {position: 'absolute'}]}/>
          <Image source={ imgSource } style={styles.image}/>
        </View>
      );
    }

//sound logic starts
//tutorial: https://www.youtube.com/watch?v=HCvp2fZh--A
    useEffect(()=>{
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: false,
        playThroughEarpieceAndroid: false
      });
      loadSound();
    },[])

    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/bleepshort.mp3')
      );
      setSound(sound);
    }
    
    const playSound = async () => {
     await sound.playAsync(); 
    };

    const stopSound = async () => {
      await sound.stopAsync(); 
    }
  //sound logic finish

    const pressin = () => {
      setPressing(!pressing)
      playSound()
    }

    const pressout = () => {
      setPressing(!pressing)
      stopSound()
    }
    
    return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#00000000" translucent={true}/>
          <ImageBackground source={require('./assets/metal_background.jpg')} style={styles.backgroundimage}>
            <View style={styles.contents}>
        
                <TouchableWithoutFeedback
                  onPressIn={ () => pressin() } 
                  onPressOut={ () => pressout() } >    
                  {renderImage()}
                </TouchableWithoutFeedback>

            {/* // Display a banner ad */}
            <AdMobBanner
              style={{position: 'absolute',
                      bottom: 0,
                      alignSelf: 'center',
                    }}
              bannerSize="banner"
              adUnitID="ca-app-pub-7215370286680655/7769940540"
              servePersonalizedAds={false} // true or false
              />
              
            </View>

          </ImageBackground>  
        </View>
      );
      };
      
      export default Bleep;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "column"
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