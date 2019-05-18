import { renderHook, act } from 'react-hooks-testing-library';
import * as sinon from 'sinon';

import useDebounce from './useDebounce';

let clock;

beforeEach(() => {
  clock = sinon.useFakeTimers();
});

afterEach(() => {
  clock.restore();
});

test('useDebounce should update the state after debounce function is called', async () => {
  const initialValue = 0;
  const delay = 500;
  const { result } = renderHook(() => useDebounce(initialValue, delay));

  // verify initial value
  expect(result.current[0]).toBe(0);

  // make sure debounce function is returned
  expect(result.current[1]).toBeInstanceOf(Function);

  // run debounce function more frequent than set delay time
  act(() => {
    for (let i = 0; i < 6; i++) {
      result.current[1](1);
      clock.tick(100);
    }
  });

  expect(result.current[0]).toBe(0);

  // wait at least 500ms to update the state value
  act(() => {
    // 400ms + 100ms from the last loop iteration
    clock.tick(400);
  });

  expect(result.current[0]).toBe(1);
});

