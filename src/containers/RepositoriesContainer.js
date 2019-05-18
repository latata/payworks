import { Container } from 'unstated';

import repositoriesService from '../services/repositories';

export default class RepositoriesContainer extends Container {
  state = {
    loadedOrganization: '',
    repositories: [],
    availableLanguages: [],
    language: '',
    organization: 'payworks',
    status: 'uninitialized'
  };

  async fetchData(org) {
    if (this.state.status === 'loaded' && org === this.state.loadedOrganization) {
      return;
    }

    this.setState({
      repositories: [],
      loadedOrganization: '',
      availableLanguages: [],
      language: '',
      status: 'loading',
    });

    try {
      const fetchedRepositories = await repositoriesService.fetchAll(org);
      let repositories = fetchedRepositories.sort((a, b) => b.stargazers_count - a.stargazers_count);

      const availableLanguages = fetchedRepositories.reduce((languages, { language }) => {
        if (language && languages.indexOf(language) === -1) {
          languages.push(language);
        }

        return languages;
      }, []).sort();

      this.setState({
        repositories,
        availableLanguages,
        loadedOrganization: org,
        status: 'loaded',
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        this.setState({
          status: 'not-found'
        });
      } else {
        this.setState({
          status: 'error'
        });
      }
    }
  };
}
