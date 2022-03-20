import axios from 'axios';

import { GITUHB_SERVICE_HEADERS } from '@utils/constants';

import { githubServiceRoutes } from './routes';

/**
 * @description this method is to be used for generating a github api service based axios client
 * @returns a github client through which we can make http requests
 */
export const generateGithubClient = () =>
	axios.create({
		baseURL: process.env.GITHUB_API_URL,
		headers: GITUHB_SERVICE_HEADERS,
	});

/**
 * @description a method to make a GET request to a particular organisation / repository within the github (public) repositories
 * @param {string} organization name of the repository / organization present in the github
 * if not provided, it will fall back to the default route provided as the default param within the method (./routes.js)
 * @returns {object} details about the particular github organisation
 */
export const getOrganizations = async (
	organization = githubServiceRoutes.DEFAULT_ROUTE
) => {
	const repoData = await generateGithubClient().get(organization);
	return repoData.data;
};
