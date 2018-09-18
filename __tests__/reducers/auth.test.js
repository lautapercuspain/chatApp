import reducer from '../../src/reducers/auth';

describe('Auth reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({});
	});

	it('should handle LOGUOT action', () => {
		const createAction = {
			type: 'LOGOUT',
			payload: {}
		};
		expect(reducer({}, createAction)).toEqual(createAction.payload);
	});

	it('should handle LOGUOT action', () => {
		const loginAction = {
			type: 'LOGIN',
			payload: {
				uid: undefined,
				displayName: undefined
			}
		};
		expect(reducer({}, loginAction)).toEqual(loginAction.payload);
	});
});
