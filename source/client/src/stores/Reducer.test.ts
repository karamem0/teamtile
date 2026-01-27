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
      data: 'foo',
      state: {
        cards: [
          {
            id: '1',
            team: {
              description: 'foo',
              displayName: 'foo',
              id: '1'
            },
            visible: true
          },
          {
            id: '2',
            team: {
              description: 'bar',
              displayName: 'bar',
              id: '2'
            },
            visible: true
          }
        ],
        filter: undefined,
        loading: false
      }
    };
    const expected = {
      cards: [
        {
          id: '1',
          team: {
            description: 'foo',
            displayName: 'foo',
            id: '1'
          },
          visible: true
        },
        {
          id: '2',
          team: {
            description: 'bar',
            displayName: 'bar',
            id: '2'
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
      data: undefined,
      state: {
        cards: [
          {
            id: '1',
            team: {
              description: 'foo',
              displayName: 'foo',
              id: '1'
            },
            visible: true
          },
          {
            id: '2',
            team: {
              description: 'bar',
              displayName: 'bar',
              id: '2'
            },
            visible: false
          }
        ],
        filter: 'foo',
        loading: false
      }
    };
    const expected = {
      cards: [
        {
          id: '1',
          team: {
            description: 'foo',
            displayName: 'foo',
            id: '1'
          },
          visible: true
        },
        {
          id: '2',
          team: {
            description: 'bar',
            displayName: 'bar',
            id: '2'
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
      data: {
        id: '1',
        team: {
          description: 'bar',
          displayName: 'bar',
          id: '1'
        }
      },
      state: {
        cards: [
          {
            id: '1',
            team: {
              description: 'foo',
              displayName: 'foo',
              id: '1'
            }
          }
        ],
        filter: undefined,
        loading: false
      }
    };
    const expected = {
      cards: [
        {
          id: '1',
          team: {
            description: 'bar',
            displayName: 'bar',
            id: '1'
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
      data: undefined,
      state: {
        cards: [
          {
            id: '1',
            team: {
              description: 'foo',
              displayName: 'foo',
              id: '1'
            }
          }
        ],
        filter: undefined,
        loading: false
      }
    };
    const expected = {
      cards: [
        {
          id: '1',
          team: {
            description: 'foo',
            displayName: 'foo',
            id: '1'
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
      data: [
        {
          id: '3',
          team: {
            description: 'baz',
            displayName: 'baz',
            id: '3'
          }
        }
      ],
      state: {
        cards: [
          {
            id: '1',
            team: {
              description: 'foo',
              displayName: 'foo',
              id: '1'
            }
          },
          {
            id: '2',
            team: {
              description: 'bar',
              displayName: 'bar',
              id: '2'
            },
            visible: true
          }
        ],
        filter: undefined,
        loading: false
      }
    };
    const expected = {
      cards: [
        {
          id: '3',
          team: {
            description: 'baz',
            displayName: 'baz',
            id: '3'
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
      data: undefined,
      state: {
        cards: [
          {
            id: '1',
            team: {
              description: 'foo',
              displayName: 'foo',
              id: '1'
            }
          },
          {
            id: '2',
            team: {
              description: 'bar',
              displayName: 'bar',
              id: '2'
            },
            visible: true
          }
        ],
        filter: undefined,
        loading: false
      }
    };
    const expected = {
      cards: [
        {
          id: '1',
          team: {
            description: 'foo',
            displayName: 'foo',
            id: '1'
          }
        },
        {
          id: '2',
          team: {
            description: 'bar',
            displayName: 'bar',
            id: '2'
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
      data: true,
      state: {
        cards: [],
        filter: undefined,
        loading: false
      }
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
      data: undefined,
      state: {
        cards: [],
        filter: undefined,
        loading: false
      }
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
      data: '1',
      state: {
        cards: [
          {
            id: '1',
            pinned: false,
            team: {
              description: 'foo',
              displayName: 'foo',
              id: '1'
            }
          }
        ],
        filter: undefined,
        loading: false
      }
    };
    const expected = {
      cards: [
        {
          id: '1',
          pinned: true,
          team: {
            description: 'foo',
            displayName: 'foo',
            id: '1'
          }
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
      data: undefined,
      state: {
        cards: [
          {
            id: '1',
            pinned: false,
            team: {
              description: 'foo',
              displayName: 'foo',
              id: '1'
            }
          }
        ],
        filter: undefined,
        loading: false
      }
    };
    const expected = {
      cards: [
        {
          id: '1',
          pinned: false,
          team: {
            description: 'foo',
            displayName: 'foo',
            id: '1'
          }
        }
      ],
      filter: undefined,
      loading: false
    };
    const actual = reducer(param.state, togglePin(param.data));
    expect(actual).toStrictEqual(expected);
  });

});
