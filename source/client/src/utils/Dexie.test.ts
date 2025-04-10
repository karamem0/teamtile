//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { ArrayEntity, ValueEntity } from '../types/Dexie';
import { getArray, getValue } from './Dexie';

describe('getArray', () => {

  it('should get a value when the expired is true and the item is not expired', () => {
    const item = {
      expired: true,
      item: {
        id: '48d5b87e-bfff-4195-9685-3ee7afd43d48',
        expired: 0,
        values: [
          {
            id: '48d5b87e-bfff-4195-9685-3ee7afd43d48'
          }
        ]
      } as ArrayEntity<unknown>,
      timestamp: 1
    };
    const expected = [
      {
        id: '48d5b87e-bfff-4195-9685-3ee7afd43d48'
      }
    ];
    const actual = getArray(item.item, item.expired, item.timestamp);
    expect(actual).toStrictEqual(expected);
  });

  it('should get undefined when the expired is true and the item is expired', () => {
    const item = {
      expired: true,
      item: {
        id: '48d5b87e-bfff-4195-9685-3ee7afd43d48',
        expired: 1,
        values: [
          {
            id: '48d5b87e-bfff-4195-9685-3ee7afd43d48'
          }
        ]
      } as ArrayEntity<unknown>,
      timestamp: 0
    };
    const actual = getArray(item.item, item.expired, item.timestamp);
    expect(actual).toBeUndefined();
  });

  it('should get a value when the expired is false and the item is not expired', () => {
    const item = {
      expired: false,
      item: {
        id: '48d5b87e-bfff-4195-9685-3ee7afd43d48',
        expired: 1,
        values: [
          {
            id: '48d5b87e-bfff-4195-9685-3ee7afd43d48'
          }
        ]
      } as ArrayEntity<unknown>,
      timestamp: 0
    };
    const expected = [
      {
        id: '48d5b87e-bfff-4195-9685-3ee7afd43d48'
      }
    ];
    const actual = getArray(item.item, item.expired, item.timestamp);
    expect(actual).toStrictEqual(expected);
  });

  it('should get a value when the expired is false and the item is expired', () => {
    const item = {
      expired: false,
      item: {
        id: '48d5b87e-bfff-4195-9685-3ee7afd43d48',
        expired: 0,
        values: [
          {
            id: '48d5b87e-bfff-4195-9685-3ee7afd43d48'
          }
        ]
      } as ArrayEntity<unknown>,
      timestamp: 1
    };
    const actual = getArray(item.item, item.expired, item.timestamp);
    expect(actual).toBeUndefined();
  });

  it('should get a value when the expired is undefined', () => {
    const item = {
      expired: undefined,
      item: {
        id: '48d5b87e-bfff-4195-9685-3ee7afd43d48',
        expired: 0,
        values: [
          {
            id: '48d5b87e-bfff-4195-9685-3ee7afd43d48'
          }
        ]
      } as ArrayEntity<unknown>,
      timestamp: 0
    };
    const expected = [
      {
        id: '48d5b87e-bfff-4195-9685-3ee7afd43d48'
      }
    ];
    const actual = getArray(item.item, item.expired, item.timestamp);
    expect(actual).toStrictEqual(expected);
  });

  it('should get undefined when the item is undefined', () => {
    const item = {
      expired: undefined,
      item: undefined,
      timestamp: 0
    };
    const expected = undefined;
    const actual = getArray(item.item, item.expired, item.timestamp);
    expect(actual).toStrictEqual(expected);
  });

});

describe('getValue', () => {

  it('should get a value when the expired is true', () => {
    const item = {
      expired: true,
      item: {
        id: '48d5b87e-bfff-4195-9685-3ee7afd43d48',
        expired: 0,
        value: {
          id: '48d5b87e-bfff-4195-9685-3ee7afd43d48'
        }
      } as ValueEntity<unknown>,
      timestamp: 1
    };
    const expected = {
      id: '48d5b87e-bfff-4195-9685-3ee7afd43d48'
    };
    const actual = getValue(item.item, item.expired, item.timestamp);
    expect(actual).toStrictEqual(expected);
  });

  it('should get a value when the expired is false', () => {
    const item = {
      expired: false,
      item: {
        id: '48d5b87e-bfff-4195-9685-3ee7afd43d48',
        expired: 1,
        value: {
          id: '48d5b87e-bfff-4195-9685-3ee7afd43d48'
        }
      } as ValueEntity<unknown>,
      timestamp: 0
    };
    const expected = {
      id: '48d5b87e-bfff-4195-9685-3ee7afd43d48'
    };
    const actual = getValue(item.item, item.expired, item.timestamp);
    expect(actual).toStrictEqual(expected);
  });

  it('should get a value when the expired is undefined', () => {
    const item = {
      expired: undefined,
      item: {
        id: '48d5b87e-bfff-4195-9685-3ee7afd43d48',
        expired: 0,
        value: {
          id: '48d5b87e-bfff-4195-9685-3ee7afd43d48'
        }
      } as ValueEntity<unknown>,
      timestamp: 0
    };
    const expected = {
      id: '48d5b87e-bfff-4195-9685-3ee7afd43d48'
    };
    const actual = getValue(item.item, item.expired, item.timestamp);
    expect(actual).toStrictEqual(expected);
  });

  it('should get undefined when the item is undefined', () => {
    const item = {
      expired: undefined,
      item: undefined,
      timestamp: 0
    };
    const expected = undefined;
    const actual = getValue(item.item, item.expired, item.timestamp);
    expect(actual).toStrictEqual(expected);
  });

});
