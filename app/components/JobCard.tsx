"use client";

import { FC, useEffect } from "react";
import Link from "next/link";
import { Job } from "../types/Job";

interface JobCardProps {
  job: Job;
  onLike?: (id: string) => void;
  isLiked?: boolean;
}

const JobCard: FC<JobCardProps> = ({ job, onLike, isLiked }) => {
  return (
    <div className="bg-background text-foreground border border-gray-200 dark:border-gray-700 p-4 rounded-2xl shadow-md transition hover:shadow-lg">
      <div className="flex items-center gap-4">
        {job.employer_logo ? (
          <img
            src={job.employer_logo}
            alt={job.employer_name}
            className="w-12 h-12 object-contain"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded-full" />
        )}

        <div className="flex-1">
          <h2 className="text-lg font-semibold">{job.job_title}</h2>
          <p className="text-sm text-gray-500">
            {job.employer_name} — {job.job_location}
          </p>
        </div>

        {onLike && (
          <button
            onClick={() => onLike(job.job_id)}
            className="text-red-500 hover:text-red-600"
            title={isLiked ? "Unlike" : "Like"}
          >
            {isLiked ? "❤️" : "🤍"}
          </button>
        )}
      </div>

      <div className="mt-3 flex justify-between items-center text-sm">
        <span className="text-gray-600">{job.job_employment_type_text}</span>
        <Link
          href={`/job-details/${job.job_id}`}
          className="text-blue-600 hover:underline font-medium"
        >
          Learn more...
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
