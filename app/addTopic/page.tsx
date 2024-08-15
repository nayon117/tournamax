'use client';

import { useRouter } from 'next/navigation';
import TopicForm from '@/components/TopicForm';

export default function AddTopic() {
  const router = useRouter();

  // handleSubmit function to add a new topic
  const handleSubmit = async (topicData: { title: string; description: string }) => {
    const response = await fetch('/api/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(topicData),
    });

    if (response.ok) {
      router.push('/');
    } else {
      console.error('Failed to add topic');
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
     <div className='max-w-3xl mx-auto'>
     <h1 className="text-2xl  font-bold mb-4">Add Topic</h1>
     <TopicForm onSubmit={handleSubmit} />
     </div>
    </div>
  );
}