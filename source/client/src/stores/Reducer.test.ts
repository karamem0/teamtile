//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import {
  setCard,
  setCards,
  setFilter,
  setLoading,
  togglePin
} from './Action';
import { reducer } from './Reducer';

describe('setFilter', () => {

  it('should set the filter for the cards', () => {
    const param = {
      state: {
        cards: [
          {
            id: '1',
            team: {
              id: '1',
              displayName: 'foo',
              description: 'foo'
            },
            visible: true
          },
          {
            id: '2',
            team: {
              id: '2',
              displayName: 'bar',
              description: 'bar'
            },
            visible: true
          }
        ],
        filter: undefined,
        loading: false
      },
      data: 'foo'
    };
    const expected = {
      cards: [
        {
          id: '1',
          team: {
            id: '1',
            displayName: 'foo',
            description: 'foo'
          },
          visible: true
        },
        {
          id: '2',
          team: {
            id: '2',
            displayName: 'bar',
            description: 'bar'
          },
          visible: false
        }
      ],
      filter: 'foo',
      loading: false
    };
    const actual = reducer(param.state, setFilter(param.data));
    expect(actual).toStrictEqual(expected);
  });

  it('should clear the filter for the cards', () => {
    const param = {
      state: {
        cards: [
          {
            id: '1',
            team: {
              id: '1',
              displayName: 'foo',
              description: 'foo'
            },
            visible: true
          },
          {
            id: '2',
            team: {
              id: '2',
              displayName: 'bar',
              description: 'bar'
            },
            visible: false
          }
        ],
        filter: 'foo',
        loading: false
      },
      data: undefined
    };
    const expected = {
      cards: [
        {
          id: '1',
          team: {
            id: '1',
            displayName: 'foo',
            description: 'foo'
          },
          visible: true
        },
        {
          id: '2',
          team: {
            id: '2',
            displayName: 'bar',
            description: 'bar'
          },
          visible: true
        }
      ],
      filter: undefined,
      loading: false
    };
    const actual = reducer(param.state, setFilter(param.data));
    expect(actual).toStrictEqual(expected);
  });

});

describe('setCard', () => {

  it('should update the card in the state', () => {
    const param = {
      state: {
        cards: [
          {
            id: '1',
            team: {
              id: '1',
              displayName: 'foo',
              description: 'foo'
            }
          }
        ],
        filter: undefined,
        loading: false
      },
      data: {
        id: '1',
        team: {
          id: '1',
          displayName: 'bar',
          description: 'bar'
        }
      }
    };
    const expected = {
      cards: [
        {
          id: '1',
          team: {
            id: '1',
            displayName: 'bar',
            description: 'bar'
          }
        }
      ],
      filter: undefined,
      loading: false
    };
    const actual = reducer(param.state, setCard(param.data));
    expect(actual).toStrictEqual(expected);
  });

  it('should not update the state when the data is undefined', () => {
    const param = {
      state: {
        cards: [
          {
            id: '1',
            team: {
              id: '1',
              displayName: 'foo',
              description: 'foo'
            }
          }
        ],
        filter: undefined,
        loading: false
      },
      data: undefined
    };
    const expected = {
      cards: [
        {
          id: '1',
          team: {
            id: '1',
            displayName: 'foo',
            description: 'foo'
          }
        }
      ],
      filter: undefined,
      loading: false
    };
    const actual = reducer(param.state, setCard(param.data));
    expect(actual).toStrictEqual(expected);
  });

});

describe('setCards', () => {

  it('should replace the cards in the state', () => {
    const param = {
      state: {
        cards: [
          {
            id: '1',
            team: {
              id: '1',
              displayName: 'foo',
              description: 'foo'
            }
          },
          {
            id: '2',
            team: {
              id: '2',
              displayName: 'bar',
              description: 'bar'
            },
            visible: true
          }
        ],
        filter: undefined,
        loading: false
      },
      data: [
        {
          id: '3',
          team: {
            id: '3',
            displayName: 'baz',
            description: 'baz'
          }
        }
      ]
    };
    const expected = {
      cards: [
        {
          id: '3',
          team: {
            id: '3',
            displayName: 'baz',
            description: 'baz'
          }
        }
      ],
      filter: undefined,
      loading: false
    };
    const actual = reducer(param.state, setCards(param.data));
    expect(actual).toStrictEqual(expected);
  });

  it('should not update the state when the data is undefined', () => {
    const param = {
      state: {
        cards: [
          {
            id: '1',
            team: {
              id: '1',
              displayName: 'foo',
              description: 'foo'
            }
          },
          {
            id: '2',
            team: {
              id: '2',
              displayName: 'bar',
              description: 'bar'
            },
            visible: true
          }
        ],
        filter: undefined,
        loading: false
      },
      data: undefined
    };
    const expected = {
      cards: [
        {
          id: '1',
          team: {
            id: '1',
            displayName: 'foo',
            description: 'foo'
          }
        },
        {
          id: '2',
          team: {
            id: '2',
            displayName: 'bar',
            description: 'bar'
          },
          visible: true
        }
      ],
      filter: undefined,
      loading: false
    };
    const actual = reducer(param.state, setCards(param.data));
    expect(actual).toStrictEqual(expected);
  });

});

describe('setLoading', () => {

  it('should update the loading state', () => {
    const param = {
      state: {
        cards: [],
        filter: undefined,
        loading: false
      },
      data: true
    };
    const expected = {
      cards: [],
      filter: undefined,
      loading: true
    };
    const actual = reducer(param.state, setLoading(param.data));
    expect(actual).toStrictEqual(expected);
  });

  it('should not update the state when the data is undefined', () => {
    const param = {
      state: {
        cards: [],
        filter: undefined,
        loading: false
      },
      data: undefined
    };
    const expected = {
      cards: [],
      filter: undefined,
      loading: false
    };
    const actual = reducer(param.state, setLoading(param.data));
    expect(actual).toStrictEqual(expected);
  });

});

describe('togglePin', () => {

  it('should toggle the pinned state of the card', () => {
    const param = {
      state: {
        cards: [
          {
            id: '1',
            team: {
              id: '1',
              displayName: 'foo',
              description: 'foo'
            },
            pinned: false
          }
        ],
        filter: undefined,
        loading: false
      },
      data: '1'
    };
    const expected = {
      cards: [
        {
          id: '1',
          team: {
            id: '1',
            displayName: 'foo',
            description: 'foo'
          },
          pinned: true
        }
      ],
      filter: undefined,
      loading: false
    };
    const actual = reducer(param.state, togglePin(param.data));
    expect(actual).toStrictEqual(expected);
  });

  it('should not update the state when the data is undefined', () => {
    const param = {
      state: {
        cards: [
          {
            id: '1',
            team: {
              id: '1',
              displayName: 'foo',
              description: 'foo'
            },
            pinned: false
          }
        ],
        filter: undefined,
        loading: false
      },
      data: undefined
    };
    const expected = {
      cards: [
        {
          id: '1',
          team: {
            id: '1',
            displayName: 'foo',
            description: 'foo'
          },
          pinned: false
        }
      ],
      filter: undefined,
      loading: false
    };
    const actual = reducer(param.state, togglePin(param.data));
    expect(actual).toStrictEqual(expected);
  });

});
