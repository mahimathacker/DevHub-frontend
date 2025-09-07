export interface Hackathon {
    id: number;
    hackathon_url: string;
    title: string;
    location: string;
    description: string;
    thumbnail_url: string;
    start_date: string;
    end_date: string;
    extended_date: string;
    submission_periods: string;
    schedule: Array<{
        date: string;
        events: Array<{
            title: string;
            timestamp: string;
            display_time: string;
        }>;
        display_date: string;
    }>;
    total_prize: number;
    organizer_name: string;
    price_list: Array<{
        title: string;
        items: string[];
    }>;
    category_tags: string[];
    judges: Array<{
        name: string;
        title: string;
    }>;
    created_at: string;
    updated_at: string;
}

export interface HackathonResponse {
    data: Hackathon[];
}
