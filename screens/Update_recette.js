import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Alert,
} from 'react-native';

class Update_recette extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            id_recette: this.props.navigation.state.params.FlatListClickItemHolder,
            nom_recette: '', 
            description_recette: '', 
            user_id: '1'
        }
    }

    componentDidMount() {
        
        fetch('127.0.0.1:80/api/details_recette.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_recette: this.props.navigation.state.params.FlatListClickItemHolder
        })
       
        })
        .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    nom_recette : responseJson[0].nom_recette,
                    description_recette : responseJson[0].description_recette,
                    user_id : responseJson[0].user_id,
                })
              
            }).catch((error) => {
                console.error(error);
            });

    }
        

    updateData = () =>
    {
        fetch('127.0.0.1:80/api/update_recette.php',
        {
            method: 'POST',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
                id_recette: this.state.id_recette,
                nom_recette: this.state.nom_recette,
                description_recette: this.state.description_recette,
                user_id: this.state.user_id
            })

        })
        .then((response) => response.json()).then((responseJson) =>{
            if(responseJson === 'Success'){
                this.props.navigation.navigate('Home');
            }else{
                Alert.alert(responseJson);
            }
        }).catch((error) =>
        {
            console.error(error);
        });
    }

    render(){

        let {navigation} = this.props;

        return(
            <View style = { styles.container }>
                <TextInput defaultValue = { this.state.nom_recette } placeholder = "Nom de votre recette" style = { styles.textInput } 
                onChangeText = {(text) => this.setState({ nom_recette: text })}/>
                <TextInput defaultValue = { this.state.nom_recette } placeholder = "Description" style = { styles.textInput } 
                onChangeText = {(text) => this.setState({ description_recette: text })}/>

                <TouchableOpacity activeOpacity = { 0.8 } style = { styles.Btn } onPress = { this.updateData }>
                    <Text style = { styles.btnText }>Modifier</Text>
                </TouchableOpacity>
                
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        paddingHorizontal: 25,
    },

    textInput:{
        height: 40,
        borderWidth: 1,
        borderColor: 'grey',
        marginVertical: 5,
        alignSelf: 'stretch',
        padding: 8,
        fontSize: 16
    },

    Btn:{
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignSelf: 'stretch',
        padding: 10,
        marginTop: 10,
        marginBottom: 25
    },

    btnText:{
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    }
});

export default Update_recette;