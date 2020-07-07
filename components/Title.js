import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class Title extends Component{

    render() {
        let {title} = this.props;
        return (
            <Text style={styles.title}>{title}</Text>
        )
    }

}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        color: "#000",
        fontWeight: 'bold',
        marginBottom: 20,
        marginLeft: 10,
    }
});
