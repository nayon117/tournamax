import { createTopic, getTopics } from '@/lib/actions/topic.action';
import { NextResponse } from 'next/server';

// get request to fetch all topics
export async function GET() {
  try {
    const topics = await getTopics();
    return NextResponse.json(topics);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 });
  }
}

//  post request to create a new topic
export async function POST(request: Request) {
  try {
    const topicData = await request.json();
    const newTopic = await createTopic(topicData);
    return NextResponse.json(newTopic, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create topic' }, { status: 500 });
  }
}