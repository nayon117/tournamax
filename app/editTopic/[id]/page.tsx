import TopicForm from '@/components/TopicForm';
import { getTopic, updateTopic } from '@/lib/actions/topic.action';
import { Topic } from '@/types';
import { redirect } from 'next/navigation';

export default async function EditTopic({ params }: { params: { id: string } }) {
  const topic = await getTopic(params.id);

  if (!topic) {
    return <div>Topic not found</div>;
  }

  async function editTopic(updatedTopic: Omit<Topic, '_id'>) {
    'use server';
    await updateTopic(params.id, updatedTopic);
    redirect('/');
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Topic</h1>
      <TopicForm initialTopic={topic} onSubmit={editTopic} />
    </div>
  );
}