import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import city from '../assets/city.jpg';
import DateBox from "./DateBox";
import Helpers from "../helpers/Helpers";

class EventBox extends Component{

    details(){
        let {navigation, data} = this.props;
        navigation.navigate('Details', {data: data});
    }

    render() {

        let {title, cover_url, category, date_start} = this.props.data;
        let {horizontal} = this.props;

        return (
            <TouchableOpacity onPress={() => this.details()}>
                <View style={horizontal ? [styles.container, styles.containerHorizontal] : styles.container}>

                    <Image source={{uri: cover_url}} style={styles.headerImage} resizeMode={"cover"}/>

                    <View style={styles.body}>
                        <DateBox style={styles.dateBox} day={Helpers.extractDayFromDate(date_start)} month={Helpers.extractMonthFromDate(date_start)} />
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{Helpers.extractParentCategory(category)}</Text>
                        <Text style={styles.subtitle}>{date_start}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

}

export default EventBox;

const styles = StyleSheet.create({

    container: {
        marginBottom: 20,
        marginHorizontal: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
    },

    containerHorizontal: {
        width: 300
    },

    headerImage: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 120,
        width: "100%"
    },
    body: {
        display: "flex",
        justifyContent: "center",
        height: 150,
        backgroundColor: "#FFF",
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        padding: 10,
    },

    dateBox: {
        position: "absolute",
        left: 10,
        top: -30
    },

    title: {
        fontSize: 18,
        fontWeight: "600",
    },
    subtitle:{
        fontSize: 16,
        color: "#B0B0B0"
    }
});
