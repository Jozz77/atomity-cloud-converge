"use client";

import Link from "next/link";
import { useApiData, type Post } from "@/app/hooks/useApiData";

export default function TestPage() {
  const { data, isLoading, isError } = useApiData();

  if (isLoading) return <div className="p-8 text-text-secondary">Loading...</div>;
  if (isError) return <div className="p-8 text-accent-error">Failed to fetch data.</div>;

  return (
    <div className="p-8 space-y-8 bg-bg-primary min-h-screen text-text-primary">
      <h1 className="text-2xl font-bold">Data Fetching Test</h1>
      <ul className="space-y-2">
        {data?.map((post: Post) => (
          <li key={post.id} className="p-4 bg-bg-secondary border border-border-secondary rounded-card">
            <h3 className="font-semibold text-accent-primary">{post.title}</h3>
            <p className="text-text-secondary text-sm line-clamp-1">{post.body}</p>
          </li>
        ))}
      </ul>
      
      <Link 
        href="/"
        className="inline-flex h-12 items-center justify-center rounded-full border border-border-primary px-8 transition-colors hover:bg-bg-tertiary"
      >
        Back to Home
      </Link>
    </div>
  );
}
