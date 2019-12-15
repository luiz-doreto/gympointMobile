import React, { useState } from 'react';
import { Image, Alert } from 'react-native';
import PropTypes from 'prop-types';

import logo from '~/assets/logo.png';
import { Container, TextInput, SubmitButton } from './styles';
import api from '~/services/api';

export default function SignIn({ navigation }) {
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignIn() {
        setLoading(true);
        try {
            await api.post('/sessions/student', { id: userId });
            setLoading(false);
            navigation.navigate('CheckIn');
        } catch (error) {
            setLoading(false);
            Alert.alert('Falha ao logar', 'Aluno não encontrado');
        }
    }

    return (
        <Container>
            <Image source={logo} />
            <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Informe seu ID de cadastro"
                value={userId}
                onChangeText={setUserId}
            />
            <SubmitButton loadging={loading} onPress={handleSignIn}>
                Entrar no sistema
            </SubmitButton>
        </Container>
    );
}

SignIn.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
};
