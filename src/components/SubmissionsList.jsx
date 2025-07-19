import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiFileText, FiUser, FiClock, FiTag, FiMessageSquare } = FiIcons;

const SubmissionsList = ({ submissions, canEdit }) => {
  if (submissions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <SafeIcon icon={FiFileText} className="text-6xl text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-500 mb-2">No submissions yet</h3>
        <p className="text-gray-400">
          {canEdit ? 'Create your first submission to get started!' : 'Check back later for new submissions.'}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Submissions ({submissions.length})
        </h2>
      </div>

      <div className="grid gap-6">
        {submissions.map((submission, index) => (
          <motion.div
            key={submission.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{submission.title}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {submission.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{submission.description}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700 whitespace-pre-wrap">{submission.content}</p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiUser} className="text-xs" />
                  <span>{submission.submittedBy}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiClock} className="text-xs" />
                  <span>{format(new Date(submission.submittedAt), 'MMM d, yyyy at h:mm a')}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiTag} className="text-xs" />
                <span>{submission.category}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionsList;