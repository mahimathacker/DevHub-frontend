export interface resources {
    id: number,
    title: string,
    description: string,
    url: string,
    image_url: string,
    platform: string,
    content_by: string,
    languge_id: number,
    type_id: number,
    language: string,
    type_name: string,
    price_type: string,
    difficulty_level: string,
    tags: string[],
    price_id: number,
    category_id: number,
    difficulty_level_id: number,
    additional_info: string,
    created_at: string,
    updated_at: string,
}

export interface resourcesResponse {
    data: resources[],
    nextCursor?: string | null,
    hasMore?: boolean,
}