import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Tinycon from 'tinycon';
import Modal from 'react-modal';
import { expect, vi, describe, beforeEach, afterEach, it } from 'vitest';

import configureStore from '@/store';
import { toggleWindowFocus, toggleSoundEnabled } from '@/actions/app';
import { receiveEncryptedMessage } from '@/actions/encrypted_messages';
import { beep } from '@/utils/notifications';

import { ConnectedHome } from './';

const store = configureStore();

vi.useFakeTimers();

vi.mock('react-modal'); // Cant load modal without root app element

vi.mock('nanoid', () => {
  // Avoid exception
  return {
    nanoid: vi.fn().mockImplementation(() => {
      return 'shortidgenerated';
    }),
  };
});

vi.mock('tinycon', () => {
  return {
    default: { setBubble: vi.fn() },
  };
});

// We don't test activity list here
vi.mock('./ActivityList', () => {
  return { default: vi.fn().mockReturnValue(null) };
});

vi.mock('@/utils/socket', () => {
  // Avoid exception
  return {
    connect: vi.fn().mockImplementation(() => {
      return {
        on: vi.fn(),
        emit: vi.fn(),
      };
    }),
    getSocket: vi.fn().mockImplementation(() => {
      return {
        on: vi.fn(),
        emit: vi.fn(),
      };
    }),
  };
});

vi.mock('@/utils/crypto', () => {
  // Need window.crytpo.subtle
  return {
    default: vi.fn().mockImplementation(() => {
      return {
        createEncryptDecryptKeys: () => {
          return {
            privateKey: { n: 'private' },
            publicKey: { n: 'public' },
          };
        },
        exportKey: () => {
          return { n: 'exportedKey' };
        },
      };
    }),
  };
});

vi.mock('@/utils/message', () => {
  return {
    process: vi.fn(async (payload, state) => ({
      ...payload,
      payload: { payload: 'text', username: 'sender', text: 'new message' },
    })),
  };
});

vi.mock('@/utils/notifications', () => {
  return {
    notify: vi.fn(),
    beep: { play: vi.fn() },
  };
});


  it('should display', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <ConnectedHome match={{ params: { roomId: 'roomTest' } }} userId="testUserId" />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
    // Test with window focused
    await receiveEncryptedMessage({
      type: 'TEXT_MESSAGE',
      payload: {},
    })(store.dispatch, store.getState);

    rerender(
      <Provider store={store}>
        <ConnectedHome match={{ params: { roomId: 'roomTest' } }} userId="testUserId" roomId={'testId'} />
      </Provider>,
    );

    expect(store.getState().app.unreadMessageCount).toBe(0);
    expect(beep.play).not.toHaveBeenCalled();
    expect(Tinycon.setBubble).not.toHaveBeenCalled();

    // Test with window unfocused
    await toggleWindowFocus(false)(store.dispatch);
    await receiveEncryptedMessage({
      type: 'TEXT_MESSAGE',
      payload: {},
    })(store.dispatch, store.getState);

    rerender(
      <Provider store={store}>
        <ConnectedHome match={{ params: { roomId: 'roomTest' } }} userId="testUserId" roomId={'testId'} />
      </Provider>,
    );
    expect(store.getState().app.unreadMessageCount).toBe(1);
    expect(beep.play).toHaveBeenLastCalledWith();
    expect(Tinycon.setBubble).toHaveBeenLastCalledWith(1);

    await receiveEncryptedMessage({
      type: 'TEXT_MESSAGE',
      payload: {},
    })(store.dispatch, store.getState);

    rerender(
      <Provider store={store}>
        <ConnectedHome match={{ params: { roomId: 'roomTest' } }} userId="testUserId" roomId={'testId'} />
      </Provider>,
    );

    expect(store.getState().app.unreadMessageCount).toBe(2);
    expect(beep.play).toHaveBeenCalledTimes(1);
    expect(Tinycon.setBubble).toHaveBeenLastCalledWith(2);
  
