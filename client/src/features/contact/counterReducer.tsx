
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'INCREMENT_COUNTER';

export interface ConterState{
    data: number;
    title: string;
}

const initialState: ConterState = {
    data: 42,
    title: 'YARC (yet another redux counter)',
}

export default function counterReducer(state = initialState, action: any) {
    return state;
}

