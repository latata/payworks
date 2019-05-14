import React from 'react';
import connect from 'unstated-connect';
import './App.css';
import Repositories from '../Repositories';
import RepositoriesContainer from '../../containers/RepositoriesContainer';
import useDebounce from '../../hooks/useDebounce';

function App({ containers: [repositoriesContainer] }) {
  const { state: { availableLanguages, language, organization } } = repositoriesContainer;
  const [debouncedOrganization, setDebounceOrganization] = useDebounce(organization, 300);
  const allLanguages = ['', ...availableLanguages]; // empty string means all
  const onOrganizationChange = (organization) => {
    repositoriesContainer.setState({
      organization,
    });
    setDebounceOrganization(organization);
  };

  return (
    <div className="App">
      <input
        type="text"
        value={organization}
        onChange={(event) => onOrganizationChange(event.target.value)} />
      <select
        onChange={(event) => repositoriesContainer.setState({ language: event.target.value })}>
        {allLanguages.map(lang => <option key={lang} value={lang}>{lang || 'ALL'}</option>)}
      </select>
      <Repositories organization={debouncedOrganization} language={language} />

    </div>
  );
}

export default connect([RepositoriesContainer])(App);
