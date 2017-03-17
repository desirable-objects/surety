'use strict'

const fs = require('fs')
const Path = require('path')
const files = fs.readdirSync(__dirname)

files.forEach((file) => {
  const base = file.split('\.')[0]
  if (base !== 'index') {
    const resolved = Path.join(__dirname, base)
    exports[base] = require(resolved)
  }
}, {})
