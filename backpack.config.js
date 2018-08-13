module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './start.js'
    return config
  }
}
