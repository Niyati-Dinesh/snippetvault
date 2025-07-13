//---------------------imports----------------------
import {
  Edit,
  Trash,
  Tag,
  Copy,
  Check,
  Search,
  Plus,
  Code2,
} from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance"; 
import AddSnippetModal from "./AddSnippetModel";
import { useSnippets } from "../context/SnippetContext";


export default function Cards() {

//----------------------declarations-----------------
  
  const {
    content,
    loading,
    fetchSnippets,
    addSnippet,
    updateSnippet,
    deleteSnippet,
    resetSnippets,
  } = useSnippets();
  const token = useSelector((state) => state.auth.token);
  const [copiedId, setCopiedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);

//--------------------functions-----------------------

//fetch snippets only if authToken exists
  useEffect(() => {
    if (token) {
      fetchSnippets();
    }
  }, [token]); 

//function to randomize color of snippets
  // Enhanced getCategoryColor function that matches your cyberpunk aesthetic
const getCategoryColor = () => {
  const colors = [
    // Cyberpunk Core Colors (matching your navbar theme)
    "from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/30",
    "from-pink-500/20 to-rose-500/20 border-pink-500/30",
    "from-purple-500/20 to-fuchsia-500/20 border-purple-500/30",
    "from-violet-500/20 to-purple-500/20 border-violet-500/30",
    
    // Neon Tech Colors
    "from-cyan-400/20 to-blue-500/20 border-cyan-400/30",
    "from-blue-500/20 to-indigo-500/20 border-blue-500/30",
    "from-teal-400/20 to-cyan-500/20 border-teal-400/30",
    "from-sky-400/20 to-blue-400/20 border-sky-400/30",
    
    // Electric/Energy Colors
    "from-green-400/20 to-emerald-500/20 border-green-400/30",
    "from-lime-400/20 to-green-500/20 border-lime-400/30",
    "from-emerald-400/20 to-teal-500/20 border-emerald-400/30",
    
    // Warm Neon Colors
    "from-orange-400/20 to-red-500/20 border-orange-400/30",
    "from-red-500/20 to-pink-600/20 border-red-500/30",
    "from-amber-400/20 to-orange-500/20 border-amber-400/30",
    "from-yellow-400/20 to-amber-500/20 border-yellow-400/30",
    
    // Dark/Mysterious Colors
    "from-slate-600/20 to-gray-700/20 border-slate-600/30",
    "from-zinc-600/20 to-slate-700/20 border-zinc-600/30",
    "from-indigo-600/20 to-purple-700/20 border-indigo-600/30",
    
    // Special Cyberpunk Combinations
    "from-fuchsia-600/20 to-cyan-500/20 border-fuchsia-600/30",
    "from-pink-600/20 to-blue-500/20 border-pink-600/30",
    "from-purple-600/20 to-teal-500/20 border-purple-600/30",
    "from-violet-600/20 to-green-500/20 border-violet-600/30",
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
};

  //function to handle copy
  const handleCopy = async (text, _id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(_id);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Clipboard error:", err);
      toast.error("Failed to copy");
    }
  };

  //function to handle editing of a snippet in backend
  const handleEdit = (snippet) => {
    setEditingSnippet(snippet);
    setIsModalOpen(true);
  };

  //function to handle deletion of a snippet in backend
  const handleDelete = async (id) => {
  try {
    const res = await axiosInstance.delete(`/manage/deletesnippet/${id}`);
    if (res.status === 200) {
      toast.success("Snippet deleted");
      deleteSnippet(id);
    }
  } catch (err) {
    console.error("Delete error:", err);
    toast.error("Delete failed");
  }
};

//function to handle closing of model
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingSnippet(null);
  };

//functions to handle snippets through context api
  const handleAddSnippet = () => {
    setEditingSnippet(null);
    setIsModalOpen(true);
  };
  const handleSnippetAdded = (newSnippet) => {
    addSnippet(newSnippet);
  };
  const handleSnippetUpdated = (updatedSnippet) => {
    updateSnippet(updatedSnippet);
  };

//function to filter the snippets
  const filteredContent = content.filter((item) => {
    const searchable = `${item.title} ${item.about} ${item.category} ${
      item.tags?.join(" ") || ""
    }`.toLowerCase();
    return searchable.includes(searchTerm);
  });

//function to show a message if no snippets available
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-fuchsia-500/30 animate-pulse">
          <Code2 className="w-12 h-12 text-fuchsia-400" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-fuchsia-500 to-purple-500 rounded-full flex items-center justify-center">
          <Plus className="w-4 h-4 text-white " />
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2 font-mono">
        No Snippets Yet
      </h3>
      <p className="text-gray-400 text-center mb-6 max-w-md font-mono">
        Start building your code snippet library! Add your first snippet to keep
        your favorite code organized and easily accessible.
      </p>
      <button
        onClick={handleAddSnippet}
        className="px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white font-mono font-bold rounded-lg hover:from-fuchsia-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Your First Snippet
      </button>
    </div>
  );

  // No results after search
  const NoResultsState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-16 h-16 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-full flex items-center justify-center border border-gray-500/30 mb-6">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2 font-mono">
        No Results Found
      </h3>
      <p className="text-gray-400 text-center font-mono">
        No snippets match "{searchTerm}". Try a different search term.
      </p>
    </div>
  );
//-----------------------rendering-------------------------------

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
            {filteredContent.map((item) => (
              <div
                key={item._id}
                className={`relative p-5 sm:p-6 rounded-xl bg-gradient-to-br ${getCategoryColor()} border backdrop-blur-sm hover:scale-[1.03] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(236,72,153,0.4)] cursor-pointer`}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-mono mb-1 mt-5">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      {item.about}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-fuchsia-900/70 font-bold text-white text-xs sm:text-xs rounded-lg font-mono whitespace-nowrap mt-5">
                    {item.category}
                  </span>
                </div>

                {/* Code Box */}
                <div className="bg-black/50 rounded-lg p-3 mb-4 border border-fuchsia-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-400 font-mono text-sm font-extrabold">
                      $
                    </span>
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
                  <code className="text-white font-mono text-sm block break-words">
                    {item.code}
                  </code>
                </div>

                {/* Follow-up */}
                {item.followup && (
                  <div className="bg-black/30 rounded-lg p-3 mb-4 border border-fuchsia-500/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-yellow-400 font-mono text-sm font-bold">
                        Follow-up:
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(item.followup, `${item._id}-followup`)
                        }
                        className="p-1 rounded hover:bg-fuchsia-500/20 transition-colors"
                      >
                        {copiedId === `${item._id}-followup` ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <code className="text-gray-300 font-mono text-sm block break-words">
                      {item.followup}
                    </code>
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
  );
}
