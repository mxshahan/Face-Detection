import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default class SnapScreen extends React.Component {


    render() {
        let img = false;
        let size = {};
        let { params } = this.props.navigation.state;
        if(params) {
          img = params.uri;
          size = {
            width: '100%',
            height: '90%'
          }
        }
        return (
            <View style={{ flex: 1 }}>
              {img &&  <Image
                  style={size}
                  source={{uri: img}}
              />}
              <View style={{
                  flex: 1,
                  backgroundColor: 'purple',
                  alignItems: 'center',
                  justifyContent: 'center'
              }}>
                  <Text style={{color: 'white'}}>Developed by Shahan</Text>
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1
    }
})
