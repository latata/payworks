import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { Provider } from 'unstated';
import debounce from 'lodash.debounce';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';

import RepositoriesRoute from './index';
import RepositoriesContainer from '../../containers/RepositoriesContainer';

// run debounced function immediately
jest.mock('lodash.debounce', () => jest.fn(fn => fn));

const axiosMock = new AxiosMockAdapter(axios);
const flushPromises = () => new Promise(resolve => setTimeout(resolve));

axiosMock.onAny().reply(200, [
  {
    name: 'repo',
    stargazers_count: 1,
    language: 'javascript',
  },
  {
    name: 'repo2',
    stargazers_count: 2,
    language: 'php',
  }
]);

function renderComponent(repositoriesContainer) {
  return render(
    <Provider inject={[repositoriesContainer]}>
      <MemoryRouter>
        <RepositoriesRoute />
      </MemoryRouter>
    </Provider>
  );
}

afterEach(cleanup);

test('RepositoriesRoute fetches repositories on mount and on organization update', async () => {
  const repositoriesContainer = new RepositoriesContainer();
  const fetchDataStub = jest.spyOn(repositoriesContainer, 'fetchData');
  const defaultOrg = 'payworks';
  const testOrg = 'test-org';

  const { getByLabelText, asFragment } = renderComponent(repositoriesContainer);

  expect(asFragment()).toMatchSnapshot();
  expect(repositoriesContainer.state.organization).toBe(defaultOrg);
  expect(fetchDataStub).toBeCalled();
  expect(fetchDataStub).toBeCalledWith(defaultOrg);

  fetchDataStub.mockReset();

  const orgInput = getByLabelText('Organization');

  await fireEvent.change(orgInput, {
    target: {
      value: testOrg,
    }
  });

  expect(repositoriesContainer.state.organization).toBe(testOrg);
  expect(debounce.mock.calls[0][1]).toBe(500);
  expect(fetchDataStub).toBeCalledWith(testOrg);

  // make sure mocked axios request replied
  await flushPromises();

  expect(asFragment()).toMatchSnapshot();
});

test('RepositoriesRoutes filters repositories by language', async () => {
  const repositoriesContainer = new RepositoriesContainer();
  const { getByLabelText, asFragment } = renderComponent(repositoriesContainer);

  // make sure mocked axios request replied
  await flushPromises();

  const languageSelect = getByLabelText('Language');

  await fireEvent.change(languageSelect, {
    target: {
      value: 'javascript',
    },
  });

  expect(repositoriesContainer.state.language).toBe('javascript');
  expect(asFragment()).toMatchSnapshot();
});

