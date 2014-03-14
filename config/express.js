
/**
 * Module dependencies.
 */

var express = require('express'),
    mongoStore = require('connect-mongo')(express),
    flash = require('connect-flash');

module.exports = function (app, config, passport) {
  app.set('port', process.env.PORT || 3000);
  
  app.set('showStackError', true);
  // should be placed before express.static
  app.use(express.compress({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
    },
    level: 9
  }));
  app.use(express.static(config.root + '/public'));
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());

  // set views path, template engine and default layout
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.configure(function () {
    // cookieParser should be above session
    app.use(express.cookieParser('hdo-budget-api'));

    // bodyParser should be above methodOverride
    app.use(express.bodyParser());

    // express/mongo session storage
    app.use(express.session({
      secret: 'hdo-budget-api',
      store: new mongoStore({
        url: config.db,
        collection : 'sessions'
      })
    }));

    // connect flash for flash messages
    app.use(flash());

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.favicon());

    // routes should be at the last
    app.use(app.router);

    app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
    
    // assume "not found" in the error msgs
    // is a 404. this is somewhat silly, but
    // valid, you can do whatever you like, set
    // properties, use instanceof etc.
    app.use(function(err, req, res, next){
      // treat as 404
      if (~err.message.indexOf('not found')) {
          return next();
      }

      // log it
      console.error(err.stack);

      // error page
      res.status(500).render('500', { error: err.stack })
    });

    // assume 404 since no middleware responded
    app.use(function(req, res, next){
      res.status(404).render('404', { url: req.originalUrl })
    });
    
    // development only
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }
  })
};