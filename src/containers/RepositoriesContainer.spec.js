import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import repositoriesService from '../services/repositories';
import RepositoriesContainer from './RepositoriesContainer';

const testOrg = 'test-org';
const flushPromises = () => new Promise(resolve => setTimeout(resolve));
const axiosMockAdapter = new AxiosMockAdapter(axios);

const repositories = [
  {
    name: 'repo',
    stargazers_count: 1,
    language: 'javascript',
  },
  {
    name: 'repo2',
    stargazers_count: 3,
    language: 'php',
  },
  {
    name: 'another-js-repo',
    stargazers_count: 2,
    language: 'javascript',
  },
];

const sortedRepositories = [
  {
    name: 'repo2',
    stargazers_count: 3,
    language: 'php',
  },
  {
    name: 'another-js-repo',
    stargazers_count: 2,
    language: 'javascript',
  },
  {
    name: 'repo',
    stargazers_count: 1,
    language: 'javascript',
  },
];

let continueFetchAll;
const fetchAllMock = jest.spyOn(repositoriesService, 'fetchAll').mockImplementation(async () => {
  return await new Promise((resolve) => continueFetchAll = resolve);
});

afterEach(() => {
  fetchAllMock.mockRestore();
  axiosMockAdapter.reset();
});


describe('RepositoriesContainer.fetchData', () => {
  test('sorts repositories and sets available languages for 200 response', async () => {
    const repositoriesContainer = new RepositoriesContainer();

    expect(repositoriesContainer.state.status).toBe('uninitialized');

    repositoriesContainer.fetchData(testOrg);

    expect(fetchAllMock).toBeCalledWith(testOrg);

    // wait for state update
    await flushPromises();

    expect(repositoriesContainer.state.status).toBe('loading');

    // resolve mocked fetchAll with repositories
    continueFetchAll(repositories);

    // wait for state update
    await flushPromises();

    expect(repositoriesContainer.state.status).toBe('loaded');
    expect(repositoriesContainer.state.repositories).toEqual(sortedRepositories);
    expect(repositoriesContainer.state.availableLanguages).toEqual(['javascript', 'php']);
    expect(repositoriesContainer.state.loadedOrganization).toEqual(testOrg);
  });

  test('sets not-found status for 404 response', async () => {
    axiosMockAdapter.onAny().reply(404);

    const repositoriesContainer = new RepositoriesContainer();

    await repositoriesContainer.fetchData(testOrg);

    await flushPromises();

    expect(repositoriesContainer.state.status).toBe('not-found');
    expect(repositoriesContainer.state.repositories).toEqual([]);
    expect(repositoriesContainer.state.availableLanguages).toEqual([]);
  });

  test('sets error status for 500 response', async () => {
    axiosMockAdapter.onAny().reply(500);

    const repositoriesContainer = new RepositoriesContainer();

    await repositoriesContainer.fetchData(testOrg);

    await flushPromises();

    expect(repositoriesContainer.state.status).toBe('error');
    expect(repositoriesContainer.state.repositories).toEqual([]);
    expect(repositoriesContainer.state.availableLanguages).toEqual([]);
  });
});
