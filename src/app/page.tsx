'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Users, TrendingUp, Sparkles, ArrowRight, Globe, Target } from 'lucide-react';
import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';
import { Person } from '@/types';

export default function Home() {
  const [results, setResults] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProfiles, setFeaturedProfiles] = useState<Person[]>([]);

  useEffect(() => {
    // Load some featured profiles on initial load
    const loadFeatured = async () => {
      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: 'developer' }),
        });

        if (response.ok) {
          const data = await response.json();
          setFeaturedProfiles(data.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to load featured profiles:', error);
      }
    };

    loadFeatured();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setSearchQuery(query);
    setResults([]); // Clear previous results
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Search failed with status: ${response.status}`);
      }

      const data = await response.json();
      
      if (Array.isArray(data)) {
        setResults(data);
      } else {
        console.error('Invalid response format:', data);
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0118] overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-teal-500/10" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.1) 0%, rgba(30, 58, 138, 0.05) 25%, transparent 50%)',
        backgroundSize: '100% 100%'
      }} />

      {/* Navigation */}
      <nav className="relative z-10 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                TalentExplorer
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-purple-200/80 text-sm">Powered by Torre.ai</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-20 pb-32">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-yellow-300 mr-2 animate-pulse" />
            <span className="text-sm text-white/90">Discover World-Class Talent</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Connect with
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Exceptional Minds
            </span>
          </h1>
          
          <p className="text-xl text-purple-100/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Explore a curated network of top professionals, analyze their expertise, 
            and find the perfect talent for your next breakthrough.
          </p>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-12 transform hover:scale-[1.02] transition-all duration-300">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
                  Results for "{searchQuery}"
                </h2>
                <p className="text-purple-200/80">
                  {results.length} professionals found
                </p>
              </div>
              <SearchResults results={results} isLoading={isLoading} />
            </div>
          )}

          {/* Stats - Only show when not searching */}
          {!searchQuery && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Users, color: 'blue', count: '10K+', label: 'Professionals' },
                { icon: Globe, color: 'teal', count: '150+', label: 'Countries' },
                { icon: TrendingUp, color: 'purple', count: '50K+', label: 'Skills Mapped' }
              ].map((stat, i) => (
                <div key={i} 
                  className="group p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.08] backdrop-blur-sm border border-white/10 
                  hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
                  <stat.icon className={`w-12 h-12 text-${stat.color}-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`} />
                  <div className="text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {stat.count}
                  </div>
                  <div className="text-purple-200/80">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Profiles */}
      {featuredProfiles.length > 0 && !searchQuery && (
        <section className="relative z-10 container mx-auto px-6 py-32 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
              Featured Talent
            </h2>
            <p className="text-purple-200/80">Discover exceptional professionals in our network</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProfiles.map((person) => (
              <Link
                key={person.id}
                href={`/profile/${person.username}`}
                className="block group"
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.08] backdrop-blur-sm 
                  border border-white/10 hover:border-purple-500/30 transition-all duration-500 
                  hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1">
                  <div className="flex items-center space-x-4 mb-6">
                    {person.picture ? (
                      <img
                        src={person.picture}
                        alt={person.name}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-400/30 group-hover:ring-purple-400/60 transition-all"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center ring-2 ring-purple-400/30">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {person.name}
                      </h3>
                      {person.professionalHeadline && (
                        <p className="text-purple-200/80 text-sm">{person.professionalHeadline}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-purple-300/80">
                    <span className="text-sm">@{person.username}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}



      {/* Features Section */}
      {!searchQuery && (
        <section className="relative z-10 container mx-auto px-6 py-32 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
              Why Choose TalentExplorer?
            </h2>
            <p className="text-purple-200/80">Advanced capabilities for modern talent discovery</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                gradient: 'from-blue-600 to-blue-400',
                title: 'Smart Search',
                description: 'Advanced algorithms to find the perfect match based on skills and compatibility.'
              },
              {
                icon: TrendingUp,
                gradient: 'from-purple-600 to-purple-400',
                title: 'Skill Analytics',
                description: 'Interactive visualization of skills with detailed proficiency analysis.'
              },
              {
                icon: Sparkles,
                gradient: 'from-teal-600 to-teal-400',
                title: 'AI Insights',
                description: 'Get personalized recommendations powered by machine learning.'
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.08] backdrop-blur-sm 
                border border-white/10 hover:border-white/20 transition-all duration-500 
                hover:shadow-2xl hover:shadow-purple-500/10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-0.5 mb-8 mx-auto
                  group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-2xl bg-[#0A0118]/90 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-purple-200/80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 mt-20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-purple-200/80">
              Built with ❤️ by Rejoice for the Torre Product Engineer Intern assessment
            </p>
            <p className="text-purple-300/60 text-sm mt-2">
              Showcasing modern React, Next.js, and full-stack development expertise
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}