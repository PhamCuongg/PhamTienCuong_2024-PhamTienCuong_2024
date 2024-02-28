import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_DATA, setData } from './actions';

function* fetchDataFromApi() {
  try {
    const [users, posts, comments] = yield Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users').then((response) => response.json()),
      fetch('https://jsonplaceholder.typicode.com/posts').then((response) => response.json()),
      fetch('https://jsonplaceholder.typicode.com/comments').then((response) => response.json()),
    ]);
    

    yield put(setData({ users, posts, comments }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


export function* watchFetchData() {
  yield takeLatest(FETCH_DATA, fetchDataFromApi);
}
