# Radix Web Console — State

The code under this directory organises application state into a _state tree_
and manages its change. State is kept in a [Redux](https://redux.js.org/) store,
and asynchronous operations are handled by
[Redux-Saga](https://redux-saga.js.org/).

Each subdirectory corresponds to a branch in the application state tree.

The state tree does not correspond with application routing or component trees —
and it is not meant to: application state is mostly unconcerned with UI state.
It organises state in a shape that is easy to be consumed by the UI, but its
main purpose is to represent the current state of the application in a form that
is easy to reason about.

## Subdirectories

Each subdirectory contains, in addition to tests, the following files:

### `index.js`

Getters for state items. The use of getter functions avoids crystallising the
state tree by avoiding the use of its structure throughout the application.
E.g. instead of accessing

    state.user.age

we should use

    getAge(state)

### `types.js`

Redux [action types](https://redux.js.org/basics/actions), defined as a map,
e.g.

    {
        ACTION_A: 'ACTION_A',
        ACTION_B: 'ACTION_B'
    }

This bit of boilerplate allows the safe reuse of these constants, e.g. instead
of

    case 'ACTION_A': …

use

    case types.ACTION_A: …

This file should be included in the `/state/types.js` file, so as to make all
action types available in a single file.

### `action-creators.js`

Functions to dispatch Redux actions. As for the getters in `index.js` this
decouples the code, allowing us to use the actions without referencing the
store structure. For instance, don't do this:

    dispatch({ type: types.NEW_USER, details: user })

Instead:

    dispatch(newUser(user))

### `reducer.js`

Standard Redux [reducer](https://redux.js.org/basics/reducers); it should use
the types defined in `types.js`. It is wise to make use of
[immutability-helper]() to avoid state mutation bugs.

This file needs to be included by the root reducer (`/state/root-reducer.js`).

### `sagas.js`

Asynchronous workflows should be defined as Sagas. These should watch for
specific state changes in the store by using e.g. `takeLatest()` or `takeAll()`.
The Saga should then `yield()` further async operations or `put()` new actions
in the store.

Note that `sagas.js` is only necessary if the state has asynchronous
transitions. Synchronous transitions should be handled by simple reducers.

This file needs to be included by the root saga (`/state/root-saga.js`).

## Organisational principles

In general, it's best to have a flat state tree (i.e. try to keep it to one
level of reducers).

It is perfectly fine to have a reducer react to an action
originated in a different part of the tree, but consider whether that action and
state would be better represented by extracting it into a different branch
altogether.
