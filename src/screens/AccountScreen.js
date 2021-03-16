import React, { useContext} from 'react'
import { SafeAreaView } from 'react-navigation'
import { View, StyleSheet} from 'react-native'
import { Text, Button } from 'react-native-elements'
import { Context as AuthContext } from '../context/AuthContext'

const AccountScreen = () => {
    const { signOut } = useContext(AuthContext)

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text style={{fontSize: 48}}>Account Screen</Text>
            <Button onPress={signOut}  title={'Sign Out'}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200,
        margin: 20,
        position: 'relative',
    }
})

export default AccountScreen
