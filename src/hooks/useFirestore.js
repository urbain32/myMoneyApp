import { useEffect, useReducer, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';
let initialState = {
  document: null,
  pending: false,
  error: null,
  success: null,
};
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        pending: true,
        document: null,
        error: null,
        success: false,
      };
    case 'ADDED_DOCUMENT':
      return {
        ...state,
        pending: false,
        document: action.payload,
        error: null,
        success: true,
      };
    case 'ERROR':
      return {
        pending: false,
        document: null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};
export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection reference
  const ref = projectFirestore.collection(collection);
  // set only if dispatch is not cancelled
  const dispatchIsNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };
  // add document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const createAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createAt });
      dispatchIsNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIsNotCancelled({
        type: 'ERROR',
        payload: err.message,
      });
    }
  };

  // delete document
  const deleteDocument = async (id) => {};
  // isCancelled
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { addDocument, deleteDocument, response };
};
