import React, {Component, StyleSheet, Text, View} from 'react-native';

import SignIn from './components/authentication/signin';


class Main extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <SignIn/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92b8c8'
    }
});

module.exports = Main;
