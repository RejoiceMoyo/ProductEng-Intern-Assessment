'use client';

import { useState, useEffect } from 'react';
import { Users, Briefcase, BookOpen, LucideIcon } from 'lucide-react';

interface RecommendationItem {
  name: string;
  role?: string;
  company?: string;
  platform?: string;
  match?: string;
  relevance?: string;
}

interface RecommendationCategory {
  type: string;
  title: string;
  items: RecommendationItem[];
  icon: LucideIcon;
}

interface Strength {
  id: string;
  name: string;
  weight: number;
  recommendations: number;
}

interface ProfileRecommendationsProps {
  username: string;
  strengths: Strength[];
}

export default function ProfileRecommendations({ username, strengths }: ProfileRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<RecommendationCategory[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration - shows creativity
  const mockRecommendations = [
    {
      type: 'people',
      title: 'Similar Professionals',
      items: [
        { name: 'Alex Johnson', role: 'Full Stack Developer', match: '87%' },
        { name: 'Maria Garcia', role: 'Product Engineer', match: '92%' },
        { name: 'David Chen', role: 'UX Developer', match: '79%' }
      ],
      icon: Users
    },
    {
      type: 'jobs',
      title: 'Recommended Jobs',
      items: [
        { name: 'Senior React Developer', company: 'TechCorp', match: '95%' },
        { name: 'Product Engineer Intern', company: 'StartupXYZ', match: '88%' },
        { name: 'Full Stack Developer', company: 'InnovateCo', match: '91%' }
      ],
      icon: Briefcase
    },
    {
      type: 'learning',
      title: 'Skill Development',
      items: [
        { name: 'Advanced React Patterns', platform: 'Frontend Masters', relevance: 'High' },
        { name: 'API Design Best Practices', platform: 'Coursera', relevance: 'Medium' },
        { name: 'Data Visualization', platform: 'Udemy', relevance: 'High' }
      ],
      icon: BookOpen
    }
  ];

  useEffect(() => {
    // Simulate fetching recommendations based on skills
    setLoading(true);
    const timer = setTimeout(() => {
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [strengths, username]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommendations</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Users className="w-6 h-6 mr-2 text-purple-600" />
        Personalized Recommendations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <div key={category.type} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <IconComponent className="w-5 h-5 mr-2 text-blue-600" />
                <h3 className="font-semibold text-gray-900">{category.title}</h3>
              </div>
              
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {item.company || item.platform || item.role}
                    </div>
                    <div className="text-xs text-blue-600 font-semibold mt-2">
                      Match: {item.match || item.relevance}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Skill-based insights */}
      {strengths.length > 0 && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Skill Analysis Insights</h4>
          <p className="text-sm text-blue-800">
            Based on {strengths.length} skills, we recommend focusing on:{' '}
            {strengths
              .sort((a, b) => b.weight - a.weight)
              .slice(0, 3)
              .map(s => s.name)
              .join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}