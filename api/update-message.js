import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { id, is_read } = req.body;

    if (id === undefined || is_read === undefined) {
      return res.status(400).json({ error: 'Message ID and read status are required.' });
    }

    const { data, error } = await supabase
      .from('contact_messages')
      .update({ is_read: is_read })
      .eq('id', id)
      .select();

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Message not found.' });
    }

    res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({ error: 'Failed to update message status.' });
  }
} 