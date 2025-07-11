"use client"

import { useState, useEffect } from "react"
import { X, Plus, Tag, Code2, FileText, Folder, Hash, Edit } from "lucide-react"
import toast from "react-hot-toast"
import axiosPost from "../api/axiosInstance"

export default function AddSnippetModal({ isOpen, onClose, onSnippetAdded, onSnippetUpdated, editingSnippet = null }) {
  const [formData, setFormData] = useState({
    title: "",
    about: "",
    category: "",
    tags: "",
    code: "",
    followup: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "CSS",
    "HTML",
    "TypeScript",
    "SQL",
    "Git",
    "Docker",
    "API",
    "Utils",
    "Other",
  ]

  const isEditMode = editingSnippet !== null

  // Populate form when editing
  useEffect(() => {
    if (editingSnippet) {
      setFormData({
        title: editingSnippet.title || "",
        about: editingSnippet.about || "",
        category: editingSnippet.category || "",
        tags: editingSnippet.tags ? editingSnippet.tags.join(", ") : "",
        code: editingSnippet.code || "",
        followup: editingSnippet.followup || "",
      })
    } else {
      // Reset form for add mode
      setFormData({
        title: "",
        about: "",
        category: "",
        tags: "",
        code: "",
        followup: "",
      })
    }
  }, [editingSnippet, isOpen])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast.error("Title is required!")
      return
    }

    if (!formData.code.trim()) {
      toast.error("Code is required!")
      return
    }

    setIsSubmitting(true)

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      const payload = {
        title: formData.title.trim(),
        about: formData.about.trim(),
        category: formData.category || "Other",
        tags: tagsArray,
        code: formData.code.trim(),
        followup: formData.followup.trim(),
      }

      let response

      if (isEditMode) {
        // Update existing snippet
        response = await axiosPost.put(`/manage/updatesnippet/${editingSnippet._id}`, payload)
        if (response.status === 200) {
          toast.success("Snippet updated successfully! ✨")
          onSnippetUpdated(response.data.snippet)
          handleClose()
        }
      } else {
        // Create new snippet
        response = await axiosPost.post("/manage/createsnippet", payload)
        if (response.status === 200) {
          toast.success("Snippet created successfully! 🎉")
          onSnippetAdded(response.data.snippet)
          handleClose()
        }
      }
    } catch (error) {
      console.error(`Error ${isEditMode ? "updating" : "creating"} snippet:`, error)
      toast.error(`Failed to ${isEditMode ? "update" : "create"} snippet ❌`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      title: "",
      about: "",
      category: "",
      tags: "",
      code: "",
      followup: "",
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black border border-fuchsia-500/30 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-fuchsia-900/50 to-purple-900/50 backdrop-blur-md border-b border-fuchsia-500/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 bg-gradient-to-br ${isEditMode ? "from-blue-500 to-cyan-500" : "from-fuchsia-500 to-purple-500"} rounded-lg flex items-center justify-center`}
              >
                {isEditMode ? <Edit className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white font-mono">
                  {isEditMode ? "Edit Snippet" : "Add New Snippet"}
                </h2>
                <p className="text-gray-400 text-sm font-mono">
                  {isEditMode ? "Update your code snippet" : "Create a new code snippet"}
                </p>
              </div>
            </div>
            <button onClick={handleClose} className="p-2 rounded-lg hover:bg-fuchsia-500/20 transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-white mb-2 font-mono">
              <FileText className="w-4 h-4 text-fuchsia-400" />
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., React useEffect Hook"
              className="w-full px-4 py-3 bg-black/50 border border-fuchsia-500/30 rounded-lg text-white placeholder:text-gray-500 font-mono focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
              required
            />
          </div>

          {/* About */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-white mb-2 font-mono">
              <Hash className="w-4 h-4 text-fuchsia-400" />
              Description
            </label>
            <input
              type="text"
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              placeholder="Brief description of what this snippet does"
              className="w-full px-4 py-3 bg-black/50 border border-fuchsia-500/30 rounded-lg text-white placeholder:text-gray-500 font-mono focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            />
          </div>

          {/* Category */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-white mb-2 font-mono">
              <Folder className="w-4 h-4 text-fuchsia-400" />
              Category
            </label>
            <input
              type="text"
              placeholder="Enter category (e.g., JavaScript, React, Python)"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-black/50 border border-fuchsia-500/30 rounded-lg text-white font-mono placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-white mb-2 font-mono">
              <Tag className="w-4 h-4 text-fuchsia-400" />
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="react, hooks, useEffect (comma separated)"
              className="w-full px-4 py-3 bg-black/50 border border-fuchsia-500/30 rounded-lg text-white placeholder:text-gray-500 font-mono focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1 font-mono">Separate tags with commas</p>
          </div>

          {/* Code */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-white mb-2 font-mono">
              <Code2 className="w-4 h-4 text-fuchsia-400" />
              Code *
            </label>
            <textarea
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              placeholder="Enter your code snippet here..."
              rows={8}
              className="w-full px-4 py-3 bg-black/50 border border-fuchsia-500/30 rounded-lg text-white placeholder:text-gray-500 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent resize-none"
              
            />
          </div>

          {/* Follow-up */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-white mb-2 font-mono">
              <Code2 className="w-4 h-4 text-yellow-400" />
              Follow-up Code
            </label>
            <textarea
              name="followup"
              value={formData.followup}
              onChange={handleInputChange}
              placeholder="Optional follow-up code or usage example..."
              rows={4}
              className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder:text-gray-500 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 bg-gray-700/50 text-gray-300 font-mono font-bold rounded-lg hover:bg-gray-600/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-6 py-3 bg-gradient-to-r ${isEditMode ? "from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600" : "from-fuchsia-500 to-purple-500 hover:from-fuchsia-600 hover:to-purple-600"} text-white font-mono font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  {isEditMode ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {isEditMode ? "Update Snippet" : "Create Snippet"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
