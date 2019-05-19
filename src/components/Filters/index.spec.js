import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Filters from './index';

test('Filters component renders and reacts to input updates', () => {
  const onLanguageChange = jest.fn();
  const onOrganizationChange = jest.fn();

  const { asFragment, getByLabelText } = render(
    <Filters
      organization="test-org"
      language="JavaScript"
      languages={['JavaScript', 'PHP', 'Java']}
      onLanguageChange={onLanguageChange}
      onOrganizationChange={onOrganizationChange}
    />
  );

  expect(asFragment()).toMatchSnapshot();

  fireEvent.change(getByLabelText('Organization'), {
    target: { value: 'new-org' }
  });

  expect(onOrganizationChange).toBeCalledWith('new-org');

  fireEvent.change(getByLabelText('Language'), {
    target: { value: 'Java' }
  });

  expect(onLanguageChange).toBeCalledWith('Java');
});
