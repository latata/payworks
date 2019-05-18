import React from 'react';

function Filters({ organization, onOrganizationChange, language, onLanguageChange, languages }) {
  return (
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
          id="language"
          value={language}
          onChange={(event) => onLanguageChange(event.target.value)}>
          {languages.map(lang => <option key={lang} value={lang}>{lang || 'ALL'}</option>)}
        </select>
      </div>
    </div>
  )
}

export default Filters;
