import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';

import Background from '~/components/Background';
import { Container, TextArea, SubmitButton } from './styles';
import api from '~/services/api';

export default function HelpOrderNew({ navigation }) {
    const [question, setQuestion] = useState('');

    async function handleSubmit() {
        if (!question) {
            Alert.alert('Falha ao enviar', 'Pergunta obrigatória');
            return;
        }

        try {
            await api.post(`students/${10}/help-orders`, { question });
            navigation.navigate('HelpOrderList');
        } catch (error) {
            Alert.alert(
                'Falha ao enviar',
                'Erro ao enviar pergunta. Por favor, tente novamente mais tarde.'
            );
        }
    }

    return (
        <Background>
            <Container>
                <TextArea
                    multiline
                    numberOfLines={10}
                    placeholder="Inclua seu pedido de auxílio"
                    value={question}
                    onChangeText={setQuestion}
                />
                <SubmitButton onPress={handleSubmit}>
                    Enviar pedido
                </SubmitButton>
            </Container>
        </Background>
    );
}

HelpOrderNew.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
};
