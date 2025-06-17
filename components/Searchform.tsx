"use client";
import React, { useEffect, useState } from "react";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";
import { SEARCH_QUERY } from "@/lib/queries";
import { client } from "@/sanity/lib/client";

const Searchform = ({ query }: { query?: string }) => {
  const [quer, setquer] = useState(query);
  const [result, setresult] = useState([]);
  const [focus, setfocus] = useState(false);
  useEffect(() => {
    if (!quer) {
      setresult([]);
      return;
    }
    const timer = setTimeout(() => {
      client.fetch(SEARCH_QUERY, { search: quer }).then((res) => {
        setresult(res);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [quer]);
  return (
    <>
      <form action="/" className="search-form ">
        <input
          id="s1"
          name="query"
          value={quer}
          className="search-input"
          placeholder="Search Startup"
          onChange={(e) => setquer(e.target.value)}
          onFocus={() => {
            setfocus(true);
          }}
        />
        <div className="flex gap-2">
          {query && <SearchFormReset />}
          <button type="submit" className="search-btn text-white">
            <Search className="size-5" />
          </button>
        </div>
      </form>
      {focus && result.length > 0 && (
        <ul className="bg-white border mt-2 shadow-md rounded-xl w-full max-w-xl">
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            result.map((startup: any, i: number) => (
              <li key={i} className="p-2 hover:bg-gray-300 rounded">
                <button
                  onClick={() => {
                    setquer(startup.title);
                    setresult([]);
                    setfocus(false);
                  }}
                >
                  {startup.title}
                </button>
              </li>
            ))
          }
        </ul>
      )}
    </>
  );
};

export default Searchform;
