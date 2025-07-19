import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SubmissionForm from './SubmissionForm';
import SubmissionsList from './SubmissionsList';

const { FiUser, FiLogOut, FiPlus, FiList, FiEdit3 } = FiIcons;

const MemberDashboard = ({ user, onLogout, onSubmit, submissions }) => {
  const [activeTab, setActiveTab] = useState('submissions');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiEdit3} className="text-white text-sm" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">Member Portal</h1>
                  <p className="text-xs text-gray-500">Full access dashboard</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUser} className="text-gray-400 text-sm" />
                <span className="text-sm font-medium text-gray-700">{user.username}</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Member</span>
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

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <motion.button
              whileHover={{ y: -1 }}
              onClick={() => setActiveTab('submissions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'submissions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiList} className="text-sm" />
                <span>View Submissions</span>
              </div>
            </motion.button>
            <motion.button
              whileHover={{ y: -1 }}
              onClick={() => setActiveTab('create')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'create'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiPlus} className="text-sm" />
                <span>New Submission</span>
              </div>
            </motion.button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'submissions' && (
            <SubmissionsList submissions={submissions} canEdit={true} />
          )}
          {activeTab === 'create' && (
            <SubmissionForm onSubmit={onSubmit} />
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default MemberDashboard;