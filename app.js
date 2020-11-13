"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
// import { router as indexRouter } from './routes/index';
// import { router as usersRouter } from './routes/users';
class App {
    constructor() {
        this.express = express_1.default();
        this.middleWareInit();
    }
    middleWareInit() {
        // view engine setup
        // express.set('views', path.join(__dirname, 'views'));
        // express.set('view engine', 'jade');
        this.express.use(morgan_1.default('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use(cookie_parser_1.default());
        this.express.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
        // this.express.use('/', indexRouter);
        // this.express.use('/users', usersRouter);
        // catch 404 and forward to error handler
        this.express.use(function (req, res, next) {
            next(http_errors_1.default(404));
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
exports.default = new App().express;
