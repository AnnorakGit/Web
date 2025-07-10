import { createClient } from '@supabase/supabase-js';

const createAdminClient = () => {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase URL and Service Role Key are not defined.");
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
};

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const supabaseAdmin = createAdminClient();

    // 1. Authenticate the user
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication token not provided.' });
    }
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !user) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }

    // 2. Get the meeting ID from the request body
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Meeting ID is required.' });
    }

    // 3. If authenticated, proceed with deletion
    const { error: deleteError } = await supabaseAdmin
      .from('meetings')
      .delete()
      .eq('id', id);

    if (deleteError) {
      throw deleteError;
    }

    return res.status(200).json({ message: 'Meeting deleted successfully.' });

  } catch (error) {
    console.error('Error deleting meeting:', error);
    return res.status(500).json({ error: 'Failed to delete meeting.' });
  }
} 