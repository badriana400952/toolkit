import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//get data
export const getMyKontak = createAsyncThunk('myKontak/getMyKontak', async () => {
    const response = await fetch("https://649820349543ce0f49e1abaf.mockapi.io/kontak")
    const data = await response.json()
    return data

})
//post data
export const tambahDataKontak = createAsyncThunk('myKontak/tambahDataKontak', async (userMyKontak) => {
    const responseMyKontak = await fetch('https://649820349543ce0f49e1abaf.mockapi.io/kontak', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userMyKontak)
    })
    const dataMyKontak = responseMyKontak.json()
    return dataMyKontak
})

export const editDataKontak = createAsyncThunk('myKontak/editDataKontak', async (myKontak) => {
    try {
        const responseEdit = await axios.put(`https://649820349543ce0f49e1abaf.mockapi.io/kontak/${myKontak.id}`, myKontak)
        // const dataEdit = await responseEdit.json()
        // return {id : id, data: dataEdit.data}
        return responseEdit.data;
    } catch (error) {
        throw new Error('Gagal memperbarui data.');
    }

})

export const deleteDataKontak = createAsyncThunk('myKontak/deleteDataKontak', async (id) => {
    try {
         await axios.delete(`https://649820349543ce0f49e1abaf.mockapi.io/kontak/${id}`)
        return id
    } catch (error) {
        console.error(error)
    }
})




const myKontakSlise = createSlice({
    name: "myKontak",
    initialState: {
        myKontak: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        //get data
        [getMyKontak.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [getMyKontak.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.myKontak = action.payload;
        },
        [getMyKontak.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.massage
        },

        //Post Data
        [tambahDataKontak.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [tambahDataKontak.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.myKontak.push(action.payload)
        },
        [tambahDataKontak.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.massage
        },
        //edit data
        [editDataKontak.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [editDataKontak.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.myKontak = action.payload;
        },
        [editDataKontak.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.massage;
        },
        // delete data
        [deleteDataKontak.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [deleteDataKontak.fulfilled]: (state, action) => {
            state.isLoading = false;
            // state.myKontak = action.payload
        },
        [deleteDataKontak.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.massage;
        },
    }
})


export default myKontakSlise.reducer