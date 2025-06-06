import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';

// GET single profile
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const result = await pool.query('SELECT * FROM profiles WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

// PUT update profile
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, email, age, bio, avatar_url, location, occupation } = body;

    const result = await pool.query(
      'UPDATE profiles SET name = $1, email = $2, age = $3, bio = $4, avatar_url = $5, location = $6, occupation = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *',
      [name, email, age, bio, avatar_url, location, occupation, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating profile:', error);
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

// DELETE profile
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const result = await pool.query('DELETE FROM profiles WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    return NextResponse.json({ error: 'Failed to delete profile' }, { status: 500 });
  }
}