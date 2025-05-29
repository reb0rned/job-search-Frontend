"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import JobCard from "../components/JobCard";
import { fetcher } from "../lib/fetcher";
import { Job } from "../types/Job";
import Loader from "../components/Loader/loader";
import { useLikes } from "../context/LikesProvider";

const JobsPage = () => {
  const { liked, toggleLike } = useLikes();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("Frontend");

  useEffect(() => {
    const profileString = localStorage.getItem("profile");
    if (profileString) {
      const profile = JSON.parse(profileString);
      if (profile.title && profile.title.trim() !== "") {
        setActiveQuery(profile.title);
        setSearchQuery(profile.title);
      }
    }
  }, []);

  const { data, error, isLoading } = useSWR(
    `/search?query=${encodeURIComponent(activeQuery)}&num_pages=1`,
    fetcher
  );

  const jobs: Job[] = data?.data?.slice(0, 10) || [];

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      setActiveQuery(searchQuery.trim());
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Failed to load jobs</p>;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard
            key={job.job_id}
            job={job}
            onLike={toggleLike}
            isLiked={liked.includes(job.job_id)}
          />
        ))}
      </div>
    </section>
  );
};

export default JobsPage;
