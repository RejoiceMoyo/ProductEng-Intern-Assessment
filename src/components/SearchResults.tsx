import Link from 'next/link';
import { Users, ArrowRight } from 'lucide-react';
import { Person } from '@/types';

interface SearchResultsProps {
  results: Person[];
  isLoading?: boolean;
}

export default function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="p-6 bg-white/5 border border-white/10">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-purple-500/10" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-purple-500/10 rounded w-3/4" />
                  <div className="h-3 bg-purple-500/10 rounded w-1/2" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 mb-4">
          <Users className="w-8 h-8 text-purple-300" />
        </div>
        <div className="text-white/90 text-xl font-semibold">No results found</div>
        <p className="text-purple-200/60 mt-2">Try different keywords or broaden your search</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {results.map((person) => (
        <Link
          key={person.id}
          href={`/profile/${person.username}`}
          className="group block p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 
            hover:border-purple-500/30 transition-all duration-500 
            hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1"
        >
          <div className="flex items-center space-x-4">
            {person.picture ? (
              <img
                src={person.picture}
                alt={person.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-400/30 
                  group-hover:ring-purple-400/60 transition-all"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 
                flex items-center justify-center ring-2 ring-purple-400/30">
                <Users className="w-8 h-8 text-white" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 
                transition-colors truncate">
                {person.name}
              </h3>
              {person.professionalHeadline && (
                <p className="text-purple-200/80 text-sm truncate">
                  {person.professionalHeadline}
                </p>
              )}
              <div className="flex items-center justify-between mt-4 text-purple-300/80">
                <span className="text-sm">@{person.username}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}