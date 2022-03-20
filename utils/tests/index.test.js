import { apiSuccess } from '../index';

describe('calls the apiSuccess function correctly', () => {
	let callBackSpy;
	beforeEach(() => {
		callBackSpy = jest.fn();
	});
	it('should call the success correctly', () => {
		apiSuccess(callBackSpy, 'mocked');
		expect(callBackSpy).toHaveBeenCalledWith(null, {
			body: JSON.stringify({ data: 'mocked' }),
		});
	});
});
