# VII-C Digital Magazine Platform

A comprehensive digital magazine platform built for school competitions, featuring a complete admin panel and beautiful gallery system.

## Features

### Public Magazine View
- **Cover Page**: Beautiful landing page with magazine title, theme, and entry button
- **11 Content Sections**:
  1. Editorial Section (Principal, Teacher, Editorial Note, Theme Introduction)
  2. Creative Writing (Poetry, Stories, Skits)
  3. Informative Articles (Tech & Science, Health, Social Issues, Reviews)
  4. Art & Aesthetics Gallery (Drawings, Cartoons, Photography, Craftwork)
  5. Opinion & Expression (Student Opinions, Reflections, Debate Highlights)
  6. Class Highlights (Achievements, Projects, Events)
  7. Fun Zone (Riddles, Jokes, Quiz, Crosswords)
  8. Language Corner (Malayalam, Hindi, English poems, idioms, proverbs)
  9. Inspirational Section (Quotes, Moral Stories, Life Skills Messages)
  10. Special Features (Interviews, Student Spotlight, Teacher & Parent Columns)
  11. Media Gallery (Photos and Videos with category filtering)

### Admin Panel
- **Secure Login**: Email: `7c@magazine.com`, Password: `7cmagazine`
- **Content Management**: Full CRUD operations for all magazine sections
- **Cover Page Settings**: Customize magazine title, subtitle, theme, and logos
- **Editorial Management**: Update messages from principal, teacher, and editorial team
- **Media Management**: Add photos and videos with URLs, descriptions, and categories

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom color scheme (Teal, Beige, Brown, Gold accents)
- **Typography**: Poppins (headings) + Lora (body text)
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Custom admin authentication with password hashing
- **Icons**: Lucide React

## Design System

### Color Palette
- **Primary**: Teal (#008080)
- **Secondary**: Beige (#F1EDEE)
- **Accent**: Brown (#967D69)
- **Highlight**: Gold/Light Blue

### Typography
- **Headings**: Poppins (Sans-serif)
- **Body**: Lora (Serif)
- Line spacing: 150% for body, 120% for headings

## Database Schema

### Tables
1. `admins` - Admin user credentials
2. `cover_page` - Magazine cover content
3. `editorial` - Editorial section messages
4. `creative_writing` - Poetry, stories, skits
5. `articles` - Informative articles with categories
6. `art_gallery` - Artwork with images
7. `opinions` - Student opinions and reflections
8. `class_highlights` - Achievements and events
9. `fun_zone` - Riddles, jokes, quizzes
10. `language_corner` - Multilingual content
11. `inspirational` - Quotes and moral stories
12. `special_features` - Interviews and spotlights
13. `media_gallery` - Photos and videos

All tables have RLS enabled with public read access and authenticated write access.

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account (already configured)

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Admin Access

1. Click the settings icon in the bottom-right corner
2. Login with credentials:
   - Email: `7c@magazine.com`
   - Password: `7cmagazine`
3. Navigate through sections using the sidebar
4. Add, edit, or delete content as needed

## Content Management Guide

### Adding Creative Writing
1. Go to Admin Panel > Creative Writing
2. Click "Add New"
3. Select type (Poetry, Story, or Skit)
4. Fill in title, content, and author name
5. Click "Add Item"

### Adding Media to Gallery
1. Go to Admin Panel > Media Gallery
2. Click "Add Media"
3. Select type (Photo or Video)
4. Enter media URL (use image hosting services like Imgur, Pexels, or Unsplash)
5. Add title, description, and category
6. For videos, optionally add thumbnail URL
7. Click "Add Media"

### Editing Editorial Content
1. Go to Admin Panel > Editorial
2. Update the four text areas:
   - Principal's Message
   - Class Teacher's Message
   - Editorial Note
   - Theme Introduction
3. Click "Save Editorial"

## Sample Data

The platform includes sample data demonstrating all features:
- Creative writings (poems, stories)
- Articles across all categories
- Opinions and reflections
- Class highlights with dates
- Fun zone content (riddles and jokes)
- Inspirational quotes and stories
- Language corner with multilingual content

## Architecture

### Component Structure
```
src/
├── components/
│   ├── admin/           # Admin panel components
│   ├── pages/           # Magazine page components
│   ├── AdminDashboard.tsx
│   ├── LoginPage.tsx
│   ├── MagazineCover.tsx
│   └── MagazineViewer.tsx
├── context/
│   └── AuthContext.tsx  # Authentication state
├── lib/
│   └── supabase.ts      # Supabase client
├── types/
│   └── index.ts         # TypeScript types
└── App.tsx              # Main app component
```

### Key Features
- **Modular Design**: Each magazine section is a separate component
- **Responsive Layout**: Mobile-first design with breakpoints
- **Type Safety**: Full TypeScript coverage
- **Authentication**: Secure admin access with hashed passwords
- **Database Security**: Row Level Security policies on all tables
- **Real-time Updates**: Content changes reflect immediately

## Customization

### Changing Colors
Edit `tailwind.config.js` and update color values in components.

### Adding New Sections
1. Create database table with RLS policies
2. Add TypeScript type in `src/types/index.ts`
3. Create page component in `src/components/pages/`
4. Create admin component in `src/components/admin/`
5. Add to navigation in `MagazineViewer.tsx` and `AdminDashboard.tsx`

### Using Real Images
Replace image URLs in the admin panel with:
- **Free stock photos**: Pexels.com, Unsplash.com
- **Image hosting**: Imgur.com, ImgBB.com
- **Your own hosting**: Upload to Supabase Storage or any CDN

## Security Notes

- Admin password is hashed using SHA-256
- RLS policies ensure data security
- Public users can only read content
- Only authenticated admins can modify content
- All database queries use Supabase's secure client

## Future Enhancements

Potential features to add:
- File upload for images directly to Supabase Storage
- Export magazine as PDF
- Print-friendly layouts
- Search functionality
- Analytics dashboard
- Multi-admin support with roles
- Comment system for visitors
- Social sharing buttons

## Support

For issues or questions about this platform:
1. Check database connection in `.env` file
2. Verify Supabase project is active
3. Ensure all admin components follow the CRUD pattern
4. Check browser console for errors

## Credits

**Theme**: "Beyond Boundaries - Breaking limits in learning and life"
**Class**: VII-C
**Year**: 2025 Edition

Built with React, TypeScript, Tailwind CSS, and Supabase.
