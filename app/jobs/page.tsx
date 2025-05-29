"use client";
import useSWR from "swr";
import { useContext, useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { fetcher } from "../lib/fetcher";
import { Job } from "../types/Job";
import Loader from "../components/Loader/loader";
import { useLikes } from "../context/LikesProvider";

const JobsPage = () => {
  const { liked, toggleLike } = useLikes();
  const { data, error, isLoading } = useSWR(
    "/search?query=Frontend&num_pages=1",
    fetcher
  );

  const jobs: Job[] = data?.data?.slice(0, 10) || [];

  if (isLoading) return <Loader />;
  if (error) return <p>Failed to load jobs</p>;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
