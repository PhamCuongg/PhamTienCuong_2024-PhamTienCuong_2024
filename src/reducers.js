import { SET_DATA } from './actions';

const initialState = {
  users: [],
  posts: [],
  comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        users: action.payload.users,
        posts: action.payload.posts,
        comments: action.payload.comments,
      };
    default:
      return state;
  }
};

export default reducer;
