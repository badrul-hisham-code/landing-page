-- Contact Form Submissions Table
-- This table stores all contact form submissions from the website

CREATE TABLE IF NOT EXISTS contact_submissions (
  -- Primary key
  id SERIAL PRIMARY KEY,
  
  -- Contact information
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Create index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
ON contact_submissions(created_at DESC);

-- Create index on email for searching
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
ON contact_submissions(email);

-- Optional: Create a view for recent submissions
CREATE OR REPLACE VIEW recent_contact_submissions AS
SELECT 
  id,
  name,
  email,
  LEFT(message, 100) || '...' as message_preview,
  created_at,
  ip_address
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 50;

-- Grant permissions (adjust as needed for your setup)
-- GRANT SELECT, INSERT ON contact_submissions TO your_app_user;
-- GRANT USAGE, SELECT ON SEQUENCE contact_submissions_id_seq TO your_app_user;
