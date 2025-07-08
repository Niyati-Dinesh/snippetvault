import { Code, Terminal, Zap, Search, Clock, Shield , MousePointerClick } from "lucide-react"

export default function IntroSection() {
  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Main Hero Content */}
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Hero Heading */}
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            <span className="bg-gradient-to-r from-white via-fuchsia-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
              Your Digital
            </span>
            <br />
            <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(251,0,255,0.8)]">
              Code Arsenal
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Stop wasting time searching for that perfect command or code snippet. Store, organize, and access your
            most-used code fragments instantly.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Code Snippets */}
          <div className="group relative p-6 rounded-xl bg-gradient-to-br from-fuchsia-900/20 to-pink-900/20 border border-fuchsia-500/30 hover:border-fuchsia-400/60 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <Code className="w-8 h-8 text-fuchsia-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">Code Snippets</h3>
              <p className="text-gray-400 text-sm">
                Save your favorite functions, algorithms, and code blocks for instant reuse
              </p>
            </div>
          </div>

          {/* Terminal Commands */}
          <div className="group relative p-6 rounded-xl bg-gradient-to-br from-fuchsia-900/20 to-pink-900/20 border border-fuchsia-500/30 hover:border-fuchsia-400/60 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <Terminal className="w-8 h-8 text-fuchsia-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">Terminal Commands</h3>
              <p className="text-gray-400 text-sm">
                Store complex Linux commands, Docker scripts, and terminal shortcuts
              </p>
            </div>
          </div>

          {/* Quick Access */}
          <div className="group relative p-6 rounded-xl bg-gradient-to-br from-fuchsia-900/20 to-pink-900/20 border border-fuchsia-500/30 hover:border-fuchsia-400/60 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <Zap className="w-8 h-8 text-fuchsia-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">Instant Access</h3>
              <p className="text-gray-400 text-sm">Find what you need in seconds with powerful search and tagging</p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 space-y-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Why SnippetVault?
            </span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            <div className="flex items-start space-x-3 p-4 rounded-lg bg-black/30 border border-fuchsia-500/20">
              <Search className="w-5 h-5 text-fuchsia-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium">Smart Search</h4>
                <p className="text-gray-400 text-sm">Find snippets by language, tags, or content</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg bg-black/30 border border-fuchsia-500/20">
              <Clock className="w-5 h-5 text-fuchsia-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium">Save Time</h4>
                <p className="text-gray-400 text-sm">No more googling the same commands</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg bg-black/30 border border-fuchsia-500/20">
              <Shield className="w-5 h-5 text-fuchsia-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium">Secure Storage</h4>
                <p className="text-gray-400 text-sm">Your snippets are safe and always accessible</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 space-y-7">
          <p className="text-lg text-gray-300">Ready to supercharge your development workflow?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="px-6 py-3 rounded-lg bg-gradient-to-r from-fuchsia-600/20 to-pink-600/20 border border-fuchsia-500/40">
            
              <span className="text-fuchsia-300 font-small"> <MousePointerClick className="w-5 h-5 text-white flex-shrink-0"/>Sign up or Sign in to get started</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
      <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-fuchsia-300 rounded-full animate-pulse opacity-50 delay-500"></div>
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-pink-300 rounded-full animate-pulse opacity-30 delay-700"></div>
    </div>
  )
}
