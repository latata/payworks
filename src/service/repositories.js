import axios from 'axios';

export default {
  async fetchAll(org) {
    const response = await axios.get(
      `https://api.github.com/orgs/${org}/repos?per_page=100&client_id=2b39c93110bcf31830fb&client_secret=c71cbbcee638795652f97d97f1aa8e40fb663244`
    );

    return response.data;
  },

  async fetchBranches(fullName) {
    const response = await axios.get(
      `https://api.github.com/repos/${fullName}/branches?per_page=100&client_id=2b39c93110bcf31830fb&client_secret=c71cbbcee638795652f97d97f1aa8e40fb663244`
    );

    return response.data;
  }
};
