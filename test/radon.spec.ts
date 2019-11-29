import { Radon } from '../src/radon'
import { Mir, Markup } from 'src/types'
import { markupOptions } from 'src/structures'


describe('Radon', () => {
  describe('getMarkup', () => {
    describe('operator types', () => {
      it('array', () => {
        const script = [0x10]
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

      it.only('bytes', () => {
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
                // script: [0x89, [0x66, 'bpi'], [0x66,'VSD'], [0x65, 'rate_float']]
                script: [0x89],
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
})
