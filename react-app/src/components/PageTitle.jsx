import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { cond, equals, always, T, includes } from 'ramda';
import { ROUTES } from '../constants';

const Wrapper = styled.div`
  padding: 20px 10px 5px;

  h1 {
    margin: 0;
    font-size: 2rem;
  }
`;

const PageTitle = ({ className, location }) => {
  const [title, setTitle] = React.useState(null);

  React.useEffect(() => {
    setTitle(
      cond([
        [equals(ROUTES.Home), always('Home')],
        [equals(ROUTES.Login), always(null)],
        [equals(ROUTES.Register), always(null)],
        [equals(ROUTES.Profile), always('Profile')],
        [equals(ROUTES.Users), always('Users')],
        [includes('/meals'), always("User's Meals")],
        [includes('/edit'), always('Edit User')],
        [includes('/user/'), always('User')],
        [T, always('404')]
      ])(location.pathname)
    );
  }, [location.pathname]);

  return (
    !!title && (
      <Wrapper className={className || ''}>
        <h1>{title}</h1>
      </Wrapper>
    )
  );
};

export default withRouter(PageTitle);
