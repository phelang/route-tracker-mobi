import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Text, Button, Input } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import Spacer from './Spacer'

const AuthForm = ({
    clearState,
    headerText,
    errorMessage,
    loading,
    onSubmit,
    onSubmitText,
    tryLocalSignIn,
}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secureInput, setSecureInput] = useState(true)

    return (
        <>
            <NavigationEvents
                onWillFocus={() => {
                    clearState()
                }}
            />
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>

            <Input
                label='Email'
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                autoCorrect={false}
                onKeyPress={() => clearState()}
            />
            <Spacer />
            <Input
                onKeyPress={() => clearState()}
                secureTextEntry={secureInput}
                label='Password'
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
                autoCorrect={false}
                rightIcon={
                    secureInput ? (
                        <Icon
                            name='eye-slash'
                            type='font-awesome'
                            onPress={() => setSecureInput(!secureInput)}
                        />
                    ) : (
                        <Icon
                            name='eye'
                            type='font-awesome'
                            onPress={() => setSecureInput(!secureInput)}
                        />
                    )
                }
            />
            {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <Spacer>
                <Button
                    loading={loading}
                    title={onSubmitText}
                    onPress={() => onSubmit({ email, password })}
                />
            </Spacer>
        </>
    )
}

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 10,
    },
})

export default AuthForm
