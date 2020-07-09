import React, {Component} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from 'react-navigation-stack';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage"; 

import combineReducers from './helpers/combineReducers';

import Splash from "./screens/Splash";
import Home from "./screens/Home";
import Details from "./screens/Details";
import Search from "./screens/Search";
import Login from "./screens/Login";
import Inscription from "./screens/Inscription";
import Mes_recettes from "./screens/Mes_recettes";
import Ajout_recette from "./screens/Ajout_recette";

const persistConfig = {
    key: 'combine',
    storage
}

const persistedReducer = persistReducer( persistConfig , combineReducers);

const store = createStore(combineReducers);
const persistor = persistStore(store);


const BottomNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: () => ({
                tabBarIcon: ({ tintColor }) => {
                    <Icon
                        name={'home'}
                        size={24}
                        color={tintColor}
                    />
                } 
            })
        },
        Search: {
            screen: Search,
            navigationOptions: () => ({
                tabBarIcon: ({ tintColor }) => {
                    <Icon
                        name={'search'}
                        size={24}
                        color={tintColor}
                    />
                } 
            })
        },

        Mes_recettes: {
            screen: Mes_recettes,
            navigationOptions: () => ({
                tabBarIcon: ({ tintColor }) => {
                    <Icon
                        name={'list'}
                        size={24}
                        color={tintColor}
                    />
                } 
            }) 
        },

        Ajout_recette: {
            screen: Ajout_recette,
            navigationOptions: () => ({
                tabBarIcon: ({ tintColor }) => {
                    <Icon
                        name={'add-to-list'}
                        size={24}
                        color={tintColor}
                    />
                } 
            })           
        }

    },
    {
        tabBarOptions: {
            showLabel: false,
            activeTintColor: '#7766C6',
            inactiveTintColor: 'black',
        }
    }
);

const AppNavigator = createStackNavigator(
    {
        Splash: {screen: Splash, navigationOptions: {headerShown: false}},
        Login: {screen: Login, navigationOptions: {headerShown: false}},        
        Home: {screen: BottomNavigator, navigationOptions: {headerShown: false}},
        Details: {screen: Details, navigationOptions: {headerShown: false}},
        Home: {screen: Home, navigationOptions: {headerShown: false}},
        Inscription: {screen: Inscription, navigationOptions: {headerShown: false}},
        Mes_recettes: {screen: Inscription, navigationOptions: {headerShown: false}},
        Ajout_recette: {screen: Ajout_recette, navigationOptions: {headerShown: false}},
    },
    {
        initialRouteName: 'Splash'
    }
);

const AppContainer = createAppContainer(AppNavigator);

class App extends Component{
    render() {
      return (<Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <AppContainer/>
          </PersistGate>
      </Provider>
      )
    }
}

export default App;
