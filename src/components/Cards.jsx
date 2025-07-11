"use client"

import { Edit, Trash, Tag, Copy, Check, Search, Plus, Code2 } from "lucide-react"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { setSnippets } from "../store/snippetSlice"
import { useDispatch } from "react-redux"
import axiosDelete from "../api/axiosInstance"
import axiosFetch from "../api/axiosFetch"
import { login } from "../store/authSlice"
import AddSnippetModal from "./AddSnippetModel"

export default function Cards() {
  const dispatch = useDispatch()
  const [copiedId, setCopiedId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSnippet, setEditingSnippet] = useState(null)

  // Function to fetch cards, fires when component mounts
  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true)
      try {
        const response = await axiosFetch.get("/manage/fetchsnippet")
        if (response.status === 200) {
          // Handle both cases: when snippets exist and when they don't
          const snippets = response.data.snippets || []
          setContent(snippets)
          dispatch(setSnippets(snippets))
        }
      } catch (error) {
        console.error("Error fetching snippets:", error)
        toast.error("Failed to fetch snippets")
        setContent([]) // Ensure content is always an array
      } finally {
        setLoading(false)
      }
    }

    fetchCards()
  }, [dispatch])

  // Function to randomize colors of snippets
  const getCategoryColor = () => {
    const colorValues = [
      "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
      "from-red-500/20 to-pink-500/20 border-red-500/30",
      "from-green-500/20 to-emerald-500/20 border-green-500/30",
      "from-orange-500/20 to-amber-500/20 border-orange-500/30",
      "from-purple-500/20 to-violet-500/20 border-purple-500/30",
      "from-indigo-600/20 to-purple-600/20 border-indigo-500/30",
      "from-sky-500/20 to-fuchsia-500/20 border-fuchsia-400/30",
      "from-cyan-400/20 to-teal-400/20 border-cyan-300/30",
      "from-rose-400/20 to-pink-400/20 border-rose-300/30",
      "from-fuchsia-600/20 to-violet-500/20 border-fuchsia-500/30",
      "from-amber-400/20 to-rose-400/20 border-amber-300/30",
      "from-slate-600/20 to-zinc-700/20 border-slate-500/30",
      "from-yellow-300/20 to-orange-400/20 border-yellow-300/30",
    ]
    const randomIndex = Math.floor(Math.random() * colorValues.length)
    return colorValues[randomIndex]
  }

  // Function to store user data in local storage and dispatch login action
  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    if (token && user) {
      dispatch(login({ token, user: JSON.parse(user) }))
    }
  }, [dispatch])

  // Function to handle copy to clipboard
  const handleCopy = async (text, _id) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(_id)
      setTimeout(() => setCopiedId(null), 2000)
      toast.success("Copied to clipboard")
    } catch (err) {
      console.error("Failed to copy text: ", err)
      toast.error("Failed to copy to clipboard")
    }
  }

  // Function to handle editing
  const handleEdit = (snippet) => {
    setEditingSnippet(snippet)
    setIsModalOpen(true)
  }

  // Function to handle deletion of snippets
  const handleDelete = async (id) => {
    try {
      const res = await axiosDelete.delete(`/manage/deletesnippet/${id}`)
      if (res.status === 200) {
        toast.success("Snippet deleted successfully 💥")
        // Remove from UI immediately
        const updatedContent = content.filter((snippet) => snippet._id !== id)
        setContent(updatedContent)
        dispatch(setSnippets(updatedContent))
      }
    } catch (err) {
      console.error("Error deleting snippet:", err)
      toast.error("Failed to delete snippet ❌")
    }
  }

  // Function to handle when a new snippet is added
  const handleSnippetAdded = (newSnippet) => {
    const updatedContent = [newSnippet, ...content]
    setContent(updatedContent)
    dispatch(setSnippets(updatedContent))
  }

  // Function to handle when a snippet is updated
  const handleSnippetUpdated = (updatedSnippet) => {
    const updatedContent = content.map((snippet) => (snippet._id === updatedSnippet._id ? updatedSnippet : snippet))
    setContent(updatedContent)
    dispatch(setSnippets(updatedContent))
  }

  // Function to handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingSnippet(null)
  }

  // Function to handle opening modal for adding new snippet
  const handleAddSnippet = () => {
    setEditingSnippet(null)
    setIsModalOpen(true)
  }

  // Filter snippets based on search term
  const filteredContent = content.filter((item) => {
    const searchable = `${item.title} ${item.about} ${item.category} ${item.tags?.join(" ") || ""}`.toLowerCase()
    return searchable.includes(searchTerm)
  })

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-fuchsia-500/30">
          <Code2 className="w-12 h-12 text-fuchsia-400" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-fuchsia-500 to-purple-500 rounded-full flex items-center justify-center">
          <Plus className="w-4 h-4 text-white" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2 font-mono">No Snippets Yet</h3>
      <p className="text-gray-400 text-center mb-6 max-w-md font-mono">
        Start building your code snippet library! Add your first snippet to keep your favorite code organized and easily
        accessible.
      </p>
      <button
        onClick={handleAddSnippet}
        className="px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white font-mono font-bold rounded-lg hover:from-fuchsia-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Your First Snippet
      </button>
    </div>
  )

  // No results state component
  const NoResultsState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-16 h-16 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-full flex items-center justify-center border border-gray-500/30 mb-6">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2 font-mono">No Results Found</h3>
      <p className="text-gray-400 text-center font-mono">
        No snippets match "{searchTerm}". Try a different search term.
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-black px-4 sm:px-6 lg:px-8 py-10 font-mono">
      {/* Search Bar */}
      <div className="relative w-full max-w-md mx-auto px-4 mb-10">
        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          placeholder="Search snippets..."
          className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-300/10 text-white placeholder:text-gray-400 text-sm border border-fuchsia-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
        />
      </div>

      <div className="max-w-8xl mx-auto">
        {loading ? (
          // Loading State
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : content.length === 0 ? (
          // Empty State - No snippets at all
          <EmptyState />
        ) : filteredContent.length === 0 ? (
          // No Results State - Snippets exist but none match search
          <NoResultsState />
        ) : (
          // Snippets Grid
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredContent.map((item) => (
              <div
                key={item._id}
                className={`relative p-5 sm:p-6 rounded-xl bg-gradient-to-br ${getCategoryColor()} border backdrop-blur-sm hover:scale-[1.03] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(236,72,153,0.4)]`}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-mono mb-1 mt-5">{item.title}</h3>
                    <p className="text-gray-300 text-sm sm:text-base">{item.about}</p>
                  </div>
                  <span className="px-2 py-1 bg-fuchsia-900/70 font-bold text-white text-xs sm:text-xs rounded-lg font-mono whitespace-nowrap mt-5">
                    {item.category}
                  </span>
                </div>

                {/* Code Box */}
                <div className="bg-black/50 rounded-lg p-3 mb-4 border border-fuchsia-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-400 font-mono text-sm font-extrabold">$</span>
                    <button
                      onClick={() => handleCopy(item.code, item._id)}
                      className="p-1 rounded hover:bg-fuchsia-500/20 transition-colors"
                    >
                      {copiedId === item._id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <code className="text-white font-mono text-sm block break-words">{item.code}</code>
                </div>

                {/* Follow-up */}
                {item.followup && (
                  <div className="bg-black/30 rounded-lg p-3 mb-4 border border-fuchsia-500/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-yellow-400 font-mono text-sm font-bold">Follow-up:</span>
                      <button
                        onClick={() => handleCopy(item.followup, `${item._id}-followup`)}
                        className="p-1 rounded hover:bg-fuchsia-500/20 transition-colors"
                      >
                        {copiedId === `${item._id}-followup` ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <code className="text-gray-300 font-mono text-sm block break-words">{item.followup}</code>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full font-mono flex items-center"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Edit and Delete Buttons */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    className="p-1 rounded hover:bg-blue-500/20 transition-colors group"
                    onClick={() => handleEdit(item)}
                    title="Edit snippet"
                  >
                    <Edit className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-red-500/20 transition-colors group"
                    onClick={() => handleDelete(item._id)}
                    title="Delete snippet"
                  >
                    <Trash className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      {content.length > 0 && (
        <button
          onClick={handleAddSnippet}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white rounded-full shadow-2xl hover:from-fuchsia-600 hover:to-purple-600 transition-all duration-300 hover:scale-110 flex items-center justify-center z-40"
          title="Add new snippet"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      {/* Add/Edit Snippet Modal */}
      <AddSnippetModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSnippetAdded={handleSnippetAdded}
        onSnippetUpdated={handleSnippetUpdated}
        editingSnippet={editingSnippet}
      />
    </div>
  )
}
