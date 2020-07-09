import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Platform ,
    Alert
} from 'react-native';

class Inscription extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            pseudo: '', 
            role_id: '1', 
        }
    }

    insertData = () =>
    {
        fetch('127.0.0.1:80/api/inscription.php',
        {
            method: 'POST',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pseudo: this.state.pseudo,
                //choisir rôle ?
                role_id: this.state.role_id
            })

        })
        .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson === 'Success'){
                    this.props.navigation.navigate('Login');
                }else{
                    Alert.alert(responseJson);
                }
            }).catch((error) => {
                console.error(error);
            });
    }

    render(){

        let {navigation} = this.props;
        
        return(
            <View style = { styles.container }>
                <TextInput placeholder = "Pseudo" style = { styles.textInput } onChangeText = {(text) => this.setState({ first_name: text })}/>

                {/* <TextInput style = { styles.textInputHidden } /> */}

                <TouchableOpacity activeOpacity = { 0.8 } style = { styles.Btn } onPress = { this.insertData }>
                    <Text style = { styles.btnText }>Inscription</Text>
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
        paddingTop: (Platform.OS == 'ios') ? 20 : 0
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

export default Inscription;