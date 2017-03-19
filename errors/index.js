'use strict'

const fs = require('fs')
const Path = require('path')
const files = fs.readdirSync(__dirname)

files.forEach((file) => {
  const base = file.split('\.')[0]
  if (base !== 'index' && base.charAt(0) !== '_') {
    const resolved = Path.join(__dirname, base)
    const camelCase = base.replace(/(-[a-z])/g, t => t[1].toUpperCase())
    const key = `${camelCase.charAt(0).toUpperCase()}${camelCase.slice(1)}`
    exports[key] = require(resolved)
  }
}, {})
