"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopicForm from "@/components/TopicForm";
import { Topic } from "@/types";
import Loader from "@/components/Loader";

export default function EditTopic({ params }: { params: { id: string } }) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchTopic();
  }, []);

  // fetchTopic function to get the topic data
  const fetchTopic = async () => {
    const response = await fetch(`/api/topics/${params.id}`);
    const data = await response.json();
    setTopic(data);
  };

  // handleSubmit function to update the topic
  const handleSubmit = async (topicData: {
    title: string;
    description: string;
  }) => {
    const response = await fetch(`/api/topics/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topicData),
    });

    if (response.ok) {
      router.push("/");
    } else {
      console.error("Failed to update topic");
    }
  };

  if (!topic) return <Loader />;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Topic</h1>
        <TopicForm initialTopic={topic} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
