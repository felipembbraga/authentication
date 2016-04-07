import React, {Component, Navigator, StyleSheet, Text, View} from 'react-native';

import SignIn from './components/authentication/signin';
import SignUp from './components/authentication/signup';
import Tweets from './components/tweets/tweets';

const ROUTES = {
  signin: SignIn,
  signup: SignUp,
  tweets: Tweets
};

class Main extends Component {

    render() {
        return (
            <Navigator
              style={styles.container}
              initialRoute={{name: 'signin'}}
              renderScene={this.renderScene.bind(this)}
              configureScene={() => Navigator.SceneConfigs.FloatFromRight}
              />
        );
    }

    renderScene(route, navigator) {
      var MyComponent = ROUTES[route.name]; // ROUTES['signin'] => SignIn
      return <MyComponent route={route} navigator={navigator} />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

module.exports = Main;
