import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Alert,
} from 'react-native';

class Ajout_recette extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            nom_recette: '', 
            description_recette: '', 
            user_id: '1'
        }
    }

    insertData = () =>
    {
        fetch('127.0.0.1:8000/api/insert_recette.php',
        {
            method: 'POST',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
                nom_recette: this.state.nom_recette,
                description_recette: this.state.description_recette,
                user_id: this.state.user_id
            })

        }).then((response) => response.json()).then((responseJson) =>{
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
                <TextInput placeholder = "Nom de votre recette" style = { styles.textInput } onChangeText = {(text) => this.setState({ nom_recette: text })}/>
                <TextInput placeholder = "Description" style = { styles.textInput } onChangeText = {(text) => this.setState({ description_recette: text })}/>

                {/* <TextInput style = { styles.textInputHidden } /> */}

                <TouchableOpacity activeOpacity = { 0.8 } style = { styles.Btn } onPress = { this.insertData }>
                    <Text style = { styles.btnText }>Insert</Text>
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

    textInputHidden:{
        display: "none"
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

export default Ajout_recette;