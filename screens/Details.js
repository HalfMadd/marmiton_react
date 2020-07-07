import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    Button,
    TouchableOpacity,
    StyleSheet,
    Linking
} from 'react-native';
import Title from "../components/Title";
import { updateFavoris } from '../actions/favoris.actions';
import {connect} from 'react-redux';


class Details extends Component{

    constructor(props) {
        super(props);

        this.state = {
            //id_recette: '',
            nom_recette: '',
            description_recette: '',
            user_id: ''
        }
    }

    componentDidMount() {
        fetch('./api/details_recette.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_recette: this.props.navigation.state.params.FlatListClickItemHolder
        })
       
        }).then((response) => response.json())
            .then((responseJson) => {
 
                this.setState({
                    //id_recette : responseJson[0].id_recette,
                    nom_recette : responseJson[0].nom_recette,
                    description_recette : responseJson[0].description_recette,
                    user_id : responseJson[0].user_id,
                })
              
            }).catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                
                <View style={{flex:1, flexDirection: 'column'}} >

                    <Text style={styles.textViewContainer} > {'nom de la recette = ' + this.state.nom_recette} </Text>

                    <Text style={styles.textViewContainer} > {'Description = ' + this.state.description_recette} </Text>

                    <Text style={styles.textViewContainer} > {'Fait par = ' + this.state.user_id} </Text>


                </View>

            </ScrollView>
        );
    }


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    body: {

    }

});

export default Details;
