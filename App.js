import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { TabNavigator, StackNavigator } from 'react-navigation';

import reducers from './src/reducers';
// import AppNavigator from './src/AppNavigator';
import Auth from './src/components/Auth';
import ChatUI from './src/components/ChatUI';
import FoodDetail from './src/components/FoodDetail';
import RecipeDetail from './src/components/RecipeDetail';
import NutritionDetails from './src/components/NutritionDetails';
import PreloadHOC from './src/components/PreloadHOC';
import LogOut from './src/components/LogOut';
import SignUp from './src/components/SignUp';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    console.log(reducers)
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    const MainNavigator = TabNavigator({
      auth: { screen: Auth },
      main: {
        screen: StackNavigator({
          chatUI: {screen: ChatUI},
          foodDetail: {screen: FoodDetail},
          recipeDetail: {screen: RecipeDetail},
          nutritionDetails: {screen: NutritionDetails},
          logOut: {screen: LogOut},
        })
      },
      signUp: {screen: SignUp},
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

export default PreloadHOC(App);
