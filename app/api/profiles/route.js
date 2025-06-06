import pool from '../../../lib/db';
import { NextResponse } from 'next/server';

// GET all profiles
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM profiles ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 });
  }
}

// POST create new profile
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, age, bio, avatar_url, location, occupation } = body;

    const result = await pool.query(
      'INSERT INTO profiles (name, email, age, bio, avatar_url, location, occupation) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, email, age, bio, avatar_url, location, occupation]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating profile:', error);
    if (error.code === '23505') { // Unique constraint violation
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
  }
}