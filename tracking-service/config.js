module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  mongoose: {
    url: process.env.MONGODB_URL || 'mongodb://mongodb:27017/icommerce',
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};