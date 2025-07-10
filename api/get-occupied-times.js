import { createClient } from '@supabase/supabase-js';
import { startOfDay, endOfDay } from 'date-fns';

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL, 
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { date } = req.query;

  if (!date || isNaN(new Date(date))) {
    return res.status(400).json({ error: 'A valid date query parameter is required.' });
  }

  try {
    const targetDate = new Date(date);
    const beginningOfDay = startOfDay(targetDate).toISOString();
    const endingOfDay = endOfDay(targetDate).toISOString();

    const { data, error } = await supabase
      .from('meetings')
      .select('meeting_time')
      .gte('meeting_time', beginningOfDay)
      .lte('meeting_time', endingOfDay);

    if (error) {
      throw error;
    }

    // Extract just the time part (HH:mm) from the full ISO datetime string
    const occupiedTimes = data.map(meeting => {
      const meetingDate = new Date(meeting.meeting_time);
      return meetingDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
    });

    return res.status(200).json(occupiedTimes);

  } catch (error) {
    console.error('Error fetching occupied times:', error);
    return res.status(500).json({ error: 'Failed to fetch occupied times from database.' });
  }
} 