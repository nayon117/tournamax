'use server';

import { Topic as TopicType } from '@/types';
import { connectToDatabase } from '../mongoose';
import topicModel from '../models/topic.model';

// get all topics
export async function getTopics(): Promise<TopicType[]> {
  await connectToDatabase();
  const topics = await topicModel.find({});
  return topics;
}

// get a single topic
export async function getTopic(id: string): Promise<TopicType | null> {
  await connectToDatabase();
  const topic = await topicModel.findById(id);
  return topic;
}

// create a new topic
export async function createTopic(topicData: Omit<TopicType, '_id'>): Promise<TopicType> {
  await connectToDatabase();
  const newTopic = new topicModel(topicData);
  await newTopic.save();
  return newTopic;
}

// update a topic
export async function updateTopic(id: string, topicData: Partial<TopicType>): Promise<TopicType | null> {
  await connectToDatabase();
  const updatedTopic = await topicModel.findByIdAndUpdate(
    id,
    topicData,
    { new: true }
  );
  return updatedTopic;
}

// delete a topic
export async function deleteTopic(id: string): Promise<boolean> {
  await connectToDatabase();
  const result = await topicModel.findByIdAndDelete(id);
  return !!result;
}