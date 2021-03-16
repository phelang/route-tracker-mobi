import React, { useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'

const SignUpScreen = ({ navigation }) => {
    const { state, signUp, clearState, tryLocalSignIn } = useContext(
        AuthContext
    )

    return (
        <View style={styles.container}>
            <SafeAreaView
                style={{ paddingTop: 20 }}
                forceInset={{ top: 'always' }}
            >
                <AuthForm
                    clearState={clearState}
                    headerText={'Sign Up for Tracker'}
                    errorMessage={state.errorMessage}
                    loading={state.loading}
                    onSubmit={signUp}
                    onSubmitText={'Sign Up'}
                    tryLocalSignIn={tryLocalSignIn}
                />
                <NavLink
                    routeName={'SignIn'}
                    routeText={'Already have an account? Sign in instead'}
                />
            </SafeAreaView>
        </View>
    )
}

SignUpScreen.navigationOptions = () => {
    return {
        header: null,
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginBottom: 200,
        margin: 20,
        paddingTop: 20,
    },
})

export default SignUpScreen
