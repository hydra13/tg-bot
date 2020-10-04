const tokens = require('./tokens');
module.exports = {
  apps: [{
    name: 'tg-bot',
    script: 'out/index.js',
    watch: true,
    env: {
      "NODE_ENV": "production",
      ...tokens
    }
  }],
};
