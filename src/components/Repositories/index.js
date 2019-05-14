import React, { useEffect } from 'react';
import connect from 'unstated-connect';

import RepositoriesContainer from '../../containers/RepositoriesContainer';

const Repositories = ({ organization, language, containers: [repositoriesContainer] }) => {
  let {
    state: {
      repositories,
    },
  } = repositoriesContainer;

  useEffect(() => {
    repositoriesContainer.fetchData(organization);
  }, [organization, repositoriesContainer]);

  if (language) {
    repositories = repositories.filter((repo) => {
      return repo.language === language;
    });
  }

  return (
    <ul>
      {repositories.map(repository => <li
        key={repository.name}>{repository.name} ({repository.stargazers_count})</li>)}
    </ul>
  );
};

export default connect([RepositoriesContainer])(Repositories);
