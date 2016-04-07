import React, {Component, StyleSheet, Text, TextInput, View} from 'react-native';
import Firebase from 'firebase';
import Button from '../common/button';

const FirebaseUrl = 'https://blistering-torch-2914.firebaseio.com/';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'Default',
            password: '',
            passwordConfirmation: '',
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
                    Sign Up
                </Text>
                <Text style={styles.label}>Username:</Text>
                <TextInput style={styles.input} value={this.state.username} onChangeText={(text) => this.setState({username: text})}/>
                <Text style={styles.label}>Password:</Text>
                <TextInput secureTextEntry={true} style={styles.input} value={this.state.password} onChangeText={(text) => this.setState({password: text})}/>
                <Text style={styles.label}>Confirm Password:</Text>
                <TextInput secureTextEntry={true} style={styles.input} value={this.state.passwordConfirmation} onChangeText={(text) => this.setState({passwordConfirmation: text})}/>
                <Text>{this.state.errorMessage}</Text>
                <Button text={'Signup'} onPress={this.onPress.bind(this)}/>
                <Button text={'I have an account...'} onPress={this.onSigninPress.bind(this)}/>
            </View>
        )
    }

    onSigninPress() {
        // navigate over to signup
        // ideal => navigator.push('signup');
        this.props.navigator.pop({name: 'signup'});
    }

    onPress() {
        // Sign up
        if (this.state.password !== this.state.passwordConfirmation) {
            return this.setState({errorMessage: 'Senha não confere!'});
        }
        this.firebaseRef.createUser({
            email: this.state.username,
            password: this.state.password
        }, (error, userData) => {
            if (error !== null) {
                this.setState({errorMessage: error.message});
            } else {
                AsyncStorage.setItem('user', JSON.stringify(userData))
                .then(() => {
                  this.props.navigator.immediatelyResetRouteStack([{name: 'tweets'}]);
                });
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
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

module.exports = SignUp;
