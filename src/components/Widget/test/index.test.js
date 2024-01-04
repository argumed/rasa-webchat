import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import Widget from '../index';
import WidgetLayout from '../layout';

describe('<Widget />', () => {
  const profile = jest.fn();;
  const handleUserMessage = jest.fn();
  const dispatch = jest.fn();

  const renderWidgetComponent = () => render(
    <Widget.WrappedComponent
      handleNewUserMessage={handleUserMessage}
      profileAvatar={profile}
      dispatch={dispatch}
      customMessageDelay={() => {}}
      tooltipSent
      tooltipDelay={0}
      socket={{
        isInitialized: () => true
      }}
    />
  );

  it('should render WidgetLayout', () => {
    const { getByTestId } = renderWidgetComponent();
    expect(getByTestId('widget-layout')).toBeInTheDocument();
  });

  it('should prevent events default behavior', () => {
    const { getByTestId } = renderWidgetComponent();
    const messageInput = getByTestId('message-input');
    fireEvent.change(messageInput, { target: { value: 'New message' } });
    fireEvent.submit(getByTestId('message-form'));
    expect(handleUserMessage).toHaveBeenCalledWith('New message');
  });

  it('should clear the message input when new message is submitted', () => {
    const { getByTestId } = renderWidgetComponent();
    const messageInput = getByTestId('message-input');
    fireEvent.change(messageInput, { target: { value: 'New message' } });
    fireEvent.submit(getByTestId('message-form'));
    expect(messageInput.value).toBe('');
  });
});
