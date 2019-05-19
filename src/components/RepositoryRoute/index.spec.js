import { cleanup, render } from 'react-testing-library';
import { Provider } from 'unstated';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import RepositoryRoute from '../../components/RepositoryRoute';
import RepositoryContainer from '../../containers/RepositoryContainer';

const axiosMock = new AxiosMockAdapter(axios);

const flushPromises = () => new Promise(resolve => setTimeout(resolve));

function renderComponent(repositoryContainer) {
  return render(
    <Provider inject={[repositoryContainer]}>
      <MemoryRouter>
        <RepositoryRoute match={{
          params: {
            fullName: 'test-org/repo'
          }
        }} />
      </MemoryRouter>
    </Provider>
  );
}

afterEach(() => {
  cleanup();
  axiosMock.reset();
});

test('RepositoryRoute fetches branches on mount', async () => {
  axiosMock.onAny().reply(200, [
    { name: 'test-branch-1' },
    { name: 'test-branch-2' },
    { name: 'test-branch-3' },
  ]);

  const repositoryContainer = new RepositoryContainer();
  const { asFragment } = renderComponent(repositoryContainer);

  expect(asFragment()).toMatchSnapshot();

  await flushPromises();

  expect(asFragment()).toMatchSnapshot();
});

test('RepositoryRoute shows error message for repository which does not exist', async () => {
  axiosMock.onAny().reply(404);

  const repositoryContainer = new RepositoryContainer();
  const { asFragment } = renderComponent(repositoryContainer);

  await flushPromises();

  expect(asFragment()).toMatchSnapshot();
});

test('RepositoryRoute shows error message for 500 API response', async () => {
  axiosMock.onAny().reply(500);

  const repositoryContainer = new RepositoryContainer();
  const { asFragment } = renderComponent(repositoryContainer);

  await flushPromises();

  expect(asFragment()).toMatchSnapshot();
});
