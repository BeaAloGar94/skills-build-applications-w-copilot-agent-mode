import { Router } from 'express';
import { Activity, Team, User, Workout } from './models.js';

const router = Router();

router.get('/users', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ username: 1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/users', async (request, response, next) => {
  try {
    response.status(201).json(await User.create(request.body));
  } catch (error) {
    next(error);
  }
});

router.get('/activities', async (request, response, next) => {
  try {
    const query = Activity.find();
    if (typeof request.query.user === 'string') {
      query.where('user').equals(request.query.user);
    }
    response.json(await query.populate('user', 'username email').sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/activities', async (request, response, next) => {
  try {
    response.status(201).json(await Activity.create(request.body));
  } catch (error) {
    next(error);
  }
});

router.get('/teams', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members', 'username email').sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/teams', async (request, response, next) => {
  try {
    response.status(201).json(await Team.create(request.body));
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard', async (_request, response, next) => {
  try {
    const leaderboard = await Activity.aggregate([
      { $group: { _id: '$user', points: { $sum: '$points' }, activities: { $sum: 1 } } },
      { $sort: { points: -1 } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $project: { _id: 0, user: '$user.username', points: 1, activities: 1 } },
    ]);
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

router.get('/workouts', async (request, response, next) => {
  try {
    const query = Workout.find();
    if (typeof request.query.fitnessLevel === 'string') {
      query.where('fitnessLevel').equals(request.query.fitnessLevel);
    }
    response.json(await query.sort({ fitnessLevel: 1, title: 1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/workouts', async (request, response, next) => {
  try {
    response.status(201).json(await Workout.create(request.body));
  } catch (error) {
    next(error);
  }
});

export default router;