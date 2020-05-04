import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import propTypes from 'prop-types'
import { Fontisto } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Weather({temp, condition}) {
    return(
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#00000000" translucent={true}/>
                <View style={styles.halfContainer}>
                    <Fontisto name="rain" size={96} color="white" />
                    <Text style={styles.temp}>
                        {temp}°
                    </Text>
                    
                    <Text style={styles.text}>
                        {condition}
                    </Text>
                </View>
                <View style={styles.halfContainer}>
                    <Text style={styles.text}>
                        It's Rainyy
                    </Text>
                 </View>
           </LinearGradient> 
    )
}

Weather.propTypes = {
    temp: propTypes.number.isRequired,
    condition: propTypes.oneOf([
        "Thunderstorm",
        "Drizzle",
        "Rain",
        "Snow",
        "Atmosphere",
        "Clear",
        "Clouds",
        "Mist",
        "Smoke",
        "Haze",
        "Dust",
        "Fog",
        "Sand",
        "Ash",
        "Squall",
        "Tornado"
    ]).isRequired
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    },

    halfContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
        },

    temp: {
        fontSize: 42,
        color: "white"
    },
    text: {
        fontSize: 20,
        color: "white"
    }
})