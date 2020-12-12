import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Spinner } from '../assets/images/spinner.svg';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100000;

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 80px;
    max-height: 80px;
    pointer-events: none;
  }
`;

const Loading = ({ fullPage, delay = 0, ...rest }) => {
  const [show, setShow] = React.useState(false);

  const timer = React.useRef(null);

  React.useEffect(() => {
    timer.current = window.setTimeout(() => setShow(true), delay);

    return () => {
      window.clearTimeout(timer.current);
      timer.current = null;
    };
  }, [delay]);

  if (fullPage) {
    return show ? (
      <Backdrop>
        <Spinner {...rest} />
      </Backdrop>
    ) : null;
  }

  return show ? <Spinner {...rest} /> : null;
};

export default Loading;
