import axios from 'axios';

const baseURL = 'https://api.github.com';

export default {
  async fetchAll(org) {
    const response = await axios.get(
      `${baseURL}/orgs/${org}/repos?per_page=100`
    );

    return response.data;
  },

  async fetchBranches(fullName) {
    const response = await axios.get(
      `${baseURL}/repos/${fullName}/branches?per_page=100`
    );

    return response.data;
  },
};
