import { Container } from 'unstated';

import repositoriesService from '../service/repositories';

export default class RepositoryContainer extends Container {
  state = {
    branches: [],
    status: 'uninitialized',
  };

  async fetchData(fullName) {
    this.setState({
      branches: [],
      status: 'loading',
    });

    try {
      const branches = await repositoriesService.fetchBranches(fullName);

      this.setState({
        branches,
        status: 'loaded',
      })
    } catch (error) {
      if (error.response && error.response.status === 404) {
        this.setState({
          status: 'not-found',
        });
      } else {
        this.setState({
          status: 'error',
        })
      }
    }
  };
}
