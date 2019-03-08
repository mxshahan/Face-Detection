import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FaceDetector, DangerZone } from 'expo';
import { color } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default class ProfileScreen extends React.Component {
    static defaultProps = {
        countDownSeconds: 5,
        motionInterval: 500, //ms between each device motion reading
        motionTolerance: 1, //allowed variance in acceleration
        cameraType: Camera.Constants.Type.front, //front vs rear facing camera
    }

    state = {
        hasCameraPermission: null,
        faceDetecting: false, //when true, we look for faces
        faceDetected: false, //when true, we've found a face
        countDownSeconds: 5, //current available seconds before photo is taken
        countDownStarted: false, //starts when face detected
        pictureTaken: false, //true when photo has been taken
        motion: null, //captures the device motion object
        detectMotion: false, //when true we attempt to determine if device is still
        rSize: {}, // face marker rangle size
        rOrigin: {}, // face marker cordinate
    };

    countDownTimer = null;

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status) this.setState({ hasCameraPermission: status === 'granted' });
    }

    componentDidMount() {
        this.motionListener = DangerZone.DeviceMotion.addListener(this.onDeviceMotion);
        setTimeout(() => { //MH - tempm - wait a few seconds for now before detecting motion
            this.detectMotion(true);
        }, 1000);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.detectMotion && nextState.motion && this.state.motion) {
            if (
                Math.abs(nextState.motion.x - this.state.motion.x) < this.props.motionTolerance
                && Math.abs(nextState.motion.y - this.state.motion.y) < this.props.motionTolerance
                && Math.abs(nextState.motion.z - this.state.motion.z) < this.props.motionTolerance
            ) {
                //still
                this.detectFaces(true);
                this.detectMotion(false);
            } else {
                //moving
            }
        }

    }

    detectMotion = (doDetect) => {
        this.setState({
            detectMotion: doDetect,
        });
        if (doDetect) {
            DangerZone.DeviceMotion.setUpdateInterval(this.props.motionInterval);
        } else if (!doDetect && this.state.faceDetecting) {
            this.motionListener.remove();
        }

    }

    onDeviceMotion = (rotation) => {
        this.setState({
            motion: rotation.accelerationIncludingGravity
        });
    }


    detectFaces(doDetect) {
        this.setState({
            faceDetecting: doDetect,
        });
    }


    render() {
        const { hasCameraPermission, rSize, rOrigin } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        style={{ flex: 1 }}
                        type={this.props.cameraType}
                        onFacesDetected={this.state.faceDetecting ? this.handleFacesDetected : undefined}
                        onFaceDetectionError={this.handleFaceDetectionError}
                        faceDetectorSettings={{
                            mode: FaceDetector.Constants.Mode.accurate,
                            detectLandmarks: FaceDetector.Constants.Mode.all,
                            runClassifications: FaceDetector.Constants.Mode.all,
                        }}
                        ref={ref => {
                            this.camera = ref;
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                                position: 'absolute',
                                bottom: 0,
                            }}>
                            <Text
                                style={styles.textStandard}>
                                {this.state.faceDetected ? this.state.faces + ' Face Detected' : 'No Face Detected'}
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                            }}>
                            {this.state.pictureTaken ? <Text
                                style={styles.countdown}
                            >Picture Taken</Text>
                            :
                                rSize.width &&<Text style={{
                                    width: rSize.width-20,
                                    height: rSize.height-20,
                                    display: 'flex',
                                    backgroundColor: 'transparent',
                                    position: 'absolute',
                                    top: rOrigin.x,
                                    left: rOrigin.y,
                                    borderColor: 'blue',
                                    borderWidth: 1
                                }}></Text>
                            }
                        </View>
                    </Camera>
                    <View style={styles.captureBtn}>
                        <TouchableOpacity onPress={this._onPressCapture} style={styles.captureBtnInner}>
                            <Ionicons name="md-wifi" size={50} color={color.red} />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

    handleFaceDetectionError = () => {
        //
    }
    handleFacesDetected = ({ faces, ...rest }) => {
        console.log(rest)
        faces.map((face) => {
            this.setState({
                rSize: face.bounds.size,
                rOrigin: face.bounds.origin
            })
        })
        if (faces.length >= 1) {
            this.setState({
                faceDetected: true,
                faces: faces.length
            });
            // if (!this.state.faceDetected && !this.state.countDownStarted) {
            //     this.initCountDown();
            // }
        }
        // else {
        //     this.setState({ faceDetected: false });
        //     this.cancelCountDown();
        // }
    }
    // initCountDown = () => {
    //     this.setState({
    //         countDownStarted: true,
    //     });
    //     this.countDownTimer = setInterval(this.handleCountDownTime, 1000);
    // }
    // cancelCountDown = () => {
    //     clearInterval(this.countDownTimer);
    //     this.setState({
    //         countDownSeconds: this.props.countDownSeconds,
    //         countDownStarted: false,
    //     });
    // }
    handleCountDownTime = () => {
        if (this.state.countDownSeconds > 0) {
            let newSeconds = this.state.countDownSeconds - 1;
            this.setState({
                countDownSeconds: newSeconds,
            });
        } else {
            this.cancelCountDown();
            this.takePicture();
        }
    }
    takePicture = async () => {
        this.setState({
            pictureTaken: true,
        });
        if (this.camera) {
            console.log('take picture');
            let photo = await this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
            console.log(photo)
        }
    }
    onPictureSaved = () => {
        this.detectFaces(false);
    }

    _onPressCapture = () => {
        this.takePicture();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStandard: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white'
    },
    countdown: {
        fontSize: 40,
        color: 'white'
    },
    captureBtn: {
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        bottom: 50,

    },
    captureBtnInner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        width: 80,
        height: 80,
        borderRadius: 100
    }
});
