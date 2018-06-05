const fs = require('fs'),
      path = require('path'),
      { spawn } = require('child_process')
      
function decrypt (path, callback) {
  const program = 'gpg',
        args = ['--decrypt', path ]

  if (callback && typeof callback === 'function') {
    exists(path)
      .then(fileExists => {
        spawnChild(program, args)
        .then(result => callback(undefined, result))
        .catch(e => callback(e))
      })
      .catch(e => callback(e))
  } else {

    return exists(path)
      .then(fileExists => {
        return spawnChild(program, args)
      })
  }
}

function exists (path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (e, stat) => {
      if (e) {
        if (e.code === 'ENOENT') {
          resolve(false)
        } else {
          reject(e)
        }
      } else {
        resolve(stat.isFile())
      }
    })
  })
}

function spawnChild(program, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(program, args),
          result = {}

    child.stdout.on('data', (data) => {
      result.output = data.toString()
    })

    child.stderr.on('data', (data) => {
      result.errors = data.toString()
    })

    child.on('error', (e) => {
      result.e = e
    })

    child.on('exit', (code) => {
      if (result.e) {
        reject(e)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = { decrypt }

