import { Radon } from '../src/radon'
import { Mir } from '../src/types'

describe('Radon', () => {
  describe('getMarkup', () => {
    it('generates markup', () => {
      const mirRequest: Mir = {
        description: '',
        name: '',
        radRequest: {
          notBefore: 0,
          retrieve: [
            {
              kind: '',
              url: '',
              script: [0x89, [0x66, 'bpi'], [0x66, 'VSD'], [0x65, 'rate_float']],
            },
          ],
          aggregate: [0x10],
          tally: [0x10],
        },
      }

      const markup = new Radon(mirRequest).getMarkup()

      expect(markup).toBeTruthy()
    })
  })
})
