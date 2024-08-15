'use client';

import React from 'react';
import Link from 'next/link';
import { Topic } from '@/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Define the props for the TopicList
interface TopicListProps {
  topics: Topic[];
  onDelete: (id: string) => Promise<void>;
}

const TopicList: React.FC<TopicListProps> = ({ topics, onDelete }) => {
  const router = useRouter();

  // Handle the delete action
  const handleDelete = async (id: string) => {
    await onDelete(id);
    router.refresh(); // This will trigger a refresh of the server components
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
            <div className='flex items-center gap-4'>
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
