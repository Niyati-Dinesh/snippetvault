//----------Redux Store-------------------

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  snippets: [],
  loading: false,
  error: null
}

const snippetSlice = createSlice({
  name: 'snippets',
  initialState,
  reducers: {
    setSnippets: (state, action) => {
      state.snippets = action.payload
      state.loading = false
      state.error = null
    },
    addSnippet: (state, action) => {
      state.snippets.unshift(action.payload)
    },
    updateSnippet: (state, action) => {
      const index = state.snippets.findIndex(snippet => snippet._id === action.payload._id)
      if (index !== -1) {
        state.snippets[index] = action.payload
      }
    },
    deleteSnippet: (state, action) => {
      state.snippets = state.snippets.filter(snippet => snippet._id !== action.payload)
    },
    clearSnippets: (state) => {
      state.snippets = []
      state.loading = false
      state.error = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const { 
  setSnippets, 
  addSnippet, 
  updateSnippet, 
  deleteSnippet, 
  clearSnippets, 
  setLoading, 
  setError 
} = snippetSlice.actions

export default snippetSlice.reducer