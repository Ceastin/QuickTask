require('dotenv').config();

const config = {
  server:{port: process.env.PORT},
  db:{uri: process.env.MONGO_URI},
  jwt:{secret: process.env.JWT_SECRET,
       expiresIn: process.env.JWT_EXPIRES_IN},
  frontend:{url: process.env.ORIGIN},
};

module.exports=config;