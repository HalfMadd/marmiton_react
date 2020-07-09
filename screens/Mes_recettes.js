import React, {Component} from 'react';
import {
    Alert,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
} from 'react-native';

class Mes_recettes extends Component{

    constructor(props) {
        super(props);

        this.state = {
            dataSource: []
        }
    }

    componentDidMount() {
     
        return fetch('127.0.0.1:80/api/recettes_user.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: '1'
            })
        })
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

    goToModifRecette(id_recette) {
        this.props.navigation.navigate('Update_recette', { FlatListClickItemHolder: id_recette });
    }

    deleteRecette = () => {
        fetch('127.0.0.1:80/api/delete_recette.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_recette: this.props.navigation.state.params.FlatListClickItemHolder,
        })
        
        })
        .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson === 'Success'){
                    this.props.navigation.navigate('Mes_recettes');
                }else{
                    Alert.alert(responseJson);
                }
            }).catch((error) => {
                console.error(error);
            }); 
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
                    onPress={this.openDetails.bind(this, rowData.id_recette)}> {rowData.nom_recette} </Text>,
                    <Text style={styles.rowViewContainer} 
                    onPress={this.goToModifRecette.bind(this, rowData.id_recette)}> Modifier cette recette </Text>
                    <Text style={styles.rowViewContainer} 
                    onPress={this.deleteRecette.bind(this, rowData.id_recette)}> Supprimer cette recette </Text>
                    }
                />

            </ScrollView>
        )
    }

}

export default Mes_recettes;

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
