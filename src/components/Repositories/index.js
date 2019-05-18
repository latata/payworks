import React from 'react';
import { Link } from 'react-router-dom';

const Repositories = ({ repositories }) => {
  return (
    <table className="table">
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
};

export default Repositories;
