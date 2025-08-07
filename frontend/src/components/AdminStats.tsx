import React, { useState } from 'react';
import { trpc } from '../utils/trpc';

export const AdminStats: React.FC = () => {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  const { data: analytics, refetch, isLoading, error } = trpc.analytics.getStats.useQuery(
    {
      adminKey,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    },
    {
      enabled: isAuthenticated,
      retry: false,
    }
  );

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    refetch();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Analytics</h1>
          <form onSubmit={handleAuth}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Key
              </label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Access Analytics
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">Invalid admin key or error accessing analytics.</p>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Website usage statistics and conversion funnel</p>
        </div>

        {/* Date Range Controls */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Date Range</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => refetch()}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : analytics ? (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Visits</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.summary.totalVisits}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Unique Visitors</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.summary.uniqueVisitors}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Main Page Visits</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.summary.mainPageVisits}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Button Clicks</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.summary.buttonClicks}</p>
              </div>
            </div>

            {/* Conversion Funnel */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Conversion Funnel</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Main Page Visits</h3>
                    <p className="text-sm text-gray-600">Users who visited the landing page</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{analytics.summary.mainPageVisits}</span>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                      ↓
                    </div>
                    <span className="text-sm text-gray-600">{analytics.conversions.mainPageToButton}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Button Clicks</h3>
                    <p className="text-sm text-gray-600">Users who clicked "Kom igång nu"</p>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{analytics.summary.buttonClicks}</span>
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                      ↓
                    </div>
                    <span className="text-sm text-gray-600">{analytics.conversions.buttonToFormStart}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Form Starts</h3>
                    <p className="text-sm text-gray-600">Users who started the tax form</p>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">{analytics.summary.taxFormStarts}</span>
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                      ↓
                    </div>
                    <span className="text-sm text-gray-600">{analytics.conversions.formStartToComplete}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Form Completions</h3>
                    <p className="text-sm text-gray-600">Users who completed the tax form</p>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">{analytics.summary.taxFormCompletes}</span>
                </div>
              </div>
            </div>

            {/* Popular Pages */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Popular Pages</h2>
              <div className="space-y-3">
                {analytics.summary.pageViews.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{page.page}</span>
                    <span className="text-gray-600">{page.views} visits</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Visits</h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {analytics.recentActivity.visits.map((visit, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-900">{visit.pagePath}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(visit.timestamp).toLocaleString('sv-SE')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Events</h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {analytics.recentActivity.events.map((event, index) => (
                    <div key={index} className="py-2 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">
                          {event.eventType.replace('_', ' ')}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(event.timestamp).toLocaleString('sv-SE')}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {event.pagePath} • {event.eventCategory}
                        {event.eventData?.buttonId && (
                          <span className="ml-2 text-blue-600">({event.eventData.buttonId})</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};