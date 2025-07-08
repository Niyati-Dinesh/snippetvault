import { Tag, Copy, Check, Search } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Cards() {
  const [copiedId, setCopiedId] = useState(null);
  const search = <Search />;
  const content = [
    {
      id: 1,
      title: "Install React App",
      about: "Create a new React application with Vite",
      category: "React",
      tags: ["react", "vite", "setup"],
      code: "npm create vite@latest my-react-app -- --template react",
      followup: "cd my-react-app && npm install && npm run dev",
    },
    {
      id: 2,
      title: "Install Dependencies",
      about: "Install multiple npm packages at once",
      category: "NPM",
      tags: ["npm", "install", "dependencies"],
      code: "npm install express cors dotenv mongoose",
      followup: "npm install -D nodemon concurrently",
    },
    {
      id: 3,
      title: "Check System Info",
      about: "Display detailed system information",
      category: "Linux",
      tags: ["linux", "system", "info"],
      code: "uname -a && lscpu && free -h",
      followup: "df -h && lsblk",
    },
    {
      id: 4,
      title: "Git Setup",
      about: "Configure Git with user details",
      category: "Git",
      tags: ["git", "config", "setup"],
      code: 'git config --global user.name "Your Name"',
      followup: 'git config --global user.email "your.email@example.com"',
    },
    {
      id: 5,
      title: "Docker Container",
      about: "Run a container in detached mode",
      category: "Docker",
      tags: ["docker", "container", "run"],
      code: "docker run -d -p 3000:3000 --name myapp myapp:latest",
      followup: "docker logs myapp",
    },
    {
      id: 6,
      title: "Process Management",
      about: "Find and kill process by port",
      category: "Linux",
      tags: ["linux", "process", "kill"],
      code: "lsof -ti:3000 | xargs kill -9",
      followup: "ps aux | grep node",
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      React: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
      NPM: "from-red-500/20 to-pink-500/20 border-red-500/30",
      Linux: "from-green-500/20 to-emerald-500/20 border-green-500/30",
      Git: "from-orange-500/20 to-amber-500/20 border-orange-500/30",
      Docker: "from-purple-500/20 to-violet-500/20 border-purple-500/30",
    };
    return (
      colors[category] || "from-gray-500/20 to-gray-600/20 border-gray-500/30"
    );
  };

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      toast.success("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  //HANDLE SEARCH

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-black px-4 sm:px-6 lg:px-8 py-10 font-mono">
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {content
            .filter((item) => {
              const searchable = `${item.title} ${item.about} ${
                item.category
              } ${item.tags.join(" ")}`.toLowerCase();
              return searchable.includes(searchTerm);
            })
            .map((item) => (
              <div
                key={item.id}
                className={`relative p-5 sm:p-6 rounded-xl bg-gradient-to-br ${getCategoryColor(
                  item.category
                )} border backdrop-blur-sm hover:scale-[1.03] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(236,72,153,0.4)]`}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-mono mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      {item.about}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-fuchsia-900/70 font-bold text-black  sm:text-xs rounded-lg font-mono whitespace-nowrap">
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
                      onClick={() => handleCopy(item.code, item.id)}
                      className="p-1 rounded hover:bg-fuchsia-500/20 transition-colors"
                    >
                      {copiedId === item.id ? (
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
                      <span className="text-yellow-400 font-mono text-sm font-bold ">
                        Follow-up:
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(item.followup, `${item.id}-followup`)
                        }
                        className="p-1 rounded hover:bg-fuchsia-500/20 transition-colors"
                      >
                        {copiedId === `${item.id}-followup` ? (
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
                <div className="flex flex-wrap gap-2 ">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
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
    </div>
  );
}
