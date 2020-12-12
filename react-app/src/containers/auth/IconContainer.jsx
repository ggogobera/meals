import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Icon } from '../../assets/images/icon.svg';

const Wrapper = styled.div`
  margin: 50px auto 15px;
  text-align: center;

  > svg {
    width: 100px;
    height: 100px;
    filter: invert(1);
  }
`;

const IconContainer = () => (
  <Wrapper>
    <Icon />
  </Wrapper>
);

export default IconContainer;
