import React, {Component, StyleSheet, Text, TextInput, View} from 'react-native';
import Firebase from 'firebase';
import Button from '../common/button';

const FirebaseUrl = 'https://blistering-torch-2914.firebaseio.com/';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'Default',
            password: ''
        };
        this.firebaseRef = this.getRef();
    }

    getRef() {
      return new Firebase(FirebaseUrl);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Sign In
                </Text>
                <Text style={styles.label}>Username:
                </Text>
                <TextInput style={styles.input} value={this.state.username} onChangeText={(text) => this.setState({username: text})}/>
                <Text style={styles.label}>Password</Text>
                <TextInput secureTextEntry={true} style={styles.input} value={this.state.password} onChangeText={(text) => this.setState({password: text})}/>
                <Button text={'Sign In'} onPress={this.onPress.bind(this)}/>
            </View>
        )
    }

    onPress() {
        // Log the user in
        // this.firebaseRef.authWithPassword({
        //     email: this.state.username,
        //     password: this.state.password
        // }, function(error, authData) {
        //     if (error) {
        //         console.log("Login Failed!", error);
        //     } else {
        //         console.log("Authenticated successfully with payload:", authData);
        //     }
        // });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        padding: 4,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        width: 200,
        alignSelf: 'center'
    },
    label: {
        fontSize: 18
    }
});

module.exports = SignIn;
