import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { slide } from '../../constants/data';
// import { Ionicons } from '@expo/vector-icons';
import { prescription, medicine, ship } from '../../assets/icons';
import { color } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
class HomeScreen extends React.Component {
    _onPress = () => {

    }

    _onPressUpload = () => {

    }

    _onPressCapture = () => this.props.navigation.navigate('Capture')

    render() {
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={styles.container}>
                    <View>
                        <Image
                            style={styles.slider}
                            source={slide}
                        />
                    </View>
                    <View style={[styles.bodyContainer, styles.stepsContainer]}>
                        <View>
                            <Text style={[styles.center, styles.stepHeader, styles.customFont]}>We are considering 3 steps to detect human face</Text>
                        </View>
                        <View style={styles.steps}>
                            <View style={styles.option}>
                                <Image
                                    source={prescription}
                                    style={styles.optionIcon}
                                />
                                <Text style={[styles.optionLabel, styles.customFont]}>Upload Photo</Text>
                            </View>

                            <View style={styles.option}>
                                <Image
                                    source={medicine}
                                    style={styles.optionIcon}
                                />
                                <Text style={[styles.optionLabel, styles.customFont]}>Prepare Photo</Text>
                            </View>

                            <View style={styles.option}>
                                <Image
                                    source={ship}
                                    style={styles.optionIcon}
                                />
                                <Text style={[styles.optionLabel, styles.customFont]}>Return Response</Text>
                            </View>

                        </View>

                        <View>
                            <Text style={[styles.center, styles.stepFooter, styles.customFont]}>
                                Welcome to Face Ditection UI. Browse your photo or capture one to see how it work. Our main focus is not create same project again and again. We just try to make something difference
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                {/* <View style={styles.uploadContainer}>
                    <View style={styles.uploadInner}>
                        <TouchableOpacity onPress={this._onPressUpload} style={styles.uploadBtn}>
                            <Ionicons name="md-camera" size={60} color={color.primary} />
                            <Text style={styles.uploadText}>Upload Photo</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}


                {/* <View style={[styles.bodyContainer, styles.uploadBtn]}>
                    <View style={styles.uploadInner}>
                        <TouchableOpacity onPress={this._onPressUpload} >
                            <Ionicons name="md-images" size={30} color={color.red} />
                        </TouchableOpacity>
                    </View>
                </View>
                 */}
                <View style={[styles.bodyContainer, styles.captureBtn]}>
                    <View style={styles.uploadInner}>
                        <TouchableOpacity onPress={this._onPressCapture} >
                            <Ionicons name="md-camera" size={30} color={color.red} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default HomeScreen;

const image = {
    x: 500,
    y: 300
}

const width = Dimensions.get('window').width;
const height = (width * image.y) / image.x;
const offset = 10;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    container: {
        position: 'relative',
        backgroundColor: color.textPrimary,
        height: image.y,
        flex: 1
    },
    center: {
        textAlign: 'center'
    },
    stepHeader: {
        marginBottom: 20,
        color: color.primary,
        fontWeight: "600"
    },
    stepFooter: {
        marginTop: 30,
        color: color.textSecondary,
    },
    bodyContainer: {
        margin: 10,
    },
    slider: {
        flex: 1,
        flexDirection: 'row',
        width: width,
        height: height
    },
    stepsContainer: {
        marginTop: 20,
        textAlign:'center'
    },
    steps: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.textPrimary,

        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 0,
        // },
        // shadowOpacity: 0.23,
        // shadowRadius: 2,

        // elevation: 3,
    },
    option: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    optionLabel: {
        textAlign: 'center',
        fontSize: 12,
        color: color.primary,
        marginTop: 10,
    },
    optionIcon: {
        width: 35,
        height: 35
    },
    uploadBtn: {
        margin: 10,
        position: 'absolute',
        bottom: 10,
        left: 10
    },
    captureBtn: {
        margin: 10,
        position: 'absolute',
        bottom: 10,
        right: 10 
    },
    uploadInner: {
        backgroundColor: color.textPrimary,
        padding: 15,
        borderRadius: 100,
        width: 60,
        height: 60,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    uploadText: {
        fontSize: 30
    },
    customFont: {
        fontFamily: 'TitilliumWeb'
    }
});
