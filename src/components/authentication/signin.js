import React, {AsyncStorage, Component, StyleSheet, Text, TextInput, View} from 'react-native';
import Firebase from 'firebase';
import Button from '../common/button';

const FirebaseUrl = 'https://blistering-torch-2914.firebaseio.com/';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
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
                <Text style={styles.label}>Email:
                </Text>
                <TextInput style={styles.input} value={this.state.username} onChangeText={(text) => this.setState({username: text})}
                  keyboardType="email-address"/>
                <Text style={styles.label}>Password</Text>
                <TextInput secureTextEntry={true} style={styles.input} value={this.state.password} onChangeText={(text) => this.setState({password: text})}/>
                <Text>{this.state.errorMessage}</Text>
                <Button text={'Sign In'} onPress={this.onPress.bind(this)}/>
                <Button text={'I need an account...'} onPress={this.onSignupPress.bind(this)}/>
            </View>
        )
    }

    onPress() {
        // Log the user in
        this.firebaseRef.authWithPassword({
            email: this.state.username,
            password: this.state.password
        }, (error, authData) => {
            if (error) {

                this.setState({errorMessage: error.message});
            } else {
              AsyncStorage.setItem('user', JSON.stringify(authData))
              .then(() => {
                this.props.navigator.immediatelyResetRouteStack([{name: 'tweets'}]);
              });
            }
        });
    }

    onSignupPress() {
        // navigate over to signup
        // ideal => navigator.push('signup');
        this.props.navigator.push({name: 'signup'});
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
        alignSelf: 'center'
    },
    label: {
        fontSize: 18,
        alignSelf: 'flex-start',
        marginLeft: 5
    }
});

module.exports = SignIn;
