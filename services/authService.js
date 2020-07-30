const passport = require('passport');
const userLevelModel = require('../models/userLevelModel');

const isManagement = (userLevel) =>
  userLevel.role === 'owner' || userLevel.role === 'manager';

const isCashier = (userLevel) => userLevel.role === 'cashier';

const isBuyer = (userLevel) => userLevel.role === 'buyer';

// authentication middleware:
//  - we exit early in failed cases
//  - we attach the user object to the request so following routes can consume it

const login = (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      console.error(err);
    }
    if (info) {
      res.status(403).send(info);
    } else {
      res.locals.user = user;
      next();
    }
  })(req, res, next);
};

const create = (req, res, next) => {
  passport.authenticate('create', async (err, passportUser, info) => {
    if (err) {
      console.error(err);
    }
    if (info) {
      res.status(400).send(info);
    } else {
      res.locals.passportUser = passportUser;
      next();
    }
  })(req, res, next);
};

const jwt = (req, res, next) => {
  passport.authenticate('jwt', async (err, user, info) => {
    if (err) {
      console.error(err);
    }
    if (info) {
      res.status(403).send(info);
    } else {
      res.locals.user = user;
      next();
    }
  })(req, res, next);
};

const managementOnly = async (req, res, next) => {
  const { user } = res.locals;
  if (!user) {
    res.status(403);
    res.send({ message: 'Unauthorized' });
  } else {
    const userLevel = await userLevelModel.getUserLevelById(user.userLevelID);

    if (!isManagement(userLevel)) {
      res.status(403);
      res.send({ message: 'Unauthorized' });
    } else {
      res.locals.userLevel = userLevel;
      next();
    }
  }
};

const cashierOnly = async (req, res, next) => {
  const { user } = res.locals;
  if (!user) {
    res.status(403);
    res.send({ message: 'Unauthorized' });
  } else {
    const userLevel = await userLevelModel.getUserLevelById(user.userLevelID);

    if (!isManagement(userLevel) && !isCashier(userLevel)) {
      res.status(403);
      res.send({ message: 'Unauthorized' });
    } else {
      res.locals.userLevel = userLevel;
      next();
    }
  }
};

const buyerOnly = async (req, res, next) => {
  const { user } = res.locals;
  if (!user) {
    res.status(403);
    res.send({ message: 'Unauthorized' });
  } else {
    const userLevel = await userLevelModel.getUserLevelById(user.userLevelID);

    if (!isManagement(userLevel) && !isBuyer(userLevel)) {
      res.status(403);
      res.send({ message: 'Unauthorized' });
    } else {
      res.locals.userLevel = userLevel;
      next();
    }
  }
};

module.exports = {
  create,
  login,
  jwt,
  managementOnly,
  cashierOnly,
  buyerOnly,
};
