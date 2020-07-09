import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import search from './../assets/search.png';

class Search extends Component{

    constructor(props){
        super(props);
        this.state = { 
            text: '' ,
            dataSource: ''
        };
        this.recettesholder = [];
    }

    componentDidMount() {
        return fetch('127.0.0.1:80/api/liste_recettes.php')
        .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson
                },
                () => {
                    this.recettesholder = responseJson;
                }
                );
            })
            .catch(error => {
                console.error(error);
            });
    }

    SearchFilterFunction(text) {
        const newData = this.recettesholder.filter(function(item) {

            const itemData = item.nom_recette ? item.nom_recette.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource: newData,
            text: text,
        });
    }

    openDetails(id_recette) {
        this.props.navigation.navigate('Details', { FlatListClickItemHolder: id_recette });
    }

    render() {

        let {navigation} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={search} style={styles.headerImage} />
                    <TextInput style={styles.inputSearch} 
                    placeholder={"Cherchez une recette"} 
                    onChangeText={text => this.SearchFilterFunction(text)}
                    />
                </View>

                <FlatList 
                data={this.state.dataSource} 
                backgroundColor={'#FFF'} 
                renderRow={(rowData) =>
                <Text style={styles.textStyle} onPress={this.openDetails.bind(this, rowData.id_recette)} >
                    {rowData.nom_recette}</Text>}
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

    textStyle: {
        padding: 10,
        borderBottomWidth: 2,
      },
    
})