import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, Image, ImageBackground, TouchableWithoutFeedback , Alert } from 'react-native';
// import Sound from 'react-native-sound';

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
        // componentDidMount(){
        //   const sound = new Sound('./assets/BLEEPSHORT.mp3', Sound.MAIN_BUNDLE, (error) => {
        //     if (error) {
        //       console.log('failed to load the sound', error);
        //       return;
        //     }
        //   });
        // }
        renderImage()  {
          var imgSource = this.state.pressing? button : buttonPressed;
          return (
            <Image
            //   style={ homeStyles.optionsImage }
              source={ imgSource }
            />
          );
        }
        playSound() {
          if(this.state.pressing) {
          alert("Bleeeeeep!!")}
        }

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
                        {/* <Image source={require('./assets/button.png')} ></Image> */}
                        </TouchableWithoutFeedback >
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