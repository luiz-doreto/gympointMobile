import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
    padding: 20px;
`;

export const TextArea = styled(Input)`
    background: #fff;
    height: 300px;
    padding: 20px;
    align-items: flex-start;
`;

export const SubmitButton = styled(Button)`
    margin-top: 20px;
    align-self: stretch;
`;
