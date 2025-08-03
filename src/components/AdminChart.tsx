import React from 'react';
import { BarChart3, PieChart } from 'lucide-react';

interface AdminChartProps {
  title: string;
  data: Record<string, number>;
  type: 'bar' | 'pie';
}

const AdminChart: React.FC<AdminChartProps> = ({ title, data, type }) => {
  const maxValue = Math.max(...Object.values(data));
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);

  const colors = [
    'bg-blue-500',
    'bg-green-500', 
    'bg-purple-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-indigo-500'
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center space-x-3 mb-6">
        {type === 'bar' ? (
          <BarChart3 className="h-5 w-5 text-gray-600" />
        ) : (
          <PieChart className="h-5 w-5 text-gray-600" />
        )}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>

      {type === 'bar' ? (
        <div className="space-y-4">
          {Object.entries(data).map(([key, value], index) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700 capitalize">{key}</span>
                <span className="text-gray-600">{value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-1000 ease-out`}
                  style={{ width: maxValue > 0 ? `${(value / maxValue) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Pie Chart Visualization */}
          <div className="relative">
            <div className="w-48 h-48 mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {Object.entries(data).map(([key, value], index) => {
                  const percentage = total > 0 ? (value / total) * 100 : 0;
                  const strokeDasharray = `${percentage} ${100 - percentage}`;
                  const strokeDashoffset = Object.entries(data)
                    .slice(0, index)
                    .reduce((sum, [, val]) => sum + (total > 0 ? (val / total) * 100 : 0), 0);
                  
                  return (
                    <circle
                      key={key}
                      cx="50"
                      cy="50"
                      r="15.915"
                      fill="transparent"
                      stroke={`rgb(${index === 0 ? '59 130 246' : index === 1 ? '34 197 94' : '168 85 247'})`}
                      strokeWidth="4"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={-strokeDashoffset}
                      className="transition-all duration-1000 ease-out"
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {Object.entries(data).map(([key, value], index) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`}></div>
                  <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {value} ({total > 0 ? ((value / total) * 100).toFixed(1) : 0}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminChart;