//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { compare, search } from './String';

describe('compare', () => {

  it('should get 0 when the values are in the same position', () => {
    const param = {
      a: 'foo',
      b: 'foo'
    };
    const expected = {
      value: 0
    };
    const actual = compare(param.a, param.b);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a positive value when the first value comes after the second value', () => {
    const param = {
      a: 'foo',
      b: 'bar'
    };
    const expected = {
      value: 1
    };
    const actual = compare(param.a, param.b);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a positive value when the first value is null', () => {
    const param = {
      a: null,
      b: 'bar'
    };
    const expected = {
      value: 1
    };
    const actual = compare(param.a, param.b);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a positive value when the first value is undefined', () => {
    const param = {
      a: undefined,
      b: 'bar'
    };
    const expected = {
      value: 1
    };
    const actual = compare(param.a, param.b);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a negative value if the first value comes before the second value', () => {
    const param = {
      a: 'bar',
      b: 'foo'
    };
    const expected = {
      value: -1
    };
    const actual = compare(param.a, param.b);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a negative value if the second value is null', () => {
    const param = {
      a: 'bar',
      b: null
    };
    const expected = {
      value: -1
    };
    const actual = compare(param.a, param.b);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a negative value if the second value is undefined', () => {
    const param = {
      a: 'bar',
      b: undefined
    };
    const expected = {
      value: -1
    };
    const actual = compare(param.a, param.b);
    expect(actual).toStrictEqual(expected.value);
  });

});

describe('search', () => {

  it('should get true when the value contains the search string', () => {
    const param = {
      value: 'foo bar baz',
      match: 'bar'
    };
    const expected = true;
    const actual = search(param.value, param.match);
    expect(actual).toStrictEqual(expected);
  });

  it('should get false when the value does not contain the search string', () => {
    const param = {
      value: 'foo bar baz',
      match: 'qux'
    };
    const expected = false;
    const actual = search(param.value, param.match);
    expect(actual).toStrictEqual(expected);
  });

  it('should get false when the value is null', () => {
    const param = {
      value: null,
      match: 'bar'
    };
    const expected = false;
    const actual = search(param.value, param.match);
    expect(actual).toStrictEqual(expected);
  });

  it('should get false when the value is undefined', () => {
    const param = {
      value: undefined,
      match: 'bar'
    };
    const expected = false;
    const actual = search(param.value, param.match);
    expect(actual).toStrictEqual(expected);
  });

});
