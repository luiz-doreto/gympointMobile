import React from 'react';

import logo from '~/assets/logo-header.png';
import {
    Container,
    LeftContainer,
    LogoContainer,
    Logo,
    RightContainer,
    Logout,
} from './styles';

export default function Header({ onLogout }) {
    return (
        <Container>
            <LeftContainer />
            <LogoContainer>
                <Logo source={logo} />
            </LogoContainer>
            <RightContainer onPress={onLogout}>
                <Logout>logout</Logout>
            </RightContainer>
        </Container>
    );
}
