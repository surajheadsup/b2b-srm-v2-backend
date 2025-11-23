import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri: process.env.NODE_ENV === 'development'
    ? process.env.MONGODB_URI_LOCAL
    : process.env.MONGODB_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
}));