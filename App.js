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

import rootReducer from './helpers/rootReducer';

import Splash from "./screens/Splash";
import Home from "./screens/Home";
import Details from "./screens/Details";
import Search from "./screens/Search";
import Login from "./screens/Login";
import Inscription from "./screens/Inscription";

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer( persistConfig , rootReducer);

const store = createStore(rootReducer);
const persistor = persistStore(store);


const BottomNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
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
        Inscription: {screen: Inscription, navigationOptions: {headerShown: false}}
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
