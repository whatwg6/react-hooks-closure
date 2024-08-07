import React, { useContext, useEffect, cloneElement, useCallback } from 'react';
import useSetState from 'ahooks/es/useSetState';
import useMount from 'ahooks/es/useMount';

export const defaultState = {
  isLoading: true,

  setState: () => {},
  sendManualPay: () => {},
  queryPaymentSlips: () => {},
};

const PaymentContext = React.createContext(defaultState);
PaymentContext.displayName = 'PaymentContext';

const usePaymentSlips = () => {
  const context = useContext(PaymentContext);

  const queryPaymentSlips = () => {
    console.log('queryPaymentSlips');
  };

  useMount(() => {
    context.setState({
      queryPaymentSlips,
    });
  }, []);
};

const useManualPay = () => {
  const context = useContext(PaymentContext);

  const sendManualPay = useCallback(() => {
    console.log('sendManualPay');

    context.queryPaymentSlips();

    console.log(2, context.queryPaymentSlips);
  }, [context, context.queryPaymentSlips]);

  useMount(() => {
    context.setState({
      sendManualPay,
    });
  }, []);
};

const A = () => {
  const context = useContext(PaymentContext);

  usePaymentSlips();
  useManualPay();

  const handle = () => {
    console.log(1, context.sendManualPay);
    context.sendManualPay();
  };

  return (
    <div
      onClick={() => {
        Promise.resolve().then(handle);
      }}
    >
      click
    </div>
  );
};

function Container(props) {
  const context = useContext(PaymentContext);
  const [state, setState] = useSetState(context);

  return (
    <PaymentContext.Provider
      value={{
        ...state,
        setState,
      }}
    >
      {cloneElement(props.children, props)}
    </PaymentContext.Provider>
  );
}

export default function App() {
  return (
    <Container>
      <A />
    </Container>
  );
}
