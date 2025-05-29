"use client";

import useSWR from "swr";
import JobCard from "../components/JobCard";
import { fetcher } from "../lib/fetcher";
import { Job } from "../types/Job";
import { useLikes } from "../context/LikesProvider";

const Liked = () => {
  const { liked, toggleLike } = useLikes();
  const { data, error, isLoading } = useSWR(
    "/search?query=Frontend&num_pages=1",
    fetcher
  );
  const jobs: Job[] = data?.data || [];

  const likedJobs = jobs.filter((job) => liked.includes(job.job_id));

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-6">Liked Jobs</h1>
      {likedJobs.length === 0 ? (
        <p>No liked jobs found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {likedJobs.map((job) => (
            <JobCard
              key={job.job_id}
              job={job}
              onLike={() => {
                toggleLike(job.job_id);
              }}
              isLiked={true}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Liked;
