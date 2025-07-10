import { createClient } from '@supabase/supabase-js';

// This function creates a Supabase client that can perform admin-level actions.
// It's crucial to use the SERVICE_ROLE_KEY for this, not the anon key.
const createAdminClient = () => {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase URL and Service Role Key are not defined.");
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const supabaseAdmin = createAdminClient();

    // 1. Get the user token from the request header
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication token not provided.' });
    }

    // 2. Verify the token with Supabase to get the user
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !user) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }

    // 3. If the user is authenticated, fetch the meetings
    const { data: meetings, error: meetingsError } = await supabaseAdmin
      .from('meetings')
      .select('*')
      .order('meeting_time', { ascending: true });

    if (meetingsError) {
      throw meetingsError;
    }

    return res.status(200).json(meetings);

  } catch (error) {
    console.error('Error fetching all meetings:', error);
    return res.status(500).json({ error: 'Failed to fetch meetings.' });
  }
} 