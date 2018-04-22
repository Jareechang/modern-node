import { databaseInMemory, ID_KEY } from '../db/index';
import Errors from '../db/errors/index';

afterEach(() => {
  databaseInMemory.clear();
});

describe('DatabaseInMemory', () => {
  it('should initialize with empty storage', () => {
    expect(databaseInMemory.storage).toEqual([]);
  });

  describe('save()', () => {
    it('should persist data in memory when save is called', () => {
      const user = {
        [ID_KEY]: 'test_id_1',
        name: 'Tom',
        email: 'Tom@world.com',
        age: 35
      };
      databaseInMemory.save(user);
      expect(databaseInMemory.storage).toEqual([user]);
    });

    it('should add unique id into list when saved', () => {
      const user = {
        [ID_KEY]: 'test_id_1',
        name: 'Tom',
        email: 'Tom@world.com',
        age: 35
      };
      databaseInMemory.save(user);
      expect(databaseInMemory.ids).toEqual([user[ID_KEY]]);
    });

    it('should throw an error when object does not contain an unique ID', () => {
      const user = {
        name: 'Tom',
        email: 'Tom@world.com',
        age: 35
      };
      try {
        databaseInMemory.save(user);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toEqual(Errors.DB_UNIQUE_ID.message);
      }
    });
  });

  describe('find()', () => {
    it('should find the correct object when provide with the unique id', () => {
      const users = [
        {
          __id: 'test_id_1',
          name: 'Jack',
          email: 'Jack@world.com',
          age: 35
        },
        {
          __id: 'test_id_2',
          name: 'Jill',
          email: 'Jill@world.com',
          age: 31
        }
      ];

      databaseInMemory.save(users[0]);
      databaseInMemory.save(users[1]);
      const result = databaseInMemory.find('test_id_2');
      expect(result).toEqual([users[1]]);
    });
  });
});
