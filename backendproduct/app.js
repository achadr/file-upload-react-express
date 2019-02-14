var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var fileUpload = require('express-fileupload')
var fs = require('fs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post('/upload', (req, res, next) => {
  let uploadFile = req.files.file
  const fileName = req.files.file.name
  const getFilePath = (filePath) => {
   console.log('localPath', filePath)
   if (fs.existsSync(filePath)) {
        let parts = filePath.split('.')
        return getFilePath(parts[0] + '(1)' +'.'+ parts[1])
      } else {
        return filePath
      }
  }
  let localPath = getFilePath(`${__dirname}/public/uploads/${fileName}`)
   console.log('localPath', localPath)
  uploadFile.mv(
    localPath,
    function (err) {
      if (err) {
        console.log('ertyui', err)
        return res.status(500).json(err)
      }

      res.json({
        file: `public/${req.files.file.name}`,
      })
    },
  )
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
