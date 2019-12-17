import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '~/components/Background';
import {
    Container,
    ButtonNew,
    HelpOrdersList,
    HelpOrderItem,
    Header,
    Status,
    Time,
    Content,
    ContentContainer,
} from './styles';
import api from '~/services/api';

function HelpOrderList({ navigation, isFocused }) {
    const [helpOrders, setHelpOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadHelpOrders() {
        setLoading(true);
        const response = await api.get(`students/${10}/help-orders`);

        const data = response.data.map(ho => ({
            ...ho,
            time: formatRelative(
                parseISO(ho.answer_at ? ho.answer_at : ho.createdAt),
                new Date(),
                { locale: pt }
            ),
        }));
        setHelpOrders(data);
        setLoading(false);
    }

    useEffect(() => {
        if (isFocused) {
            loadHelpOrders();
        }
    }, [isFocused]);

    function handlePressHelpOrder(helpOrder) {
        navigation.navigate('HelpOrderShow', { helpOrder });
    }

    function handleNewHelpOrder() {
        navigation.navigate('HelpOrderNew');
    }

    return (
        <Background>
            <Container>
                <ButtonNew onPress={handleNewHelpOrder}>
                    Novo pedido de auxílio
                </ButtonNew>
                {loading ? (
                    <ActivityIndicator size="large" color="#999" />
                ) : (
                    <HelpOrdersList
                        data={helpOrders}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => (
                            <HelpOrderItem
                                onPress={() => handlePressHelpOrder(item)}
                            >
                                <Header>
                                    <Status answered={item.answer_at}>
                                        {item.answer_at
                                            ? 'Respondido'
                                            : 'Sem resposta'}
                                    </Status>
                                    <Time>{item.time}</Time>
                                </Header>
                                <ContentContainer>
                                    <Content numberOfLines={3}>
                                        {item.question}
                                    </Content>
                                </ContentContainer>
                            </HelpOrderItem>
                        )}
                    />
                )}
            </Container>
        </Background>
    );
}

HelpOrderList.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
    isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(HelpOrderList);
