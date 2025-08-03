import React, { useState, useMemo } from 'react';
import { DetectionResult, AdminStats } from '../types';
import { Download, AlertTriangle, CheckCircle, TrendingUp, Users, FileText, BarChart3 } from 'lucide-react';
import AdminChart from '../components/AdminChart';

interface AdminProps {
  detectionHistory: DetectionResult[];
}

const Admin: React.FC<AdminProps> = ({ detectionHistory }) => {
  const [filter, setFilter] = useState<'all' | 'toxic' | 'clean'>('all');

  const stats: AdminStats = useMemo(() => {
    const totalAnalyzed = detectionHistory.length;
    const toxicDetected = detectionHistory.filter(r => r.isToxic).length;
    const cleanMessages = totalAnalyzed - toxicDetected;
    
    const languageBreakdown = detectionHistory.reduce((acc, result) => {
      acc[result.language]++;
      return acc;
    }, { tamil: 0, hindi: 0, english: 0, mixed: 0 });

    const avgConfidence = totalAnalyzed > 0 
      ? detectionHistory.reduce((sum, r) => sum + r.confidence, 0) / totalAnalyzed 
      : 0;

    return {
      totalAnalyzed,
      toxicDetected,
      cleanMessages,
      languageBreakdown,
      avgConfidence
    };
  }, [detectionHistory]);

  const filteredResults = useMemo(() => {
    switch (filter) {
      case 'toxic': return detectionHistory.filter(r => r.isToxic);
      case 'clean': return detectionHistory.filter(r => !r.isToxic);
      default: return detectionHistory;
    }
  }, [detectionHistory, filter]);

  const exportCSV = () => {
    const csvContent = [
      ['ID', 'Text', 'Language', 'Is Toxic', 'Confidence', 'Categories', 'Timestamp'],
      ...filteredResults.map(result => [
        result.id,
        `"${result.text.replace(/"/g, '""')}"`,
        result.language,
        result.isToxic.toString(),
        result.confidence.toFixed(2),
        result.categories.join(';'),
        result.timestamp.toISOString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cybershield-${filter}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and analyze cyberbullying detection results</p>
        </div>
        <button
          onClick={exportCSV}
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Analyzed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalAnalyzed}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toxic Detected</p>
              <p className="text-2xl font-bold text-red-600">{stats.toxicDetected}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clean Messages</p>
              <p className="text-2xl font-bold text-green-600">{stats.cleanMessages}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
              <p className="text-2xl font-bold text-purple-600">{(stats.avgConfidence * 100).toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminChart 
          title="Language Distribution"
          data={stats.languageBreakdown}
          type="bar"
        />
        <AdminChart 
          title="Detection Results"
          data={{ toxic: stats.toxicDetected, clean: stats.cleanMessages }}
          type="pie"
        />
      </div>

      {/* Filters and Results Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
            <h2 className="text-xl font-semibold text-gray-900">Detection History</h2>
            <div className="flex space-x-2">
              {(['all', 'toxic', 'clean'] as const).map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    filter === filterType
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredResults.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Text</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredResults.slice(0, 50).map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{result.text}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {result.language}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        result.isToxic 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {result.isToxic ? 'Toxic' : 'Clean'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {(result.confidence * 100).toFixed(1)}%
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {result.categories.map((category, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {category}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(result.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No detection results found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;