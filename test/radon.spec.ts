import { Radon } from '../src/radon'
import { Mir, Markup } from '../src/types'
import { markupOptions } from '../src/structures'

describe('Radon', () => {
  describe('getMarkup', () => {
    describe('operator types', () => {
      it.only('array', () => {
        const mirRequest: Mir = {
          description: '',
          name: '',
          radRequest: {
            notBefore: 0,
            retrieve: [
              {
                kind: '',
                url: '',
                // bytesHash
                script: [0x31],
              },
            ],
            // arrayGetBytes
            aggregate: [0x15],
            // bytesAsString
            tally: [0x30],
          },
        }

        const result = new Radon(mirRequest).getMarkup()

        const markup: Markup = {
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
                    label: 'count',
                    markupType: 'select',
                    options: markupOptions.bytes,
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
                url: '',
              },
            ],
            aggregate: [
              {
                hierarchicalType: 'operator',
                id: 4,
                label: 'get_bytes',
                markupType: 'select',
                options: markupOptions.arrayBytes,
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
            tally: [
              {
                hierarchicalType: 'operator',
                id: 4,
                label: 'bytesAsString',
                markupType: 'select',
                options: markupOptions.integer,
                outputType: 'string',
                scriptId: 0,
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'bytesAsString',
                  markupType: 'option',
                  outputType: 'string',
                },
              },
            ],
           
          },
        } as Markup
        expect(markup).toStrictEqual(result)
      })

      it('boolean', () => {
        const script = [0x21]
        const mirRequest: Mir = {
          description: '',
          name: '',
          radRequest: {
            notBefore: 0,
            retrieve: [
              {
                kind: '',
                url: '',
                script,
              },
            ],
            aggregate: script,
            tally: script,
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
                    label: 'negate',
                    markupType: 'select',
                    options: markupOptions.boolean,
                    outputType: 'boolean',
                    scriptId: 0,
                    selected: {
                      arguments: [],
                      hierarchicalType: 'selectedOperatorOption',
                      label: 'negate',
                      markupType: 'option',
                      outputType: 'boolean',
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
                label: 'negate',
                markupType: 'select',
                options: markupOptions.boolean,
                outputType: 'boolean',
                scriptId: 0,
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'negate',
                  markupType: 'option',
                  outputType: 'boolean',
                },
              },
            ],
            aggregate: [
              {
                hierarchicalType: 'operator',
                id: 2,
                label: 'negate',
                markupType: 'select',
                options: markupOptions.boolean,
                outputType: 'boolean',
                scriptId: 0,
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'negate',
                  markupType: 'option',
                  outputType: 'boolean',
                },
              },
            ],
          },
        } as Markup
        expect(markup).toStrictEqual(result)
      })

      it('bytes', () => {
        const script = [0x30]
        const mirRequest: Mir = {
          description: '',
          name: '',
          radRequest: {
            notBefore: 0,
            retrieve: [
              {
                kind: '',
                url: '',
                script: [0x31],
              },
            ],
            aggregate: script,
            tally: script,
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
                    label: 'asString',
                    markupType: 'select',
                    options: markupOptions.bytes,
                    outputType: 'string',
                    scriptId: 0,
                    selected: {
                      arguments: [],
                      hierarchicalType: 'selectedOperatorOption',
                      label: 'asString',
                      markupType: 'option',
                      outputType: 'string',
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
                label: 'asString',
                markupType: 'select',
                options: markupOptions.bytes,
                outputType: 'string',
                scriptId: 0,
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'asString',
                  markupType: 'option',
                  outputType: 'string',
                },
              },
            ],
            aggregate: [
              {
                hierarchicalType: 'operator',
                id: 2,
                label: 'asString',
                markupType: 'select',
                options: markupOptions.bytes,
                outputType: 'string',
                scriptId: 0,
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'asString',
                  markupType: 'option',
                  outputType: 'string',
                },
              },
            ],
          },
        } as Markup
        expect(markup).toStrictEqual(result)
      })

      it('string', () => {

        const mirRequest: Mir = {
          description: '',
          name: '',
          radRequest: {
            notBefore: 0,
            retrieve: [
              {
                kind: '',
                url: '',
                script: [0x89],
              },
            ],
            aggregate: [0x62],
            tally: [0x21],
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
                    id: 2,
                    label: 'parseJson_map',
                    markupType: 'select',
                    options: markupOptions.bytes,
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
            aggregate: [
              {
                hierarchicalType: 'operator',
                id: 4,
                label: 'get_boolean',
                markupType: 'select',
                options: markupOptions.map,
                outputType: 'boolean',
                scriptId: 0,
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'get_boolean',
                  markupType: 'option',
                  outputType: 'boolean',
                },
              },
            ],
            tally: [
              {
                hierarchicalType: 'operator',
                id: 6,
                label: 'negate',
                markupType: 'select',
                options: markupOptions.boolean,
                outputType: 'boolean',
                scriptId: 0,
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'negate',
                  markupType: 'option',
                  outputType: 'boolean',
                },
              },
            ],
          },
        } as Markup
        expect(markup).toStrictEqual(result)
      })
    })
  })
})
