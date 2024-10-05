import { useEffect, useReducer } from 'react';

interface State<T> {
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
}

type Action<T> =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: T }
  | { type: 'FETCH_FAILURE'; error: Error };

function fetchReducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, data: action.payload, error: null };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, error: action.error };
    default:
      throw new Error('Unhandled action type');
  }
}

interface FetchOptions<TResponse, TResult> {
  baseUrl: string;
  path: string;
  options?: RequestInit;
  mapper?: (data: TResponse) => TResult;
}

export const useFetch = <TResponse, TResult = TResponse>(
  { baseUrl, path, options, mapper }: FetchOptions<TResponse, TResult>
): State<TResult> => {
  const initialState: State<TResult> = {
    data: undefined,
    error: null,
    isLoading: false,
  };

  const [state, dispatch] = useReducer<React.Reducer<State<TResult>, Action<TResult>>>(fetchReducer, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!baseUrl || !path) return;

    const fetchData = async (): Promise<void> => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const response = await fetch(`${baseUrl}${path}`, options);
        if (!response.ok) {
          throw new Error(`Fetch error: ${response.statusText}`);
        }
        const data = (await response.json()) as TResponse;
        const result = mapper ? mapper(data) : (data as unknown as TResult);

        if (!cancelRequest) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result });
        }
      } catch (error) {
        if (!cancelRequest) {
          dispatch({ type: 'FETCH_FAILURE', error: error as Error });
        }
      }
    };

    fetchData();

    return () => {
      cancelRequest = true;
    };
  }, [baseUrl, path, options, mapper]);

  return state;
};
