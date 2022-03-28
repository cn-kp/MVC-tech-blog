const router = require('express').Router();
const dashboardRoutes = require('./dashboardRoute');
const userRoutes=require('./userRoute');
const postRoutes = require('./postRoute');
const commentRoutes = require('./commentRoute');

router.use('/dashboard', dashboardRoutes);
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;