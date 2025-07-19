import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SubmissionsList from './SubmissionsList';

const { FiUser, FiLogOut, FiEye } = FiIcons;

const ViewerDashboard = ({ user, onLogout, submissions }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiEye} className="text-white text-sm" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">Viewer Portal</h1>
                  <p className="text-xs text-gray-500">Read-only access</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUser} className="text-gray-400 text-sm" />
                <span className="text-sm font-medium text-gray-700">{user.username}</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Viewer</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <SafeIcon icon={FiLogOut} className="text-sm" />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">All Submissions</h2>
            <p className="text-gray-600">Browse all submissions from members</p>
          </div>
          <SubmissionsList submissions={submissions} canEdit={false} />
        </motion.div>
      </main>
    </div>
  );
};

export default ViewerDashboard;