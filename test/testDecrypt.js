/* globals describe */
/* globals it */

const expect = require('expect.js'),
      { decrypt } = require('../index.js'),
      EventEmitter = require('events')

describe('exec-pgp', function () {
  describe('decrypt', function () {
    it('should return a Promise object when a callback function is not supplied', function () {
      const output = decrypt('./test/sometext.asc')
      expect(output).to.be.a(Promise)
    })

    it('should not return when a callback function is supplied', function () {
      const output = decrypt('./test/sometext.asc', () => {})
      expect(output).to.be(undefined)
    })

    it('should return output of decryption in a result object', function (done) {
      decrypt('./test/sometext.asc')
        .then(result => {
          expect(result.output).to.eql('Some secret\n')
          done()
        })
    })

    describe('callback', function () {
      it('should execute a callback function when gpg process exits', function (done) {
        const resolver = new EventEmitter(),
              someFunction = () => {
                someFunction.executions = (someFunction.executions || 0) + 1
                resolver.emit('execute')
              }

        decrypt('<non-existent-file>', someFunction)

        resolver.once('execute', () => {
          expect(someFunction).to.have.property('executions', 1)
          done()
        })
      })
    })
    
    describe('promisified', function () {
      it('should return a Promise object containing results when gpg process exits succesfully', function (done) {
        decrypt('./test/sometext.asc')
          .then(result => {
            expect(result).not.to.be(undefined) 
            expect(result).to.have.property('output', 'Some secret\n')
            done()
          })
      })

      it('should return a Promise object containing \'e\' when gpg process exits in error', function (done) {
        decrypt('<non-existent-file>')
          .catch(e => {
            expect(e).not.to.be(undefined)
            done()
          })
      })
    })
  })
})
      
