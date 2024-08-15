'use client';

import React, { useState } from 'react';
import { Topic } from '@/types';
import toast from 'react-hot-toast';

// Define the props for the TopicForm 
interface TopicFormProps {
  initialTopic?: Topic;
  onSubmit: (topic: Omit<Topic, '_id'>) => void;
}

const TopicForm: React.FC<TopicFormProps> = ({ initialTopic, onSubmit }) => {
  const [title, setTitle] = useState(initialTopic?.title || '');
  const [description, setDescription] = useState(initialTopic?.description || '');

  // Handle the form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description });
    if (initialTopic) {
      toast.success('Topic updated successfully!');
    } else {
      toast.success('Topic added successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Topic Title"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Topic Description"
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {initialTopic ? 'Update Topic' : 'Add Topic'}
      </button>
    </form>
  );
};

export default TopicForm;