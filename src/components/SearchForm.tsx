'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="w-5 h-5 text-purple-300 group-hover:text-purple-400 transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for professionals by name, skills, or role..."
          className="w-full pl-12 pr-36 py-4 text-lg bg-white/5 backdrop-blur-sm text-white 
            placeholder:text-purple-300/50 border border-white/10 rounded-2xl
            focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/30 
            hover:border-purple-500/20 transition-all duration-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600
            text-white rounded-xl hover:from-purple-500 hover:to-blue-500
            focus:ring-2 focus:ring-purple-500/30 disabled:opacity-50 
            disabled:cursor-not-allowed transition-all duration-300
            hover:shadow-lg hover:shadow-purple-500/20"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </span>
          ) : 'Search'}
        </button>
      </div>
    </form>
  );
}