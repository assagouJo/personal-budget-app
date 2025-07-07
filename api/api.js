const apiRouter = require('express').Router();
const budgetRouter = require("../routers/budgetRouter");

apiRouter.use('/category', budgetRouter);



module.exports = apiRouter;