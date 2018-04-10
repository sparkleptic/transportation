import convertArrayToMap from '../convertArrayToMap';

let arrayObject = [
  {
    id: 'id1',
    name: 'name1',
  },
  {
    id: 'id2',
    name: 'name2',
  },
];

it('should convert array of Object to Map', () => {
  let data = convertArrayToMap(arrayObject);
  expect(data.size).toBe(2);

  let keys = Array.from(data.keys());
  expect(keys.includes('id1')).toBe(true);
  expect(keys.includes('id2')).toBe(true);

  let value1 = data.get('id1');
  expect(value1).toEqual({id: 'id1', name: 'name1'});

  let value2 = data.get('id2');
  expect(value2).toEqual({id: 'id2', name: 'name2'});
});

it('should convert array of Object to Map with custom key', () => {
  let data = convertArrayToMap(arrayObject, 'name');
  expect(data.size).toBe(2);

  let keys = Array.from(data.keys());
  expect(keys.includes('name1')).toBe(true);
  expect(keys.includes('name2')).toBe(true);
});
