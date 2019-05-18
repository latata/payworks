import React from 'react';
import { Link } from 'react-router-dom';

function Repositories({ repositories }) {
  return (
    <table className="table" data-testid="repositories-list">
      <tbody>
      {repositories.map(repository => (
        <tr
          key={repository.name}>
          <td>
            <Link to={`/repository/${repository.full_name}`}>{repository.name}</Link>
          </td>
          <td>
            {repository.language}
          </td>
          <td>
            {repository.stargazers_count}
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default Repositories;
