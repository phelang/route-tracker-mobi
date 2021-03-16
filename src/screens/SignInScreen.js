import React, { useContext, useEffect } from 'react'
import { StyleSheet, View} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'

const SignInScreen = ({ navigation }) => {
    const { state, signIn, clearState, tryLocalSignIn } = useContext(AuthContext)

    return (
        <View style={styles.container} >
          <SafeAreaView style={{ paddingTop: 20}}forceInset={{ top: 'always' }}>
            <AuthForm clearState={clearState} headerText={'Sign In to Your Account'} errorMessage={state.errorMessage} loading={state.loading} onSubmit={signIn} onSubmitText={'Sign In'} tryLocalSignIn={tryLocalSignIn}/>
            <NavLink routeName={'SignUp'} routeText={'Sign Up instead'}/>
          </SafeAreaView>
        </View>
    )
}

SignInScreen.navigationOptions = () => {
    return {
        header: null,
    }
}

const styles = StyleSheet.create({
     container: {
        justifyContent: 'center',
        marginBottom: 200,
        margin: 20,
        paddingTop: 20
    }
})

export default SignInScreen
