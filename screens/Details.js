import React, {Component} from 'react';
import {
    Alert,
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StyleSheet,

} from 'react-native';

// import {connect} from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';


class Details extends Component{

    constructor(props) {
        super(props);

        this.state = {
            //id_recette: '',
            nom_recette: '',
            description_recette: '',
            user_id: '',

            commentSource: [],
            texte_commentaire: ''
        }
    }

    componentDidMount() {
        fetch('127.0.0.1:8000/api/details_recette.php', {
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
                    //id_recette : responseJson[0].id_recette,
                    nom_recette : responseJson[0].nom_recette,
                    description_recette : responseJson[0].description_recette,
                    user_id : responseJson[0].user_id,
                })
              
            }).catch((error) => {
                console.error(error);
            });
        
        fetch('127.0.0.1:8000/api/liste_commentaires.php', {
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
                let cs = new FlatList.CommentSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                commentSource: cs.cloneWithRows(responseJson),
                });
            });
    }


    addComment = () => {
        fetch('127.0.0.1:8000/api/insert_commentaire.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_recette: this.props.navigation.state.params.FlatListClickItemHolder,
            id_user: '1'
        })
        
        }).then((response) => response.json()).then((responseJson) => {
            alert(responseJson);
        }).catch((error) => {
            console.error(error);
        });  
    }

    deleteRecette = () => {
        fetch('127.0.0.1:8000/api/delete_recette.php', {
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
                    this.props.navigation.navigate('Home');
                }else{
                    Alert.alert(responseJson);
                }
            }).catch((error) => {
                console.error(error);
            }); 

    }

    deleteComment($id_commentaire){
        fetch('127.0.0.1:8000/api/delete_comment.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_commentaire: $id_commentaire
            })
            
            })
            .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson === 'Success'){
                        this.props.navigation.navigate('Home');
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
                
                <View style={{flex:1, flexDirection: 'column'}} >
                    <TouchableOpacity activeOpacity = { 0.8 } style = { styles.BtnDelete } onPress = { this.deleteRecette }>
                        <Text style = { styles.btnText }>Supprimer la recette</Text>
                    </TouchableOpacity>

                    <Text style={styles.textViewContainer} > {'Nom de la recette = ' + this.state.nom_recette} </Text>

                    <Text style={styles.textViewContainer} > {'Description = ' + this.state.description_recette} </Text>

                    <Text style={styles.textViewContainer} > {'Fait par = ' + this.state.user_id} </Text>

                    <TextInput placeholder = "Ajouter un commentaire" style = { styles.textInput } 
                    onChangeText = {(text) => this.setState({ texte_commentaire: text })} />
                    <TouchableOpacity activeOpacity = { 0.8 } style = { styles.Btn } onPress = { this.addComment }>
                        <Text style = { styles.btnText }>Ajouter</Text>
                    </TouchableOpacity>

                    <FlatList
                    dataSource={this.state.commentSource}
                    backgroundColor={"#FFF"}
                    renderRow={ (rowData) => 
                    <Text style={styles.rowViewContainer}> {rowData.texte_commentaire} </Text>,
                    <Text style={styles.rowViewContainer}> Par {rowData.pseudo} </Text>,
                    <TouchableOpacity activeOpacity = { 0.8 } style = { styles.BtnDelete } onPress = { this.deleteComment }>
                        <Text style = { styles.btnText }>Supprimer ce commentaire</Text>
                    </TouchableOpacity>
                    }

                    />

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

    },

    textViewContainer: {      
        padding:5,
        fontSize: 20,
        color: '#000',
    },

    rowViewContainer: {
        backgroundColor: "#FFF",
        borderBottomWidth: 2
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
        backgroundColor: 'rgba(0,0,255,0.6)',
        alignSelf: 'stretch',
        padding: 10,
        marginTop: 10,
        marginBottom: 25
    },

    BtnDelete:{
        backgroundColor: 'rgba(255,0,0,0.3)',
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

export default Details;
