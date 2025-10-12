/*
  # Create VII-C Magazine Platform Database Schema
  
  ## Overview
  Complete database structure for a digital magazine platform with admin authentication
  and content management for all 11 magazine sections.
  
  ## Tables Created
  
  ### 1. admins
  - Stores admin user credentials
  - id (uuid, primary key)
  - email (text, unique)
  - password_hash (text) - stores hashed password
  - created_at (timestamptz)
  
  ### 2. cover_page
  - Magazine cover/home page content
  - Fields: title, subtitle, class_name, theme_quote, qr_code_url
  
  ### 3. editorial
  - Editorial section messages
  - principal_message, teacher_message, editorial_note, theme_introduction
  
  ### 4. creative_writing
  - Poetry, stories, and skits
  - type (enum: poetry, story, skit)
  - title, content, author_name
  
  ### 5. articles
  - Informative articles
  - category (tech, health, social, reviews)
  - title, content, author, icon
  
  ### 6. art_gallery
  - Art and aesthetics
  - type (drawing, cartoon, photo, craft)
  - title, image_url, description, artist_name
  
  ### 7. opinions
  - Student opinions and reflections
  - type (opinion, reflection, debate)
  - title, content, author_name
  
  ### 8. class_highlights
  - Achievements and events
  - type (achievement, project, event)
  - title, description, image_url, date
  
  ### 9. fun_zone
  - Riddles, jokes, quiz
  - type (riddle, joke, quiz, crossword)
  - title, content, answer
  
  ### 10. language_corner
  - Multilingual content
  - language (malayalam, hindi, english)
  - type (poem, idiom, proverb)
  - content, translation, author_name
  
  ### 11. inspirational
  - Quotes and moral stories
  - type (quote, story, message)
  - title, content, author_name
  
  ### 12. special_features
  - Interviews and spotlights
  - type (interview, spotlight, column)
  - title, content, featured_person, image_url
  
  ### 13. media_gallery
  - Photos and videos
  - type (photo, video)
  - title, url, description, category, thumbnail_url
  
  ## Security
  - RLS enabled on all tables
  - Authenticated admin access only for modifications
  - Public read access for magazine content
*/

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read own data"
  ON admins FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create cover_page table
CREATE TABLE IF NOT EXISTS cover_page (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT 'Voices of Tomorrow',
  subtitle text NOT NULL DEFAULT 'VII-C Magazine - 2025 Edition',
  class_name text NOT NULL DEFAULT 'VII-C',
  theme_quote text NOT NULL DEFAULT 'Beyond Boundaries - Breaking limits in learning and life',
  qr_code_url text DEFAULT '',
  school_logo_url text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cover_page ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cover page"
  ON cover_page FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update cover page"
  ON cover_page FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert cover page"
  ON cover_page FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create editorial table
CREATE TABLE IF NOT EXISTS editorial (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  principal_message text DEFAULT '',
  teacher_message text DEFAULT '',
  editorial_note text DEFAULT '',
  theme_introduction text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE editorial ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view editorial"
  ON editorial FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update editorial"
  ON editorial FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert editorial"
  ON editorial FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create creative_writing table
CREATE TABLE IF NOT EXISTS creative_writing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('poetry', 'story', 'skit')),
  title text NOT NULL,
  content text NOT NULL,
  author_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE creative_writing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view creative writing"
  ON creative_writing FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage creative writing"
  ON creative_writing FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('tech', 'health', 'social', 'reviews')),
  title text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  icon text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view articles"
  ON articles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage articles"
  ON articles FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create art_gallery table
CREATE TABLE IF NOT EXISTS art_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('drawing', 'cartoon', 'photo', 'craft')),
  title text NOT NULL,
  image_url text NOT NULL,
  description text DEFAULT '',
  artist_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE art_gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view art gallery"
  ON art_gallery FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage art gallery"
  ON art_gallery FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create opinions table
CREATE TABLE IF NOT EXISTS opinions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('opinion', 'reflection', 'debate')),
  title text NOT NULL,
  content text NOT NULL,
  author_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE opinions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view opinions"
  ON opinions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage opinions"
  ON opinions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create class_highlights table
CREATE TABLE IF NOT EXISTS class_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('achievement', 'project', 'event')),
  title text NOT NULL,
  description text NOT NULL,
  image_url text DEFAULT '',
  event_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE class_highlights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view class highlights"
  ON class_highlights FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage class highlights"
  ON class_highlights FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create fun_zone table
CREATE TABLE IF NOT EXISTS fun_zone (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('riddle', 'joke', 'quiz', 'crossword')),
  title text NOT NULL,
  content text NOT NULL,
  answer text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE fun_zone ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view fun zone"
  ON fun_zone FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage fun zone"
  ON fun_zone FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create language_corner table
CREATE TABLE IF NOT EXISTS language_corner (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language text NOT NULL CHECK (language IN ('malayalam', 'hindi', 'english')),
  type text NOT NULL CHECK (type IN ('poem', 'idiom', 'proverb')),
  content text NOT NULL,
  translation text DEFAULT '',
  author_name text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE language_corner ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view language corner"
  ON language_corner FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage language corner"
  ON language_corner FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create inspirational table
CREATE TABLE IF NOT EXISTS inspirational (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('quote', 'story', 'message')),
  title text NOT NULL,
  content text NOT NULL,
  author_name text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inspirational ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view inspirational"
  ON inspirational FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage inspirational"
  ON inspirational FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create special_features table
CREATE TABLE IF NOT EXISTS special_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('interview', 'spotlight', 'column')),
  title text NOT NULL,
  content text NOT NULL,
  featured_person text NOT NULL,
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE special_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view special features"
  ON special_features FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage special features"
  ON special_features FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create media_gallery table
CREATE TABLE IF NOT EXISTS media_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('photo', 'video')),
  title text NOT NULL,
  url text NOT NULL,
  description text DEFAULT '',
  category text DEFAULT '',
  thumbnail_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE media_gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view media gallery"
  ON media_gallery FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage media gallery"
  ON media_gallery FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default admin user (password: 7cmagazine - will be hashed in app)
-- Note: This is a placeholder. The actual password hashing will be done in the application
INSERT INTO admins (email, password_hash) 
VALUES ('7c@magazine.com', 'placeholder_will_be_set_by_app')
ON CONFLICT (email) DO NOTHING;

-- Insert default cover page
INSERT INTO cover_page (id) 
VALUES (gen_random_uuid())
ON CONFLICT DO NOTHING;

-- Insert default editorial
INSERT INTO editorial (id) 
VALUES (gen_random_uuid())
ON CONFLICT DO NOTHING;