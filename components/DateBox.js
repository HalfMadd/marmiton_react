import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class DateBox extends Component{

    render() {

        let {day, month, style} = this.props;

        return(
            <View  style={[styles.container, {...style}]}>
                <Text style={styles.day}>{day}</Text>
                <Text style={styles.month}>{month}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
    },
    day: {
        fontSize: 22,
        color: "#7766C6",
        fontWeight: "bold"
    },
    month: {
        fontSize: 15,
        fontWeight: "bold"
    }


});

export default DateBox;
