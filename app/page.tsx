import TopicList from "@/components/TopicList";
import dynamic from "next/dynamic";
import Link from "next/link";
const CustomMap = dynamic(() => import("@/components/CustomMap"), { ssr: false });

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <header className="max-w-3xl mx-auto flex justify-between items-center mb-4 bg-black text-white p-4 rounded-md">
        <h1 className="text-2xl font-bold">Tournamax</h1>
        <Link
          href="/addTopic"
          className="bg-white text-black px-4 py-2 rounded"
        >
          Add Topic
        </Link>
      </header>
     <div className="max-w-3xl mx-auto">
     <TopicList />
     </div>

      <div className="mt-16">
        <CustomMap />
      </div>
    </div>
  );
}
