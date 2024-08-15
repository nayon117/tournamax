import { deleteTopic, getTopic, updateTopic } from '@/lib/actions/topic.action';
import { NextResponse } from 'next/server';

// get request to fetch a single topic
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const topic = await getTopic(params.id);
    if (!topic) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }
    return NextResponse.json(topic);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch topic' }, { status: 500 });
  }
}

// put request to update a topic
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const topicData = await request.json();
    const updatedTopic = await updateTopic(params.id, topicData);
    if (!updatedTopic) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }
    return NextResponse.json(updatedTopic);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update topic' }, { status: 500 });
  }
}

// delete request to delete a topic
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const success = await deleteTopic(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Topic deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete topic' }, { status: 500 });
  }
}