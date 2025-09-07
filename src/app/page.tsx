import LandingPage from '@/components/LandingPage';
import { getActiveHackathons } from '@/lib/hackathons';
import { getLatestJobs } from '@/lib/jobs';
import { getLatestResources } from '@/lib/resources';
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const keyword = resolvedParams.keyword as string;
  const response = await getActiveHackathons(keyword);
  const initialHackathons = response.data;

  const jobsResponse = await getLatestJobs(keyword);
  const initialJobs = jobsResponse.data;

  const resourcesResponse = await getLatestResources(keyword);
  const initialResources = resourcesResponse.data;

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <LandingPage initialHackathons={initialHackathons} initialJobs={initialJobs} initialResources={initialResources} />
    </main>
  );
}
