import React, { useState } from 'react';
import { Terminal, Copy, Check, Plus, Search, Tag, Filter } from 'lucide-react';

const SnippetVault = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSnippet, setNewSnippet] = useState({
    title: '',
    description: '',
    category: 'React',
    tags: '',
    command: '',
    followUp: ''
  });

  // Sample snippet data
  const [snippets, setSnippets] = useState([
    {
      id: 1,
      title: "Install React App",
      description: "Create a new React application with Vite",
      category: "React",
      tags: ["react", "vite", "setup"],
      command: "npm create vite@latest my-react-app -- --template react",
      followUp: "cd my-react-app && npm install && npm run dev"
    },
    {
      id: 2,
      title: "Install Dependencies",
      description: "Install multiple npm packages at once",
      category: "NPM",
      tags: ["npm", "install", "dependencies"],
      command: "npm install express cors dotenv mongoose",
      followUp: "npm install -D nodemon concurrently"
    },
    {
      id: 3,
      title: "Check System Info",
      description: "Display detailed system information",
      category: "Linux",
      tags: ["linux", "system", "info"],
      command: "uname -a && lscpu && free -h",
      followUp: "df -h && lsblk"
    },
    {
      id: 4,
      title: "Git Setup",
      description: "Configure Git with user details",
      category: "Git",
      tags: ["git", "config", "setup"],
      command: "git config --global user.name \"Your Name\"",
      followUp: "git config --global user.email \"your.email@example.com\""
    },
    {
      id: 5,
      title: "Docker Container",
      description: "Run a container in detached mode",
      category: "Docker",
      tags: ["docker", "container", "run"],
      command: "docker run -d -p 3000:3000 --name myapp myapp:latest",
      followUp: "docker logs myapp"
    },
    {
      id: 6,
      title: "Process Management",
      description: "Find and kill process by port",
      category: "Linux",
      tags: ["linux", "process", "kill"],
      command: "lsof -ti:3000 | xargs kill -9",
      followUp: "ps aux | grep node"
    }
  ]);

  const categories = ['all', 'React', 'NPM', 'Linux', 'Git', 'Docker'];

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addSnippet = (e) => {
    e.preventDefault();
    if (newSnippet.title && newSnippet.command) {
      const snippet = {
        id: Date.now(),
        title: newSnippet.title,
        description: newSnippet.description,
        category: newSnippet.category,
        tags: newSnippet.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        command: newSnippet.command,
        followUp: newSnippet.followUp
      };
      setSnippets([snippet, ...snippets]);
      setNewSnippet({
        title: '',
        description: '',
        category: 'React',
        tags: '',
        command: '',
        followUp: ''
      });
      setShowAddForm(false);
    }
  };
    try {
       navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  

  const getCategoryColor = (category) => {
    const colors = {
      React: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
      NPM: 'from-red-500/20 to-pink-500/20 border-red-500/30',
      Linux: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
      Git: 'from-orange-500/20 to-amber-500/20 border-orange-500/30',
      Docker: 'from-purple-500/20 to-violet-500/20 border-purple-500/30'
    };
    return colors[category] || 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-50 p-4 sm:p-6 bg-gradient-to-r from-black/95 to-fuchsia-950/95 border-b border-fuchsia-500/40 backdrop-blur-xl shadow-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="relative">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wider font-mono relative z-10">
              <span className="bg-gradient-to-r from-white via-fuchsia-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                <Terminal className="inline w-8 h-8 mr-2" />
                SnippetVault
              </span>
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 rounded-lg blur-lg animate-pulse"></div>
          </div>
          
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="group relative px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-900/50 to-pink-900/50 border border-fuchsia-500/30 hover:border-fuchsia-400/60 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] backdrop-blur-sm overflow-hidden"
          >
            <Plus className="w-5 h-5 text-white" />
            <span className="ml-2 text-white font-mono text-sm">Add Snippet</span>
          </button>
        </div>
      </div>

      {/* Body with Grid Background */}
      <div className="relative min-h-screen bg-black p-6">
        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-fuchsia-400" />
              <input
                type="text"
                placeholder="Search snippets, commands, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-gray-900/50 to-black/50 border border-fuchsia-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-400/60 backdrop-blur-sm font-mono"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 w-5 h-5 text-fuchsia-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gradient-to-r from-gray-900/50 to-black/50 border border-fuchsia-500/30 rounded-xl text-white focus:outline-none focus:border-fuchsia-400/60 backdrop-blur-sm font-mono appearance-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-gray-900">
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Snippets Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSnippets.map(snippet => (
              <div
                key={snippet.id}
                className={`relative p-6 rounded-xl bg-gradient-to-br ${getCategoryColor(snippet.category)} border backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]`}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-mono mb-1">
                      {snippet.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {snippet.description}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-fuchsia-900/50 text-fuchsia-300 text-xs rounded-lg font-mono">
                    {snippet.category}
                  </span>
                </div>

                {/* Command Box */}
                <div className="bg-black/50 rounded-lg p-4 mb-4 border border-fuchsia-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-400 font-mono text-sm">$ </span>
                    <button
                      onClick={() => copyToClipboard(snippet.command, snippet.id)}
                      className="p-1 rounded hover:bg-fuchsia-500/20 transition-colors"
                    >
                      {copiedId === snippet.id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <code className="text-white font-mono text-sm block break-all">
                    {snippet.command}
                  </code>
                </div>

                {/* Follow-up Command */}
                {snippet.followUp && (
                  <div className="bg-black/30 rounded-lg p-3 mb-4 border border-fuchsia-500/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-yellow-400 font-mono text-xs">Follow-up:</span>
                      <button
                        onClick={() => copyToClipboard(snippet.followUp, `${snippet.id}-followup`)}
                        className="p-1 rounded hover:bg-fuchsia-500/20 transition-colors"
                      >
                        {copiedId === `${snippet.id}-followup` ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <code className="text-gray-300 font-mono text-xs block break-all">
                      {snippet.followUp}
                    </code>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {snippet.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full font-mono flex items-center"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(magenta 1px, transparent 1px),
              linear-gradient(90deg, hotpink 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>
    </div>
  );
}

export default SnippetVault;