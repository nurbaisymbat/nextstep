const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

require('./server/models').connect(config.dbUri);

const app = express();

app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

app.use(bodyParser.urlencoded({extended:false}));

app.use(passport.initialize());

const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);

const apiRoutes = require('./server/routes/api');
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware, apiRoutes);

const statusCheckMiddleware = require('./server/middleware/status-check');
const profileRoutes = require('./server/routes/profile');
app.use('/profile', statusCheckMiddleware, profileRoutes);

app.get("/*", function(req, res) {
res.sendFile(__dirname + '/server/static/index.html')
})


app.listen(8080, () => {
  console.log('Server is running on http://localhost:80');
});
