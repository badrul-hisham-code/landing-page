-- Useful SQL Queries for Contact Form Management

-- ============================================
-- VIEWING SUBMISSIONS
-- ============================================

-- Get all submissions (most recent first)
SELECT * FROM contact_submissions 
ORDER BY created_at DESC;

-- Get submissions from today
SELECT * FROM contact_submissions 
WHERE created_at >= CURRENT_DATE
ORDER BY created_at DESC;

-- Get submissions from last 7 days
SELECT * FROM contact_submissions 
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Get submissions from specific email
SELECT * FROM contact_submissions 
WHERE email = 'example@email.com'
ORDER BY created_at DESC;

-- Search messages containing specific text
SELECT * FROM contact_submissions 
WHERE message ILIKE '%keyword%'
ORDER BY created_at DESC;

-- ============================================
-- STATISTICS
-- ============================================

-- Total number of submissions
SELECT COUNT(*) as total_submissions 
FROM contact_submissions;

-- Submissions per day (last 30 days)
SELECT 
  DATE(created_at) as submission_date,
  COUNT(*) as count
FROM contact_submissions
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY submission_date DESC;

-- Most active email addresses
SELECT 
  email,
  COUNT(*) as submission_count,
  MAX(created_at) as last_submission
FROM contact_submissions
GROUP BY email
ORDER BY submission_count DESC
LIMIT 10;

-- Submissions by hour of day
SELECT 
  EXTRACT(HOUR FROM created_at) as hour,
  COUNT(*) as count
FROM contact_submissions
GROUP BY hour
ORDER BY hour;

-- ============================================
-- MAINTENANCE
-- ============================================

-- Delete old submissions (older than 1 year)
-- WARNING: This permanently deletes data!
-- DELETE FROM contact_submissions 
-- WHERE created_at < CURRENT_DATE - INTERVAL '1 year';

-- Delete spam submissions (example - adjust criteria)
-- WARNING: This permanently deletes data!
-- DELETE FROM contact_submissions 
-- WHERE message ILIKE '%spam keyword%';

-- Delete specific submission by ID
-- WARNING: This permanently deletes data!
-- DELETE FROM contact_submissions 
-- WHERE id = 123;

-- ============================================
-- EXPORT
-- ============================================

-- Export to CSV format (copy results and save as CSV)
SELECT 
  id,
  name,
  email,
  message,
  TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') as submitted_at,
  ip_address
FROM contact_submissions
ORDER BY created_at DESC;

-- ============================================
-- BACKUP
-- ============================================

-- Create a backup table
CREATE TABLE contact_submissions_backup AS 
SELECT * FROM contact_submissions;

-- Restore from backup (if needed)
-- TRUNCATE contact_submissions;
-- INSERT INTO contact_submissions 
-- SELECT * FROM contact_submissions_backup;
