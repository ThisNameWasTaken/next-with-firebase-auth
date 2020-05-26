require('dotenv').config();

const env = Object.keys(process.env)
  .filter(key => !key.startsWith('NODE_'))
  .reduce(
    (env, key) => ({
      ...env,
      [key]: process.env[key],
    }),
    {}
  );

module.exports = {
  env,
};
