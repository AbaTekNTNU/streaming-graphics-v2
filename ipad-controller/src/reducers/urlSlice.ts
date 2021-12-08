import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moduleinfo from '../modules/basket/moduleinfo.json';

/*
Slice containing url for basket backend.
*/

export interface UrlState {
    value: string
}

const initialState: UrlState = {
    value: moduleinfo.url,
}

export const urlSlice = createSlice({
    name: 'url',
    initialState,
    reducers: {
        setByValue: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setByValue } = urlSlice.actions

export default urlSlice.reducer