import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUPS_VIEWS_QUERY } from "@/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
const View = async ({ id }: { id: string }) => {
  const { views: totalviews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUPS_VIEWS_QUERY, { id });
  await writeClient
    .patch(id)
    .set({ views: totalviews + 1 })
    .commit();
  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black"> {totalviews} views</span>
      </p>
    </div>
  );
};

export default View;
