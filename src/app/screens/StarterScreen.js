import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    ActivityIndicator
} from 'react-native';
import logo from '../../assets/logo.png';
import { color } from '../../constants/colors';

import { Font } from 'expo';

class StarterScreen extends React.Component {
 
    state = {
        fontLoaded: false
    }
    async componentDidMount() {
        await Font.loadAsync({
            'TitilliumWeb': require('./fonts/TitilliumWeb-Light.ttf')
        })
        
        this.props.navigation.navigate('Home', {fontLoaded: true})
    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{width: 100, height: 100}}
                    source={logo}
                />
                <Text style={styles.title}>Face Ditection</Text>
                <ActivityIndicator style={styles.indicator} size={30} color="#fff"/>
            </View>
        );
    }
}

export default StarterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:color.red,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        color: '#fff'
    },
    indicator: {
        marginTop: 20
    }
});
