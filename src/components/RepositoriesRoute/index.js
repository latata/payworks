import React, { useEffect } from 'react';
import connect from 'unstated-connect';
import Repositories from '../Repositories';
import RepositoriesContainer from '../../containers/RepositoriesContainer';
import useDebounce from '../../hooks/useDebounce';
import Spinner from '../Spinner';
import Filters from '../Filters';

function RepositoriesRoute({ containers: [repositoriesContainer] }) {
  const { state: { availableLanguages, language, organization, status } } = repositoriesContainer;
  let { repositories } = repositoriesContainer.state;
  const [debouncedOrganization, setDebounceOrganization] = useDebounce(organization, 500);
  const allLanguages = ['', ...availableLanguages]; // empty string means all

  const onOrganizationChange = (organization) => {
    repositoriesContainer.setState({ organization });
    setDebounceOrganization(organization);
  };

  const onLanguageChange = (language) => {
    repositoriesContainer.setState({ language });
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
      <Filters
        organization={organization}
        language={language}
        languages={allLanguages}
        onLanguageChange={onLanguageChange}
        onOrganizationChange={onOrganizationChange}
      />
      {status === 'loading' && <Spinner />}
      {status === 'loaded' && <Repositories repositories={repositories} />}
      {status === 'error' && <div>Unexpected error</div>}
      {status === 'not-found' && <div>Organization does not exist</div>}
    </div>
  );
}

export default connect([RepositoriesContainer])(RepositoriesRoute);
