import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import RepositoryContainer from './RepositoryContainer';
import repositoriesService from '../services/repositories';

const axiosMockAdapter = new AxiosMockAdapter(axios);

const testRepo = 'test/repo';
const branches = [
  { name: 'test-branch-1' },
  { name: 'test-branch-2' },
  { name: 'test-branch-3' },
];
const flushPromises = () => new Promise(resolve => setTimeout(resolve));

let continueFetchBranches;
const fetchBranchesMock = jest.spyOn(repositoriesService, 'fetchBranches').mockImplementation(async () => {
  return await new Promise((resolve) => continueFetchBranches = resolve);
});

afterEach(() => {
  fetchBranchesMock.mockRestore();
  axiosMockAdapter.reset();
});

describe('RepositoryContainer.fetchData', () => {
  test('loads repository\'s branches', async () => {
    const repositoryContainer = new RepositoryContainer();

    expect(repositoryContainer.state.status).toBe('uninitialized');

    repositoryContainer.fetchData(testRepo);

    expect(fetchBranchesMock).toBeCalledWith(testRepo);

    // wait for state update
    await flushPromises();

    expect(repositoryContainer.state.status).toBe('loading');

    // resolve mocked continueFetchBranches with repositories
    continueFetchBranches(branches);

    // wait for state update
    await flushPromises();

    expect(repositoryContainer.state.status).toBe('loaded');
    expect(repositoryContainer.state.branches).toEqual(branches);
  });

  test('sets not-found status for 404 response', async () => {
    axiosMockAdapter.onAny().reply(404);

    const repositoryContainer = new RepositoryContainer();

    await repositoryContainer.fetchData(testRepo);

    await flushPromises();

    expect(repositoryContainer.state.status).toBe('not-found');
    expect(repositoryContainer.state.branches).toEqual([]);
  });

  test('sets error status for 500 response', async () => {
    axiosMockAdapter.onAny().reply(500);

    const repositoryContainer = new RepositoryContainer();

    await repositoryContainer.fetchData(testRepo);

    await flushPromises();

    expect(repositoryContainer.state.status).toBe('error');
    expect(repositoryContainer.state.branches).toEqual([]);
  });
});
