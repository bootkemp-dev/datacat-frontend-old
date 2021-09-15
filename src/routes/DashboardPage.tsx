import Typography from '@material-ui/core/Typography';
import React from 'react';
import DownJobsAlert from '../components/dashboard/DownJobsAlert';
import Layout from '../components/shared/Layout';
import useJobs from '../hooks/dashboard/useJobs';
import { JobStatus } from '../interfaces/resources/jobs';
import JobCard from '../components/dashboard/JobCard';

const DashboardPage: React.FC = () => {
  const jobs = useJobs();

  if (jobs.isLoading || !jobs.data) {
    return (
      <Layout>
        <Typography>Loading...</Typography>
      </Layout>
    );
  }

  if (jobs.isError) {
    return (
      <Layout>
        <Typography color="error">Error: {jobs.error}</Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <DownJobsAlert
        downCount={
          jobs.data.filter(job => job.status === JobStatus.DOWN).length
        }
      />
      {jobs.data.map(job => (
        <JobCard job={job} key={job.id} />
      ))}
    </Layout>
  );
};

export default DashboardPage;
