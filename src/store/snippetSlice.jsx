// snippetSlice.jsx

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  snippets: [],
  loading: false,
  error: null,
}

const snippetSlice = createSlice({
  name: "snippets",
  initialState,
  reducers: {
    addSnippet: (state, action) => {
      state.snippets.push(action.payload)
    },
    updateSnippet: (state, action) => {
      const index = state.snippets.findIndex(snippet => snippet.id === action.payload.id)
      if (index !== -1) {
        state.snippets[index] = action.payload
      }
    },
    deleteSnippet: (state, action) => {
      state.snippets = state.snippets.filter(snippet => snippet.id !== action.payload)
    },
    setSnippets: (state, action) => {
      state.snippets = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearSnippets: (state) => {
      state.snippets = []
      state.loading = false
      state.error = null
    }
  },
})


export const {
  addSnippet,
  updateSnippet,
  deleteSnippet,
  setSnippets,
  setLoading,
  setError,
  clearSnippets
} = snippetSlice.actions

export default snippetSlice.reducer
