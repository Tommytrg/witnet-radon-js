import { Radon } from '../src/radon'
import { Mir, Markup } from 'src/types'
import { markupOptions } from 'src/structures'

describe('Radon', () => {
  describe('getMarkup', () => {
    it('generates markup', () => {
      // const script: MirScript = [69, 116, [97, 'bpi'], 116, [97, 'VSD'], 116, [97, 'rate_float'], 114]

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
      const result: Markup = {
        description: '',
        name: '',
        radRequest: {
          notBefore: 0,
          retrieve: [
            {
              kind: '',
              script: [
                {
                  hierarchicalType: 'operator',
                  id: 6,
                  label: 'parseJson_map',
                  markupType: 'select',
                  options: markupOptions.map,
                  outputType: 'map',
                  scriptId: 0,
                  selected: {
                    arguments: [],
                    hierarchicalType: 'selectedOperatorOption',
                    label: 'parseJson_map',
                    markupType: 'option',
                    outputType: 'map',
                  },
                },
              ],
              url: '',
            },
          ],
          tally: [
            {
              hierarchicalType: 'operator',
              id: 4,
              label: 'count',
              markupType: 'select',
              options: markupOptions.integer,
              outputType: 'integer',
              scriptId: 0,
              selected: {
                arguments: [],
                hierarchicalType: 'selectedOperatorOption',
                label: 'count',
                markupType: 'option',
                outputType: 'integer',
              },
            },
          ],
          aggregate: [
            {
              hierarchicalType: 'operator',
              id: 2,
              label: 'count',
              markupType: 'select',
              options: markupOptions.integer,
              outputType: 'integer',
              scriptId: 0,
              selected: {
                arguments: [],
                hierarchicalType: 'selectedOperatorOption',
                label: 'count',
                markupType: 'option',
                outputType: 'integer',
              },
            },
          ],
        },
      } as Markup
      expect(markup).toStrictEqual(result)
    })
  })
})
