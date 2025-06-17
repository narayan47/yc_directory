import React from "react";
import Searchform from "@/components/Searchform";
import StartupCard from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/lib/queries";
import type { StartupCardType } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          PITCH YOUR STARTUP, <br />
          CONNECT WITH ENTREPRENEURS
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submite Ideas,Vote on Pitches , and Get Noticed in Virtual
          Competitions.
        </p>
        <Searchform query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search result for "${query}"` : `All Startup`}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((posts: StartupCardType) => (
              <StartupCard key={posts?._id} post={posts} />
            ))
          ) : (
            <p className="no-results">No Startups Found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
