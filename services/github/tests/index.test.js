import axios from 'axios';

import { GITUHB_SERVICE_HEADERS } from '@utils/constants';

import * as githubService from '../index';
import { githubServiceRoutes } from '../routes';

const { getOrganizations, generateGithubClient } = githubService;

jest.mock('axios', () => ({
	__esModule: true,
	default: {
		post: jest.fn(),
		get: jest.fn(),
		create: jest.fn(),
	},
}));

describe('Tests for github service methods', () => {
	const BASE_URL = 'https://test.github.com';
	let OLD_ENV;
	let headers;
	let MOCK_RESPONSE;

	beforeAll(() => {
		OLD_ENV = { ...process.env };
		process.env.GITHUB_API_URL = BASE_URL;
		headers = GITUHB_SERVICE_HEADERS;
		MOCK_RESPONSE = {
			data: {
				name: 'wednesday-solutions',
			},
		};
	});

	beforeEach(() => {
		jest.spyOn(axios, 'create').mockImplementation(() => ({
			get: jest
				.spyOn(axios, 'get')
				.mockImplementation(() => Promise.resolve(MOCK_RESPONSE)),
		}));
	});
	afterEach(() => {
		process.env = { ...OLD_ENV };
		jest.resetAllMocks();
	});

	describe('tests for generateGithubClient() method ', () => {
		it('should accordingly generate github api client', async () => {
			await generateGithubClient();
			expect(axios.create).toHaveBeenCalledTimes(1);
			expect(axios.create).toHaveBeenCalledWith({
				baseURL: BASE_URL,
				headers,
			});
		});
	});

	describe('tests for getOrganizations service method', () => {
		const orgName = 'test-org';
		it('should call to the particular route', async () => {
			await getOrganizations(orgName);
			expect(axios.get).toHaveBeenCalledWith(orgName);
		});

		it('should call to default orgranisation in case any argument is not provided', async () => {
			await getOrganizations();
			expect(axios.get).toHaveBeenCalledWith(githubServiceRoutes.DEFAULT_ROUTE);
		});
	});
});
