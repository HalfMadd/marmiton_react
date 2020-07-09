import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
} from 'react-native';

class Home extends Component{

    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            commentSource: [],
        }
    }

    componentDidMount() {
     
        return fetch('127.0.0.1:80/api/liste_recettes.php')
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new FlatList.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                dataSource: ds.cloneWithRows(responseJson),
                });
            })
            .catch((error) => {
                console.error(error);
            });

            
    }

    openDetails(id_recette) {
        this.props.navigation.navigate('Details', { FlatListClickItemHolder: id_recette });
    }

    render() {

        let {navigation} = this.props;

        return (
            <ScrollView style={styles.container}>

                <FlatList
                    dataSource={this.state.dataSource}
                    backgroundColor={"#FFF"}
                    renderRow={(rowData) => 
                    <Text style={styles.rowViewContainer} 
                    onPress={this.openDetails.bind(this, rowData.id_recette)}> {rowData.nom_recette} </Text>}
                />

            </ScrollView>
        )
    }

}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: 70
    },
    rowViewContainer: {
        fontSize: 20,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
     
    textViewContainer: {      
        padding:5,
        fontSize: 20,
        color: '#000',
    },
});
