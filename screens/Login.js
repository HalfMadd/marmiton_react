import React, {Component} from 'react';
import { 
    TextInput, 
    Alert,
    View,
    Text,
    StyleSheet,
    TextInput,
    Button
} from 'react-native';

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            pseudo: null
        }
    }

    LoginFunction = () =>{
 
        const { pseudo }  = this.state ;

        fetch('127.0.0.1:8000/api/login.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pseudo: pseudo,
            })
        
        }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson === 'Connexion en cours'){
                    this.props.navigation.navigate('Home', { pseudo: pseudo });
                }else{
                    Alert.alert(responseJson);
                }
            }).catch((error) => {
                console.error(error);
            });
    }

    goToInscription = () => {
        this.props.navigation.navigate('Inscription');
    }



    render() {

        let {navigation} = this.props;
        
        return (
            <View style={styles.MainContainer}>
 
                <Text style= {styles.TextComponentStyle}>Connexion</Text>
        
                <TextInput
                placeholder="Entrez votre pseudo"
                onChangeText={pseudo => this.setState({pseudo})}
                style={styles.TextInputStyleClass}
                />
                <Button title="Valider" onPress={this.LoginFunction} color="#2196F3" />

                <TouchableOpacity activeOpacity = { 0.8 } style = { styles.Btn } onPress = { this.goToInscription }>
                    <Text style = { styles.btnText }>S'inscrire</Text>
                </TouchableOpacity>
        
            </View>
        )
    }

}

export default Login;

const styles = StyleSheet.create({
    MainContainer :{
        justifyContent: 'center',
        flex:1,
        margin: 10,
    },
         
    TextInputStyleClass: {   
        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
            borderColor: '#2196F3',
            borderRadius: 5 ,
            
    },
        
    TextComponentStyle: {
        fontSize: 20,
        color: "#000",
        textAlign: 'center', 
        marginBottom: 15
    },

    Btn:{
        backgroundColor: 'rgba(0,0,255,0.6)',
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
})
