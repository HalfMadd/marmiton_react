import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';
import EventsService from '../services/events.service';
import { FlatList } from 'react-native-gesture-handler';
import EventBox from '../components/EventBox';
import search from './../assets/search.png';

class Search extends Component{

    constructor(props){
        super(props);
        this.state = {
            events: [],
        }
    }

    async searchEvent(text){
        if(text.length >2){
            let events = await EventsService.getEventsByName(20, text);
            this.setState({events});
        }else{
            this.setState({ events: [] })
        }
        
    }

    render() {

        let {events} = this.state;
        return (
            <View style={styles.container}>
                <View stule={styles.header}>
                    <Image source={search} style={styles.headerImage} />
                    <TextInput style={styles.inputSearch} 
                    placeholder={"Recherchez évènement"} 
                    onChangeText={(e) => this.searchEvent(e)}
                    />
                </View>

                <FlatList 
                data={events} 
                backgroundColor={'#FFF'} 
                keyExtractor={item => item.fields.id} 
                renderItem={ ({item}) => <EventBox data={item.fields} navigation={navigation} />}
                />
            </View>
        )
    }

}

export default Search;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        flex: 1
    },

    header: {
        display: "flex",
        flexDirection: "row",
        marginTop: 70,
        marginHorizontal: 10,
        marginBottom: 20,
        alignItems: "center",
    },

    headerImage: {
        marginRight: 10,
        width: 40,
        height: 25
    },

    inputSearch: {

    },
    
})