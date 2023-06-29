import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// Membuat async thunk untuk mengambil data pengguna
export const getAllKontak = createAsyncThunk('kontak/getAllKontak', async () => {
    // Melakukan permintaan fetch untuk mengambil data pengguna dari API
    const response = await fetch("http://localhost:5000/kontak");
    const data = await response.json();
    return data;
})

export const addKontak = createAsyncThunk('kontak/addKont', async (userKontak) => {
    const responseAddUser = await fetch("http://localhost:5000/kontak" , {
        method: "POST",
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userKontak)
    })
    const dataAddKontak = await responseAddUser.json();
    return dataAddKontak;
})

// Membuat slice untuk pengguna
const kontakSlise = createSlice({
    name: 'kontak',
    initialState: {
        kontak: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    //ada tiga yang harus di jalankan
    // pending: posts / getPosts / pending
    // fulfilled: posts / getPosts / fulfilled
    // rejected: posts / getPosts / rejected
    extraReducers: {
        // Kasus ketika permintaan fetchUser sedang berjalan
        [getAllKontak.pending]: (state) => {
            // Mengubah isLoading menjadi true untuk menunjukkan bahwa permintaan sedang berjalan
            state.isLoading = true;
            state.error = null; // Menghapus pesan kesalahan jika ada
        },
        // Kasus ketika permintaan fetchUser berhasil
        [getAllKontak.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.kontak = action.payload;
        },
        // Kasus ketika permintaan fetchUser gagal
        [getAllKontak.rejected]: (state, action) => {
            // Mengubah isLoading menjadi false karena permintaan telah selesai
            state.isLoading = false;
            // Menyimpan pesan kesalahan yang diterima
            state.error = action.error.massage

        },
        // Kasus untuk addUser
        [addKontak.pending] : (state) => {
            state.isLoading = true; 
        },
        [addKontak.fulfilled] : (state , action ) => {
            state.isLoading = false;
            state.kontak.push(action.payload)
        },
        [addKontak.rejected] : (state, action) => {
            state.isLoading = false;
            state.error = action.error.massage
        }
    },
})

export default kontakSlise.reducer
