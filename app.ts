import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// import { router as indexRouter } from './routes/index';
// import { router as usersRouter } from './routes/users';

class App {
  public express: express.Application = express();

  constructor(){
    this.middleWareInit();
  }

  private middleWareInit() {
    // view engine setup
    // express.set('views', path.join(__dirname, 'views'));
    // express.set('view engine', 'jade');

    this.express.use(logger('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(cookieParser());
    this.express.use(express.static(path.join(__dirname, 'public')));

    // this.express.use('/', indexRouter);
    // this.express.use('/users', usersRouter);

    // catch 404 and forward to error handler
    this.express.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    // this.express.use(function(err, req, res, next) {
    //   // set locals, only providing error in development
    //   res.locals.message = err.message;
    //   res.locals.error = req.express.get('env') === 'development' ? err : {};

    //   // render the error page
    //   res.status(err.status || 500);
    //   res.render('error');
    // });  
  }
}


export default new App().express;