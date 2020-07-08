import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Animated,
} from 'react-native';
import logo from './../assets/Signature.png';

class Splash extends Component{

    constructor(props) {
        super(props);
        this.state = {
            fadeIn: new Animated.Value(0)
        }
    }

    fadeInAnimation = () => {
        let {fadeIn} = this.state;
        Animated.timing(fadeIn, {
            toValue: 1,
            duration: 2000,
        }).start(() => this.props.navigation.navigate('Login'));
    };

    componentDidMount() {
        this.fadeInAnimation();
    }


    render() {

        let {fadeIn} = this.state;

        let {navigation} = this.props;

        return (
            <View style={styles.container}>
                <Animated.Image
                    style={{opacity: fadeIn}}
                    source={logo}
                />
            </View>
        )
    }


}

export default Splash;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFF"
    },

});
