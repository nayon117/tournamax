import CustomMap from "@/components/CustomMap";
import TopicList from "@/components/TopicList";
import { deleteTopic, getTopics } from "@/lib/actions/topic.action";
import Link from "next/link";

export default async function Home() {
  const topics = await getTopics();

  async function handleDelete(id: string) {
    "use server";
    await deleteTopic(id);
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tournamax</h1>
        <Link
          href="/addTopic"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Topic
        </Link>
      </header>
      <TopicList topics={topics} onDelete={handleDelete} />

      <div className="mt-16">
        <CustomMap />
      </div>
    </div>
  );
}
