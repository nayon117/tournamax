import TopicForm from '@/components/TopicForm';
import { createTopic } from '@/lib/actions/topic.action';
import { Topic } from '@/types';
import { redirect } from 'next/navigation';

export default function AddTopic() {
  async function addTopic(topic: Omit<Topic, '_id'>) {
    'use server';
    await createTopic(topic);
    redirect('/');
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Topic</h1>
      <TopicForm onSubmit={addTopic} />
    </div>
  );
}