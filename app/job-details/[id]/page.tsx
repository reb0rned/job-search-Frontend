"use client";

import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { Job } from "../../types/Job";
import Loader from "../../components/Loader/loader";
import { use } from "react";

interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

const JobDetailsPage = ({ params }: JobDetailsPageProps) => {
  const { id } = use(params);
  const { data, error, isLoading } = useSWR(
    "/search?query=Frontend&num_pages=1",
    fetcher
  );
  const jobs: Job[] = data?.data || [];
  const decodedId = decodeURIComponent(id);
  const job = jobs.find((j) => j.job_id === decodedId);

  if (isLoading) return <Loader />;
  if (error) return <p>Failed to load job details.</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <section className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">{job.job_title}</h1>

      {job.employer_logo && (
        <img
          src={job.employer_logo}
          alt={`${job.employer_name} logo`}
          className="w-40 h-40 object-contain mb-6"
        />
      )}

      <p className="mb-2">
        <strong>Company: </strong> {job.employer_name}
      </p>

      <p className="mb-2">
        <strong>Employment type: </strong> {job.job_employment_type_text}
      </p>

      <p className="mb-4">
        <strong>Location: </strong> {job.job_location}
      </p>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: job.job_description }}
      />

      {job.employer_website && (
        <p className="mt-6">
          <a
            href={job.employer_website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Company website
          </a>
        </p>
      )}
    </section>
  );
};

export default JobDetailsPage;
