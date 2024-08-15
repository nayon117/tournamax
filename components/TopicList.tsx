'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Topic } from '@/types';
import Image from 'next/image';
import { toast } from 'react-hot-toast'; // Import toast

const TopicList: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await fetch('/api/topics');
      if (!response.ok) throw new Error('Failed to fetch topics');
      const data = await response.json();
      setTopics(data);
    } catch (error) {
      toast.error('Failed to load topics');
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this topic?');
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/topics/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete topic');

      // Update the topic list after deletion
      fetchTopics();
      toast.success('Topic deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete the topic');
    }
  };

  return (
    <div className="grid gap-4">
      {topics.length === 0 ? (
        <div className="border p-4 rounded bg-gray-200 text-gray-700">
          You haven&apos;t added any topics
        </div>
      ) : (
        topics.map((topic) => (
          <div key={topic._id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{topic.title}</h2>
              <p>{topic.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/editTopic/${topic._id}`} className="text-blue-500 mr-2">
                <Image src="/edit.svg" width={20} height={20} alt="Edit" />
              </Link>
              <button onClick={() => handleDelete(topic._id)} className="text-red-500">
                <Image src="/delete.svg" width={16} height={16} alt="Delete" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TopicList;
