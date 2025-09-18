interface Strength {
  id: string;
  name: string;
  weight: number;
  recommendations: number;
}

interface StrengthAnalysisProps {
  strengths: Strength[];
  username?: string;
}

export default function StrengthAnalysis({ strengths, username }: StrengthAnalysisProps) {
  const hasRealData = strengths.length > 0 && strengths.some(s => s.weight > 0);
  
  const topSkills = strengths.sort((a, b) => b.weight - a.weight).slice(0, 5);
  const totalWeight = strengths.reduce((sum, skill) => sum + skill.weight, 0);
  const averageWeight = strengths.length > 0 ? totalWeight / strengths.length : 0;

  if (!hasRealData) {
    return (
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Skill Analysis</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-center">
            <div className="text-yellow-600 text-lg font-semibold mb-2">⚠️ Demo Data</div>
            <p className="text-yellow-700 text-sm">
              {username ? `${username}'s skill data is not available via the API.` : 'Skill data not available.'}
              This shows how the analysis would display with real data.
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">How This Would Work:</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Real skill proficiency percentages (0-100%)</p>
            <p>• Number of skill recommendations</p>
            <p>• Experience duration for each skill</p>
            <p>• Comparison to industry averages</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Skill Analysis</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{strengths.length}</div>
          <div className="text-sm text-blue-800">Total Skills</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{Math.round(averageWeight)}%</div>
          <div className="text-sm text-green-800">Avg Proficiency</div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900">Top Skills</h4>
        {topSkills.map((skill) => (
          <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-900">{skill.name}</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${skill.weight}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-blue-600">{skill.weight}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}