import {useEffect, useReducer, useRef} from 'react';
import moment from "moment/moment";

interface State<T> {
    data?: T;
    error?: Error;
}

type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> =
    | { tag: 'loading' }
    | { tag: 'fetched'; payload: T }
    | { tag: 'error'; payload: Error }

function useFetch<T = unknown>(url?: string, options?: RequestInit): State<T> {
    const cache = useRef<Cache<T>>({});

    // Used to prevent state update if the component is unmounted
    const cancelRequest = useRef<boolean>(false);

    const initialState: State<T> = {
        error: undefined,
        data: undefined,
    };

    // Keep state logic separated
    const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
        switch (action.tag) {
            case 'loading':
                return {...initialState};
            case 'fetched':
                return {...initialState, data: action.payload};
            case 'error':
                return {...initialState, error: action.payload};
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        // Do nothing if the url is not given
        if (!url) return;

        cancelRequest.current = false;

        const fetchData = async () => {
            dispatch({tag: 'loading'});

            // If a cache exists for this url, return it
            if (cache.current[url]) {
                dispatch({tag: 'fetched', payload: cache.current[url]});
                return;
            }

            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const text = await response.text();
                const data = JSON.parse(text, (key, value) => {
                    const m = moment.utc(value, moment.ISO_8601);
                    if (m.isValid())
                        return m;
                    return value;
                }) as T

                cache.current[url] = data;
                if (cancelRequest.current) return;

                dispatch({tag: 'fetched', payload: data});
            } catch (error) {
                if (cancelRequest.current) return;

                dispatch({tag: 'error', payload: error as Error});
            }
        };

        void fetchData();

        // Use the cleanup function for avoiding a possibly...
        // ...state update after the component was unmounted
        return () => {
            cancelRequest.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return state;
}

export default useFetch;
