import { STARTUPS_BY_AUTHOR_QUERY } from "@/lib/queries";
import { client } from "@/sanity/lib/client";
import React from "react";
import StartupCard, { StartupCardType } from "./StartupCard";

const UserStartup = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupCardType) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};

export default UserStartup;
