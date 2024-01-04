import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import LocalStorageMock from '../../../../mocks/localStorageMock';
import Launcher from '../components/Launcher';
import { initStore } from '../../../store/store';

const localStorage = new LocalStorageMock();
const stubSocket = jest.fn();
const store = initStore('dummy', stubSocket, localStorage);

describe('message target store affect app behavior', () => {
  const renderLauncherComponent = () => render(
    <Provider store={store}>
      <Launcher
        toggle={() => {}}
        isChatOpen={false}
        fullScreenMode={false}
      />
    </Provider>
  );

  it('should render a tooltip', () => {
    renderLauncherComponent();
    store.dispatch({ type: 'SHOW_TOOLTIP', visible: true });
    store.dispatch({ type: 'ADD_NEW_RESPONSE_MESSAGE', text: 'hey' });
    // You may need to wait for the component to update
    expect(screen.getByText('hey')).toBeInTheDocument();
  });
});
