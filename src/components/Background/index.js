import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import { Container } from './styles';

export default function Background({ children }) {
    return (
        <Container>
            <Header />
            {children}
        </Container>
    );
}

Background.propTypes = {
    children: PropTypes.node.isRequired,
};
