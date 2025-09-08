import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// The createClient function is created outside the handler
// so it can be reused across multiple requests.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  // This check is crucial for server-side code to ensure credentials are provided.
  throw new Error('Supabase URL and Service Key must be defined in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Handles POST requests to add a user to the waitlist.
 * @param {Request} request - The incoming request object from the client.
 * @returns {NextResponse} A JSON response indicating success or failure.
 */
export async function POST(request: Request) {
  try {
    // 1. Parse the incoming request body to get the user data.
    const { name, email, phoneNumber } = await request.json();

    // 2. Validate that all required fields are present.
    if (!name || !email || !phoneNumber) {
      return NextResponse.json({ error: 'Name, email, and phone number are required.' }, { status: 400 });
    }

    // 3. Insert the validated data into the Supabase 'users' table.
    const { data, error } = await supabase
      .from('users') // Make sure 'users' is your correct table name
      .insert([
        {
          name: name,
          email: email,
          phone_number: phoneNumber,
        },
      ])
      .select()
      .single(); // .single() is useful to get the object directly, not an array

    // 4. Handle any errors from the Supabase client.
    if (error) {
      console.error('Supabase Error:', error.message);
      // Check for a unique constraint violation (e.g., duplicate email)
      if (error.code === '23505') {
           return NextResponse.json({ error: 'This email address is already on the waitlist.' }, { status: 409 });
      }
      return NextResponse.json({ error: 'Failed to add user to waitlist.' }, { status: 500 });
    }

    // 5. Return a success response with the newly created user data.
    return NextResponse.json({ message: ' ', user: data }, { status: 201 });

  } catch (e) {
    // Handle cases where the request body is not valid JSON.
    console.error('Request Body Error:', e);
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}
