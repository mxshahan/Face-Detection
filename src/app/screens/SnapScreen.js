import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FaceDetector, DangerZone } from 'expo';
import { color } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default class SnapScreen extends React.Component {
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    handleFacesDetected = ({ faces }) => {
        if (faces.length > 0) {
            this.setState({ faces, faceDetected: true });
        }
    };

    snap = async (recognize) => {
        console.log(recognize)
        try {
            if (this.camera) {
                let photo = await this.camera.takePictureAsync({ base64: true });
                 this.props.navigation.navigate('View', photo)
                if (!this.state.faceDetected) {
                    alert('No face detected!');
                    return;
                }

                const userId = makeId();
                const { base64 } = photo;
                this[recognize ? 'recognize' : 'enroll']({ userId, base64 });
            }
        } catch (e) {
            console.log('error on snap: ', e)
        }
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Camera
                    style={{ width: '100%', height: '90%' }}
                    type={'front'}
                    ref={ref => { this.camera = ref; }}
                    onFacesDetected={this.handleFacesDetected}
                    faceDetectorSettings={{
                        mode: FaceDetector.Constants.Mode.fast,
                        detectLandmarks: FaceDetector.Constants.Mode.none,
                        runClassifications: FaceDetector.Constants.Mode.none,
                    }}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                            alignItems: 'flex-end',
                        }}
                        onPress={() => this.snap(false)}>
                        <Text
                            style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                            {' '}Enroll{' '}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                            alignItems: 'flex-end',
                        }}
                        onPress={() => this.snap(true)}>
                        <Text
                            style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                            {' '}Recognize{' '}
                        </Text>
                    </TouchableOpacity>
                </Camera>
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
