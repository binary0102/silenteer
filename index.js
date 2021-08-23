const express = require("express");
const path = require("path");
const cors =  require('cors')
const logger = require("morgan");
const transitionController = require("./backend/controller/transition");

const app = express();
app.use(cors('*'));
app.use(logger("dev"));




app.get("/api/transition/:color", transitionController.updateTransition);

app.get("/api/reset-transition", transitionController.resetTransition)

app.use(express.static(path.join(__dirname, "build"))); // use for deploy production with build

app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname + "/build/index.html"));
});



// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 5000;
app.set("port", port);

app.listen(port, () => console.log(`Running on localhost:${port}`));