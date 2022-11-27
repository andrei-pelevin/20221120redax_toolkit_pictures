import { createSlice } from '@reduxjs/toolkit';


const toolkitSlice = createSlice({
    name: 'toolkit',
    initialState: {
        count: 1,
        data: []
    },
    

    reducers: {
        addImg(state, action) {
            state.data.push(action.payload)
        },
        removeImg(state, action) {
            state.data = state.data.filter((item) => action.payload !== item[2])

        }
    }
})


export default toolkitSlice.reducer;
export const { addImg, removeImg } = toolkitSlice.actions