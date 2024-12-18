// components/Feed.tsx
"use client";

export default function UserMainFeed() {
  return (
    <main className="flex justify-center items-center  h-full w-full ">
      <div className="flex flex-col h-full w-11/12 mt-5">
        {/* Stories Section */}
        <section className="bg-white shadow-md rounded-md p-2 mb-4">
          <h2 className="text-lg font-bold mb-4">Stories</h2>
          {/* Stories content */}
        </section>

        {/* Posts Section */}
        <section className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-lg font-bold mb-4">Feed</h2>
          {/* Posts content */}
        </section>
      </div>
    </main>
  );
}
