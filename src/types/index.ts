export interface CoverPage {
  id: string;
  title: string;
  subtitle: string;
  class_name: string;
  theme_quote: string;
  qr_code_url: string;
  school_logo_url: string;
}

export interface Editorial {
  id: string;
  principal_message: string;
  teacher_message: string;
  editorial_note: string;
  theme_introduction: string;
}

export interface CreativeWriting {
  id: string;
  type: 'poetry' | 'story' | 'skit';
  title: string;
  content: string;
  author_name: string;
  created_at: string;
}

export interface Article {
  id: string;
  category: 'tech' | 'health' | 'social' | 'reviews';
  title: string;
  content: string;
  author: string;
  icon: string;
  created_at: string;
}

export interface ArtGallery {
  id: string;
  type: 'drawing' | 'cartoon' | 'photo' | 'craft';
  title: string;
  image_url: string;
  description: string;
  artist_name: string;
  created_at: string;
}

export interface Opinion {
  id: string;
  type: 'opinion' | 'reflection' | 'debate';
  title: string;
  content: string;
  author_name: string;
  created_at: string;
}

export interface ClassHighlight {
  id: string;
  type: 'achievement' | 'project' | 'event';
  title: string;
  description: string;
  image_url: string;
  event_date: string;
  created_at: string;
}

export interface FunZone {
  id: string;
  type: 'riddle' | 'joke' | 'quiz' | 'crossword';
  title: string;
  content: string;
  answer: string;
  created_at: string;
}

export interface LanguageCorner {
  id: string;
  language: 'malayalam' | 'hindi' | 'english';
  type: 'poem' | 'idiom' | 'proverb';
  content: string;
  translation: string;
  author_name: string;
  created_at: string;
}

export interface Inspirational {
  id: string;
  type: 'quote' | 'story' | 'message';
  title: string;
  content: string;
  author_name: string;
  created_at: string;
}

export interface SpecialFeature {
  id: string;
  type: 'interview' | 'spotlight' | 'column';
  title: string;
  content: string;
  featured_person: string;
  image_url: string;
  created_at: string;
}

export interface MediaGallery {
  id: string;
  type: 'photo' | 'video';
  title: string;
  url: string;
  description: string;
  category: string;
  thumbnail_url: string;
  created_at: string;
}