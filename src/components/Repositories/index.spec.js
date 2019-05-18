import React from 'react';
import { render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import Repositories from './index';

test('Repositories renders', () => {
  const repositories = [{
    name: 'repo1',
    full_name: 'Org/repo1',
    stargazers_count: 1,
    language: 'javascript',
  },{
    name: 'repo2',
    full_name: 'Org/repo2',
    stargazers_count: 2,
    language: 'javascript',
  }];
  const tree = render(<MemoryRouter><Repositories repositories={repositories} /></MemoryRouter>);
  expect(tree).toMatchSnapshot();
});
