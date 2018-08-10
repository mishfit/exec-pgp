const fs = require('fs'),
      { spawn } = require('child_process')
      
function decrypt (path, callback) {
  const program = 'gpg',
        args = ['--decrypt', path ]

  if (callback && typeof callback === 'function') {
    exists(path)
      .then(fileExists => {
        if (fileExists) {
          spawnChild(program, args)
          .then(result => callback(undefined, result))
          .catch(e => callback(e))
        } else {
          return Promise.reject(`'${path}' does not exist`)
        }
      })
      .catch(e => callback(e))
  } else {

    return exists(path)
      .then(fileExists => {
        if (fileExists) {
          return spawnChild(program, args)
        } else {
          return Promise.reject(`'${path}' does not exist`)
        }
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
      result.code = code

      if (result.code !== 0) {
        reject(result.e || result.errors)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = { decrypt }

