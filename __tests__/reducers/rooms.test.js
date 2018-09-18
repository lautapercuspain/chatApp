import reducer from '../../src/reducers/rooms';

describe('Rooms reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual([]);
	});

	it('should create a Room', () => {
		const createAction = {
			type: 'CREATE_ROOM',
			room: {
				name: 'test',
				private: false,
				people: {
					id: '123',
					name: 'Lautaro',
					unread: 0,
					lastRead: 0
				}
			}
		};
		expect(reducer({}, createAction)).toEqual([ createAction.room ]);
	});
});
