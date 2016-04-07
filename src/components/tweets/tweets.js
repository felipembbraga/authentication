import React, {AsyncStorage, Component, StyleSheet, Text, View} from 'react-native';
import Firebase from 'firebase';
class Tweets extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }
  }
  componentWillMount() {
    AsyncStorage.getItem('user').then((user) => {
      this.setState({user: JSON.parse(user)});
    })
  }

  saudation() {
    if (!this.state.user){
      return (
        <Text>
          Carregando...
        </Text>
      );
    }
    return (
      <Text>
          Welcome back, {this.state.user.password.email}!
        </Text>
    )
  }
  render() {
    return (
        <View style={styles.container}>
            {this.saudation()}
        </View>
      );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = Tweets;
