import mongoose from 'mongoose';
import { Activity, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([Activity.deleteMany({}), Team.deleteMany({}), User.deleteMany({}), Workout.deleteMany({})]);

    const users = await User.insertMany([
      { username: 'maya.runner', email: 'maya.runner@example.com', fitnessLevel: 'intermediate' },
      { username: 'liam.moves', email: 'liam.moves@example.com', fitnessLevel: 'beginner' },
      { username: 'sofia.strength', email: 'sofia.strength@example.com', fitnessLevel: 'advanced' },
    ]);

    await Team.insertMany([
      { name: 'Morning Momentum', members: [users[0]._id, users[1]._id] },
      { name: 'Power Hour', members: [users[2]._id] },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'running', durationMinutes: 32, distanceKm: 5.2, points: 52 },
      { user: users[0]._id, type: 'strength', durationMinutes: 40, points: 40 },
      { user: users[1]._id, type: 'walking', durationMinutes: 28, distanceKm: 2.4, points: 24 },
      { user: users[2]._id, type: 'strength', durationMinutes: 55, points: 65 },
    ]);

    await Workout.insertMany([
      {
        title: 'Start Strong Walk',
        type: 'walking',
        fitnessLevel: 'beginner',
        durationMinutes: 20,
        description: 'A steady walk with three short bursts of faster movement.',
      },
      {
        title: 'Five-Kilometre Builder',
        type: 'running',
        fitnessLevel: 'intermediate',
        durationMinutes: 35,
        description: 'An easy-paced run with four one-minute effort intervals.',
      },
      {
        title: 'Full-Body Power Circuit',
        type: 'strength',
        fitnessLevel: 'advanced',
        durationMinutes: 45,
        description: 'A four-round circuit for legs, push, pull, and core strength.',
      },
    ]);

    console.log('Database seeding complete: 3 users, 2 teams, 4 activities, 3 workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
