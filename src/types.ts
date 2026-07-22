/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  qualifications?: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Documentary' | 'Cultural Archive' | 'Civic Project';
  year: string;
  description: string;
  longDescription?: string;
  impactMetric?: string;
  impactLabel?: string;
  credits: { role: string; name: string }[];
  image: string;
  videoUrl?: string; // e.g. for embeds
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string[]; // split by paragraphs
  author: string;
  authorRole: string;
  publishDate: string;
  category: 'Civic Education' | 'Cultural History' | 'Editorial' | 'Field Report';
  readTime: string;
  image: string;
  citations?: string[];
}

export interface MediaContent {
  id: string;
  title: string;
  type: 'video' | 'podcast' | 'photo-essay';
  category: string;
  description: string;
  durationOrPages: string; // e.g. "45 mins" or "12 photos"
  coverImage: string;
  releaseDate: string;
  audioUrl?: string; // placeholder/audio player
  videoUrl?: string; // placeholder embed
  youtubeUrl?: string; // embedded YouTube video URL for interviews/videos
  photos?: { url: string; caption: string }[]; // for photo-essay
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  audience: string;
  consultationFocus: string;
}
