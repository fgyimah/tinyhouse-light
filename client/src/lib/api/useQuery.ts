import { useEffect, useReducer, useCallback } from 'react';
import { server } from './server';

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

type Action<TData> =
  | {
      type: 'FETCHING';
    }
  | {
      type: 'FETCHING_SUCCESS';
      payload: TData;
    }
  | {
      type: 'FETCHING_ERROR';
    };

export const useQuery = <TData>(query: string) => {
  const reducer = <TData>() => (
    state: State<TData>,
    action: Action<TData>
  ): State<TData> => {
    switch (action.type) {
      case 'FETCHING':
        return { ...state, loading: true };
      case 'FETCHING_SUCCESS':
        return { data: action.payload, loading: false, error: false };
      case 'FETCHING_ERROR':
        return { data: null, loading: false, error: true };
      default:
        return state;
    }
  };

  const fetchReducer = reducer<TData>();

  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false,
  });

  const fetch = useCallback(() => {
    const fetchListings = async () => {
      try {
        dispatch({ type: 'FETCHING' });
        const { data, errors } = await server.fetch<TData>({
          query,
        });

        if (errors && errors.length) {
          throw new Error(errors[0].message);
        }

        dispatch({ type: 'FETCHING_SUCCESS', payload: data });
      } catch (e) {
        dispatch({ type: 'FETCHING_ERROR' });
        throw console.error(e);
      }
    };

    fetchListings();
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
};
