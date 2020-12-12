import React from 'react';
import styled from 'styled-components';
import AccountCircle from '@material-ui/icons/AccountCircle';
import parseNameInitials from '../utils/parseNameInitials';

const Wrapper = styled.div`
  width: 100px;
  height: 100px;

  .shadow {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.05);

    > span {
      font-size: 1.5rem;
    }
  }
`;

const Avatar = ({ name, className }) => (
  <Wrapper className={className || ''}>
    <div className="shadow">
      {!!name ? <span>{parseNameInitials(name)}</span> : <AccountCircle />}
    </div>
  </Wrapper>
);

export default Avatar;
