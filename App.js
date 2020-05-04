import React from 'react';
import Loading from './Loading';
import Weather from './Weather';
import * as Location from 'expo-location';
import {Alert} from 'react-native';
import axios from 'axios';
import propTypes from 'prop-types'

const API_KEY = '5a47f0a6662fd13492583a737326206a';

export default class extends React.Component{
  state = {
    isLoading: true
  }
  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    
  // console.log(data)
  this.setState({ isLoading: false, condition: data.weather[0].main, temp: data.main.temp })
  }
  
  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
     
      this.getWeather(latitude, longitude)
    }
  catch (error){
    Alert.alert('we dont know where you are', 'aye');
  }}
  
  componentDidMount(){
    this.getLocation();
  }

  render() {
    const { isLoading, temp, condition } = this.state;
    if ( isLoading==true ) {
    return <Loading />
    }
    else{
      return <Weather temp={Math.round(temp)} condition={condition} />
    }
  }
}