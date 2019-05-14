import { Container } from 'unstated';

import repositoriesService from '../service/repositories';

export default class RepositoriesContainer extends Container {
  state = {
    repositories: [],
    availableLanguages: [],
    language: '',
    organization: 'payworks',
  };

  async fetchData(org) {
    this.setState({
      repositories: [],
      availableLanguages: [],
      language: '',
    });

    const fetchedRepositories = await repositoriesService.fetch(org);
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
    })
  };
}
