import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from '../reducers';

function render(
  ui,
  {
    initialState,
    store = createStore(reducers, initialState ),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

//mock middleware functions
const thunk = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }
    return next(action)
};

const fakeItem = () => ({
    id: '1',
    price: 20.00,
    title: 'Roses',
    description: 'Roses are Red',
});

export {
    fakeItem,
    thunk
};

export * from '@testing-library/react';
export { render };