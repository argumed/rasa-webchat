import React from 'react';
import { List } from 'immutable';
import { render, screen } from '@testing-library/react';

import {
  createNewMessage,
  createVideoSnippet,
  createImageSnippet,
  createComponentMessage,
  createButtons
} from 'helper';

import Messages from '../index';
import Video from '../components/VidReply';
import Image from '../components/ImgReply';
import Message from '../components/Message';
import Buttons from '../components/Buttons';

describe('<Messages />', () => {
  const message = createNewMessage('Response message 1');
  const srcVideo = createVideoSnippet({ title: 'video', video: 'video' });
  const srcImage = createImageSnippet({
    title: 'image',
    image: 'image',
    dims: { width: 100, height: 100 }
  });
  /* eslint-disable react/prop-types */
  const Dummy = ({ text }) => <div>{text}</div>;
  /* eslint-enable */
  const customComp = createComponentMessage(Dummy, {
    text: 'This is a Dummy Component!'
  });
  const buttons = createButtons({
    text: 'test',
    quick_replies: [
      {
        type: 'postback',
        content_type: 'text',
        title: 'Button title 1',
        payload: '/payload1'
      },
      {
        type: 'web_url',
        content_type: 'text',
        title: 'google',
        payload: 'http://www.google.ca'
      }
    ]
  });

  const responseMessages = List([
    message,
    srcVideo,
    srcImage,
    customComp,
    buttons
  ]);

  it('should render a Message, Video, Image, custom, and Buttons components', () => {
    render(
      <Messages.WrappedComponent
        messages={responseMessages}
        customComponent={Dummy}
      />
    );

    // You'll need to use appropriate queries here based on your components' output
    expect(screen.getByText('Response message 1')).toBeInTheDocument();
    expect(screen.getByText('video')).toBeInTheDocument();
    expect(screen.getByText('image')).toBeInTheDocument();
    expect(screen.getByText('This is a Dummy Component!')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  // Additional tests for showMessageDate functionality can be added here
  // Use mocking for global Date and appropriate queries to check for rendered dates
});
