import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

export default class Clima extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempC: "",
      rainP: "",
      windS: "",
      condition: "",
      ciudad: "",
      forecast: []
    };
  }

  buscarC = () => {
    axios
      .get(`http://api.weatherapi.com/v1/forecast.json?key=3e65ba0aeb79404aa8e31607242908&q=${this.state.ciudad}&days=5&aqi=no`)
      .then(response => {
        const datos = response.data;
        this.setState({
          tempC: datos.current.temp_c,
          rainP: datos.current.humidity,
          windS: datos.current.vis_km,
          condition: datos.current.condition.text,
          forecast: datos.forecast.forecastday 
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleInputChange = (text) => {
    this.setState({ ciudad: text });
  };

  render() {
    return (
      <View>
        <Text style={{ color: 'dodgerblue', fontSize: 40, textAlign: 'center' }}>
          Clima App
        </Text>

        <View style={{ borderWidth: 2, borderColor: 'black', borderRadius: 20, width: 200, marginTop: 40, alignSelf: 'center' }}>
          <TextInput
            placeholder="Ciudad a buscar"
            style={{ fontSize: 20, paddingLeft: 10 }}
            onChangeText={this.handleInputChange}
          />
        </View>

        <View style={{ position: 'absolute', right: 110, top: 70 }}>
          <TouchableOpacity onPress={this.buscarC}>
            <Image style={{ width: 20, height: 20, marginTop: 40 }} source={require('./lupa.png')} />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Image style={{ width: 200, height: 200 }} source={require('./nube.png')} />
        </View>

        <Text
          style={{
            color: 'black',
            fontSize: 20,
            textAlign: 'center',
            marginTop: -110,
          }}
        >
          {this.state.tempC} °C
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 50, alignItems: 'center' }}>
          <View>
            <Image style={{ width: 100, height: 100 }} source={require('./lluvia.png')} />
            <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>{this.state.rainP}%</Text>
          </View>

          <View>
            <Image style={{ width: 100, height: 100 }} source={require('./viento.png')} />
            <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>{this.state.windS} KM</Text>
          </View>
        </View>

        <View style={{ borderWidth: 2, borderColor: 'black', borderRadius: 20, width: '100%', height: 140, marginTop: 30, paddingHorizontal: 20 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.state.forecast.map((day, index) => (
              <View key={index} style={{ borderWidth: 2, borderColor: 'gray', borderRadius: 10, width: 100, height: 100, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 50, height: 50 }} source={require('./nube.png')} />
                <Text style={{ fontSize: 20 }}>{day.day.avgtemp_c} °C</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}
