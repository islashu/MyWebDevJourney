const express = require('express');
const router = express.Router();
const passport = require('passport');
import {handleCreateTabs, handleGetTabs} from '../controllers/tabsController';

router.get('/getTabs', handleGetTabs);

router.post('/create', handleCreateTabs);

module.exports = router;
