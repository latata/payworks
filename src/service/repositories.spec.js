import axios from 'axios';
import repositoriesService from './repositories';

jest.mock('axios', () => ({
  get: jest.fn(async () => {
    return {};
  }),
}));

test('fetchAll fetches repositories from GH API', () => {
  repositoriesService.fetchAll('test-org');

  expect(axios.get).toBeCalledWith('https://api.github.com/orgs/test-org/repos?per_page=100');
});

test('fetchBranches fetches branches from GH API', () => {
  repositoriesService.fetchBranches('org/repo');

  expect(axios.get).toBeCalledWith('https://api.github.com/repos/org/repo/branches?per_page=100');
});
