import React, { useEffect } from 'react';
import connect from 'unstated-connect';
import RepositoryContainer from '../../containers/RepositoryContainer';
import Spinner from '../Spinner';

function RepositoryRoute({ match, containers: [repositoryContainer] }) {
  const fullName = match.params.id;
  const { state: { branches, status } } = repositoryContainer;

  useEffect(() => {
    repositoryContainer.fetchData(fullName);
  }, [fullName, repositoryContainer]);

  return (
    <div className="container">
      <h1>
        {fullName}
        {' '}
        <small className="text-muted">branches</small>
      </h1>
      {status === 'loaded' && (
        <ul>{branches.map((branch) => <li key={branch.name}><a
          href={`https://github.com/${fullName}/tree/${branch.name}`}>{branch.name}</a></li>)}</ul>
      )}
      {status === 'loading' && <Spinner />}
      {status === 'not-found' && <div>Repository does not exist</div>}
      {status === 'error' && <div>Unexpected error</div>}
    </div>
  );
}

export default connect([RepositoryContainer])(RepositoryRoute);
