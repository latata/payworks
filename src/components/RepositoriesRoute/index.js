import React, { useEffect } from 'react';
import connect from 'unstated-connect';
import Repositories from '../Repositories';
import RepositoriesContainer from '../../containers/RepositoriesContainer';
import useDebounce from '../../hooks/useDebounce';
import Spinner from '../Spinner';

function RepositoriesRoute({ containers: [repositoriesContainer] }) {
  const { state: { availableLanguages, language, organization, status } } = repositoriesContainer;
  let { repositories } = repositoriesContainer.state;
  const [debouncedOrganization, setDebounceOrganization] = useDebounce(organization, 500);
  const allLanguages = ['', ...availableLanguages]; // empty string means all
  const onOrganizationChange = (organization) => {
    repositoriesContainer.setState({
      organization,
    });
    setDebounceOrganization(organization);
  };

  useEffect(() => {
    repositoriesContainer.fetchData(debouncedOrganization);
  }, [debouncedOrganization, repositoriesContainer]);

  if (language) {
    repositories = repositories.filter((repo) => {
      return repo.language === language;
    });
  }

  return (
    <div className="container">
      <h1>
        Organization's repositories
      </h1>
      <div className="row">
        <div className="form-group col-sm">
          <label htmlFor="organization">Organization</label>
          <input
            type="text"
            className="form-control"
            id="organization"
            value={organization}
            onChange={(event) => onOrganizationChange(event.target.value)} />
        </div>
        <div className="form-group col-sm">
          <label htmlFor="language">Language</label>
          <select
            className="form-control"
            value={language}
            onChange={(event) => repositoriesContainer.setState({ language: event.target.value })}>
            {allLanguages.map(lang => <option key={lang} value={lang}>{lang || 'ALL'}</option>)}
          </select>
        </div>
      </div>
      {status === 'loading' && <Spinner />}
      {status === 'loaded' && <Repositories repositories={repositories} />}
      {status === 'error' && <div>Unexpected error</div>}
      {status === 'not-found' && <div>Organization does not exist</div>}
    </div>
  );
}

export default connect([RepositoriesContainer])(RepositoriesRoute);
