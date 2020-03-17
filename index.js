function createStore(reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state
  let state;
  let listeners = [];

  const getState = () => state;
  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  return {
    dispatch,
    getState,
    subscribe
  };
}
// App code

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";
const TOGGLE_GOAL = "TOGGLE_GOAL";

const addTodoAction = todo => ({
  type: ADD_TODO,
  todo
});

const toggleTodoAction = id => ({
  type: TOGGLE_TODO,
  id
});

const removeTodoAction = id => ({
  type: REMOVE_TODO,
  id
});

const toggleGoalAction = id => ({
  type: TOGGLE_GOAL,
  id
});

const addGoalAction = goal => ({
  type: ADD_GOAL,
  goal
});

const removeGoalAction = id => ({
  type: REMOVE_GOAL,
  id
});

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    case REMOVE_TODO:
      return state.filter(todo => todo !== action.id);
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case TOGGLE_GOAL:
      return state.map(goal =>
        goal.id !== action.id
          ? goal
          : Object.assign({}, goal, { complete: !goal.complete })
      );
    case REMOVE_GOAL:
      return state.filter(goal => goal !== action.id);
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    goals: goals(state.goals, action),
    todos: todos(state.todos, action)
  };
}

const store = createStore(app);
store.subscribe(() => {
  console.log("the new state is ", store.getState());
});
store.dispatch(
  addTodoAction({
    todo: {
      id: 0,
      name: "learn redux",
      complete: false
    }
  })
);
