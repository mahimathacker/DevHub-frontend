export interface Job {
    id: number,
    title: string,
    company_name: string,
    company_site: string | null,
    company_logo: string | null,
    location: string,
    salary_range: string | null,
    apply_url: string,
    job_summary: string,
    requirements: string | null,
    responsibilities: string | null,
    job_type: string | null,
    category: string,
    tags: string[],
    created_at: string,
    updated_at: string
}



export interface JobResponse {
    data: Job[];
    nextCursor?: string | null;
    hasMore?: boolean;
}