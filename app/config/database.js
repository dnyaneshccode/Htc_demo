const mongoose = require('mongoose');
mongoose
  .connect("mongodb://localhost:27017/htc", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('🚀 DATABASE CONNECTION SUCCESSFULLY');
  })
  .catch((err) => {
    console.log('🚀 DATABASE CONNECTION ABORTED', err);
  });
