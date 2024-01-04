import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import Sender from '../components/Conversation/components/Sender';
import { initStore } from '../../../store/store';
import LocalStorageMock from '../../../../mocks/localStorageMock';

const localStorage = new LocalStorageMock();
const stubSocket = jest.fn();
const store = initStore('dummy', stubSocket, localStorage);

describe('Metadata store affect input behavior', () => {
  const renderSenderComponent = (userInputState = null) => {
    if (userInputState) {
      store.dispatch({ type: 'SET_USER_INPUT', userInputState });
    }
    return render(
      <Provider store={store}>
        <Sender
          sendMessage={() => {}}
          inputTextFieldHint="dummy"
          disabledInput={false}
        />
      </Provider>
    );
  };

  beforeEach(() => {
    store.dispatch({ type: 'CLEAR_METADATA' });
  });

  it('should disable the input', () => {
    renderSenderComponent();
    const inputArea = screen.getByPlaceholderText('dummy');
    expect(inputArea).toBeEnabled();

    store.dispatch({ type: 'SET_USER_INPUT', userInputState: 'disable' });
    expect(inputArea).toBeDisabled();
  });

  it('should hide the input', () => {
    renderSenderComponent();
    expect(screen.getByPlaceholderText('dummy')).toBeInTheDocument();

    store.dispatch({ type: 'SET_USER_INPUT', userInputState: 'hide' });
    expect(screen.queryByPlaceholderText('dummy')).not.toBeInTheDocument();
  });
});
