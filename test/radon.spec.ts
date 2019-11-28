   // import {
//   MirScript,
//   OutputType,
//   OperatorCode,
//   MirOperator,
//   Reducer,
//   MarkupHierarchicalType,
//   MarkupType,
//   CachedArgument,
// } from '../src/types'
// import { operatorInfos } from '../src/structures'
// import rewire from 'rewire'
import { Radon } from '../src/radon'
import { Mir } from 'src/types'
describe('Radon', () => {
  describe('getMarkup', () => {
    describe('one operator', () => {

      const mir: Mir = {
        name: '',
        description: '',
        radRequest: {
          notBefore: 0,
          retrieve: [ { url: '', script: [137] } ],
          aggregate: [137],
          tally: [137]
        }
      }

      const radon = new Radon(mir)
      const result = radon.getMarkup()

      expect(result).toStrictEqual({})      
    })
  })
})

// describe('Radon', () => {
//   it('generateMarkupScript', () => {
//     const { Radon } = require('../src/radon')
//     const script: MirScript = [137, [102, 'bpi'], [102, 'VSD'], [101, 'rate_float']]

//     const radonMarkup = new Radon()

//     const generateMarkupOperator = (Radon.prototype.generateMarkupOperator = jest
//       .fn()
//       .mockReturnValueOnce(1)
//       .mockReturnValueOnce(2)
//       .mockReturnValueOnce(3)
//       .mockReturnValueOnce(4))
//     const wrapResultInCache = (Radon.prototype.wrapResultInCache = jest.fn())
//     radonMarkup.generateMarkupScript(script)

//     expect(generateMarkupOperator).toHaveBeenNthCalledWith(1, script[0])
//     expect(generateMarkupOperator).toHaveBeenNthCalledWith(2, script[1])
//     expect(generateMarkupOperator).toHaveBeenNthCalledWith(3, script[2])
//     expect(generateMarkupOperator).toHaveBeenNthCalledWith(4, script[3])

//     expect(wrapResultInCache).toHaveBeenNthCalledWith(1, 1)
//     expect(wrapResultInCache).toHaveBeenNthCalledWith(2, 2)
//     expect(wrapResultInCache).toHaveBeenNthCalledWith(3, 3)
//     expect(wrapResultInCache).toHaveBeenNthCalledWith(4, 4)
//   })

//   describe('expect generateMarkupOperator returns the correct markup operator', () => {
//     it('without arguments', () => {
//       const { Radon } = require('../src/radon')

//       const radonMarkup = new Radon()
//       const operatorCode = 0x11
//       const args: [] = []
//       const operator = operatorCode

//       const wrapResultInCache = (Radon.prototype.wrapResultInCache = jest.fn(() => ({
//         id: 1,
//       })))
//       const generateSelectedOption = (Radon.prototype.generateSelectedOption = jest.fn())
//       const generateMarkupOptions = (Radon.prototype.generateMarkupOptions = jest.fn(() => []))

//       const getMirOperatorInfo = (Radon.prototype.getMirOperatorInfo = jest.fn(() => ({
//         code: operatorCode,
//         args,
//       })))

//       const findOutputType = (Radon.prototype.findOutputType = jest.fn(() => OutputType.Boolean))

//       const result = radonMarkup.generateMarkupOperator(operator)
//       expect(getMirOperatorInfo).toHaveBeenCalledWith(operator)
//       expect(findOutputType).toHaveBeenCalledWith(operatorCode)
//       expect(generateSelectedOption).toHaveBeenCalledWith(
//         operatorInfos[operatorCode],
//         operatorCode,
//         args
//       )
//       expect(generateMarkupOptions).toHaveBeenCalledWith(
//         operatorInfos[operatorCode],
//         operatorCode,
//         args
//       )
//       expect(wrapResultInCache).toBeCalled()
//       expect(result).toStrictEqual({
//         hierarchicalType: 'operator',
//         id: 0,
//         markupType: 'select',
//         options: [],
//         outputType: 'boolean',
//         scriptId: 0,
//         selected: { id: 1 },
//       })
//     })

//     it('with 1 argument', () => {
//       const { Radon } = require('../src/radon')

//       const radonMarkup = new Radon()
//       const operator = [0x65, 'key'] as MirOperator

//       const args = ['key']
//       const operatorCode = 0x65 as OperatorCode

//       const wrapResultInCache = (Radon.prototype.wrapResultInCache = jest.fn(() => ({
//         id: 1,
//       })))
//       const generateSelectedOption = (Radon.prototype.generateSelectedOption = jest.fn())
//       const generateMarkupOptions = (Radon.prototype.generateMarkupOptions = jest.fn(() => []))

//       const getMirOperatorInfo = (Radon.prototype.getMirOperatorInfo = jest.fn(() => ({
//         code: operatorCode,
//         args,
//       })))

//       const findOutputType = (Radon.prototype.findOutputType = jest.fn(() => OutputType.Integer))

//       const result = radonMarkup.generateMarkupOperator(operator)
//       expect(getMirOperatorInfo).toHaveBeenCalledWith(operator)
//       expect(findOutputType).toHaveBeenCalledWith(operatorCode)
//       expect(generateSelectedOption).toHaveBeenCalledWith(
//         operatorInfos[operatorCode],
//         operatorCode,
//         args
//       )
//       expect(generateMarkupOptions).toHaveBeenCalledWith(
//         operatorInfos[operatorCode],
//         operatorCode,
//         args
//       )
//       expect(wrapResultInCache).toBeCalled()

//       expect(result).toStrictEqual({
//         hierarchicalType: 'operator',
//         id: 0,
//         markupType: 'select',
//         options: [],
//         outputType: 'integer',
//         scriptId: 0,
//         selected: { id: 1 },
//       })
//     })
//   })

//   describe('generateSelectedOption', () => {
//     it('without arguments', () => {
//       const { Radon } = require('../src/radon')

//       const radonMarkup = new Radon()
//       const operatorCode = 0x10 as OperatorCode
//       const args: [] = []
//       const operatorInfo = operatorInfos[operatorCode]

//       const findOutputType = (Radon.prototype.findOutputType = jest.fn(() => OutputType.Integer))

//       const result = radonMarkup.generateSelectedOption(operatorInfo, operatorCode, args)
//       expect(findOutputType).toHaveBeenCalledWith(operatorCode)
//       expect(result).toStrictEqual({
//         arguments: [],
//         hierarchicalType: 'selectedOperatorOption',
//         label: 'count',
//         markupType: 'option',
//         outputType: 'integer',
//       })
//     })

//     it('with 1 argument', () => {
//       const { Radon } = require('../src/radon')

//       const radonMarkup = new Radon()
//       const operatorCode = 0x12 as OperatorCode
//       const args = [0]
//       const operatorInfo = operatorInfos[operatorCode]

//       const findOutputType = (Radon.prototype.findOutputType = jest.fn(() => OutputType.Inner))

//       const argument = {
//         id: 1,
//       } as CachedArgument

//       const generateOperatorArguments = (Radon.prototype.generateOperatorArguments = jest.fn(() => [
//         argument,
//       ]))

//       const result = radonMarkup.generateSelectedOption(operatorInfo, operatorCode, args)
//       expect(generateOperatorArguments).toHaveBeenCalledWith(operatorInfo, args)
//       expect(findOutputType).toHaveBeenCalledWith(operatorCode)
//       expect(result).toStrictEqual({
//         arguments: [{ id: 1 }],
//         hierarchicalType: 'selectedOperatorOption',
//         label: 'flatten',
//         markupType: 'option',
//         outputType: 'inner',
//       })
//     })
//   })

//   it('generateFilterArgument', () => {
//     const { Radon } = require('../src/radon')

//     const radonMarkup = new Radon()
//     const filterArgs = [0x00, 1]

//     const wrapResultInCache = (Radon.prototype.wrapResultInCache = jest.fn(() => ({ id: 1 })))
//     const generateSelectedFilterArgumentResult = 'generateSelectedFilterArgumentResult'
//     const generateSelectedFilterArgument = (Radon.prototype.generateSelectedFilterArgument = jest.fn(
//       () => generateSelectedFilterArgumentResult
//     ))
//     const result = radonMarkup.generateFilterArgument('function', filterArgs)
//     expect(generateSelectedFilterArgument).toBeCalledWith(filterArgs)
//     expect(wrapResultInCache).toBeCalledWith(generateSelectedFilterArgumentResult)
//     expect(result).toStrictEqual({
//       hierarchicalType: 'argument',
//       id: 0,
//       label: 'function',
//       markupType: 'select',
//       options: [
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'greaterThan',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'LessThan',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'equals',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'deviationAbsolute',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'deviationRelative',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'deviationStandard',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'top',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'bottom',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'lessOrEqualThan',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'greaterOrEqualThan',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'notEquals',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'notDeviationAbsolute',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'notDeviationRelative',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'notDeviationStandard',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'notTop',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'notBottom',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//       ],
//       scriptId: 0,
//       selected: {
//         id: 1,
//       },
//     })
//   })

//   it('generateReducerArgument', () => {
//     const { Radon } = require('../src/radon')

//     const radonMarkup = new Radon()
//     const reducerCode: Reducer = 0x00

//     const wrapResultInCache = (Radon.prototype.wrapResultInCache = jest.fn(() => ({ id: 1 })))
//     const generateSelectedReducerArgumentResult = 'generateSelectedReducerArgumentResult'
//     const generateSelectedReducerArgument = (Radon.prototype.generateSelectedReducerArgument = jest.fn(
//       () => generateSelectedReducerArgumentResult
//     ))
//     const result = radonMarkup.generateReducerArgument('function', reducerCode)
//     expect(generateSelectedReducerArgument).toBeCalledWith(reducerCode)
//     expect(wrapResultInCache).toBeCalledWith(generateSelectedReducerArgumentResult)
//     expect(result).toStrictEqual({
//       hierarchicalType: 'argument',
//       id: 0,
//       label: 'function',
//       markupType: 'select',
//       options: [
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'min',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'max',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'mode',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'averageMean',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'averageMeanWeighted',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'averageMedian',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'averageMedianWeighted',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'deviationStandard',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'deviationAverage',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'deviationMedian',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//         {
//           hierarchicalType: 'operatorOption',
//           label: 'deviationMaximum',
//           markupType: 'option',
//           outputType: 'bytes',
//         },
//       ],
//       scriptId: 0,
//       outputType: OutputType.Bytes,
//       selected: {
//         id: 1,
//       },
//     })
//   })

//   it('generateInputArgument', () => {
//     const { Radon } = require('../src/radon')
//     const value = 1
//     const radonMarkup = new Radon()
//     const result = radonMarkup.generateInputArgument('by', value)

//     expect(result).toStrictEqual({
//       hierarchicalType: MarkupHierarchicalType.Argument,
//       id: 0,
//       label: 'by',
//       markupType: MarkupType.Input,
//       value,
//     })
//   })

//   it('generateSelectedFilterArgument', () => {
//     const { Radon } = require('../src/radon')

//     const radonMarkup = new Radon()
//     const filterArgs = [0x00, 1]
//     const wrapResultInCache = (Radon.prototype.wrapResultInCache = jest.fn(() => ({ id: 1 })))
//     const generateInputArgument = (Radon.prototype.generateInputArgument = jest.fn(
//       () => 'inputArgumentResult'
//     ))

//     const result = radonMarkup.generateSelectedFilterArgument(filterArgs)
//     expect(wrapResultInCache).toBeCalledWith('inputArgumentResult')
//     expect(generateInputArgument).toBeCalledWith('by', filterArgs[1])

//     expect(result).toStrictEqual({
//       arguments: [{ id: 1 }],
//       hierarchicalType: 'selectedOperatorOption',
//       label: 'greaterThan',
//       markupType: 'option',
//       outputType: 'bytes',
//     })
//   })

//   it('generateSelectedReducerArgument', () => {
//     const { Radon } = require('../src/radon')

//     const radonMarkup = new Radon()
//     const reducerCode = 0x00

//     const result = radonMarkup.generateSelectedReducerArgument(reducerCode)

//     expect(result).toStrictEqual({
//       arguments: [],
//       hierarchicalType: 'selectedOperatorOption',
//       label: 'min',
//       markupType: 'option',
//       outputType: 'bytes',
//     })
//   })

//   it('unwrapSource', () => {
//     const { Radon } = require('../src/radon')
//     const radonMarkup = new Radon()
//     const cacheRef = { id: 1 }
//     const unwrapResultFromCache = (Radon.prototype.unwrapResultFromCache = jest.fn(() => ({
//       url: 'url',
//       script: [{ id: 2 }],
//     })))
//     const unwrapScript = (Radon.prototype.unwrapScript = jest.fn(() => [{}]))
//     const result = radonMarkup.unwrapSource(cacheRef)

//     expect(result).toStrictEqual({ url: 'url', script: [{}] })
//     expect(unwrapResultFromCache).toBeCalledWith({ id: 1 })
//     expect(unwrapScript).toBeCalledWith([{ id: 2 }])
//   })

//   it('unwrapScript', () => {
//     const { Radon } = require('../src/radon')
//     const radonMarkup = new Radon()
//     const cachedScript = [{ id: 1 }, { id: 2 }]
//     const cachedMarkupOperator1 = {
//       id: 1,
//       scriptId: 0,
//       markupType: MarkupType.Select,
//       hierarchicalType: MarkupHierarchicalType.Operator,
//       outputType: OutputType.Bytes,
//       selected: { id: 8 },
//       options: [],
//       label: 'label',
//     }
//     const cachedMarkupOperator2 = {
//       id: 2,
//       scriptId: 0,
//       markupType: MarkupType.Select,
//       hierarchicalType: MarkupHierarchicalType.Operator,
//       outputType: OutputType.Bytes,
//       selected: { id: 9 },
//       options: [],
//       label: 'label',
//     }
//     const unwrapResultFromCache = (Radon.prototype.unwrapResultFromCache = jest
//       .fn()
//       .mockReturnValueOnce(cachedMarkupOperator1)
//       .mockReturnValueOnce(cachedMarkupOperator2))
//     const unwrapOperator = (Radon.prototype.unwrapOperator = jest
//       .fn()
//       .mockReturnValueOnce(3)
//       .mockReturnValueOnce(4))
//     const result = radonMarkup.unwrapScript(cachedScript)

//     expect(result).toStrictEqual([3, 4])
//     expect(unwrapResultFromCache).toBeCalledTimes(2)
//     expect(unwrapOperator).toHaveBeenNthCalledWith(1, cachedMarkupOperator1, 1)
//     expect(unwrapOperator).toHaveBeenNthCalledWith(2, cachedMarkupOperator2, 2)
//   })

//   it('unwrapOperator', () => {
//     const { Radon } = require('../src/radon')
//     const radonMarkup = new Radon()
//     const cachedMarkupOperator = {
//       id: 1,
//       scriptId: 0,
//       markupType: MarkupType.Select,
//       hierarchicalType: MarkupHierarchicalType.Operator,
//       outputType: OutputType.Bytes,
//       selected: { id: 8 },
//       options: [],
//       label: 'label',
//     }

//     const selectedOption = {
//       arguments: [],
//       hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
//       label: 'label',
//       markupType: MarkupType.Option,
//       outputType: OutputType.Bytes,
//     }

//     const markupOperator = {
//       id: 1,
//       scriptId: 0,
//       markupType: MarkupType.Select,
//       hierarchicalType: MarkupHierarchicalType.Operator,
//       outputType: OutputType.Bytes,
//       selected: selectedOption,
//       options: [],
//       label: 'label',
//     }

//     const unwrapSelectedOption = (Radon.prototype.unwrapSelectedOption = jest.fn(
//       () => selectedOption
//     ))

//     const result = radonMarkup.unwrapOperator(cachedMarkupOperator, 1)

//     expect(result).toStrictEqual(markupOperator)
//     expect(unwrapSelectedOption).toBeCalledWith({ id: 8 })
//   })

//   describe('unwrapSelectedOption', () => {
//     it('with arguments', () => {
//       const { Radon } = require('../src/radon')
//       const radonMarkup = new Radon()
//       const cacheRef = { id: 1 }
//       const markupArgument = {
//         id: 0,
//         label: 'label',
//         markupType: MarkupType.Input,
//         hierarchicalType: MarkupHierarchicalType.Argument,
//         value: 'value',
//       }
//       const cachedSelectedOption = {
//         arguments: [{ id: 2 }],
//         hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
//         label: 'label',
//         markupType: MarkupType.Option,
//         outputType: OutputType.Bytes,
//       }
//       const selectedOption = {
//         arguments: [markupArgument],
//         hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
//         label: 'label',
//         markupType: MarkupType.Option,
//         outputType: OutputType.Bytes,
//       }
//       const unwrapResultFromCache = (Radon.prototype.unwrapResultFromCache = jest.fn(
//         () => cachedSelectedOption
//       ))
//       const unwrapArgument = (Radon.prototype.unwrapArgument = jest.fn(() => markupArgument))
//       const result = radonMarkup.unwrapSelectedOption(cacheRef)

//       expect(result).toStrictEqual(selectedOption)
//       expect(unwrapResultFromCache).toBeCalledWith({ id: 1 })
//       expect(unwrapArgument).toBeCalledWith({ id: 2 })
//     })

//     it('without arguments', () => {
//       const { Radon } = require('../src/radon')
//       const radonMarkup = new Radon()
//       const cacheRef = { id: 1 }
//       const cachedSelectedOption = {
//         arguments: [],
//         hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
//         label: 'label',
//         markupType: MarkupType.Option,
//         outputType: OutputType.Bytes,
//       }
//       const selectedOption = {
//         arguments: [],
//         hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
//         label: 'label',
//         markupType: MarkupType.Option,
//         outputType: OutputType.Bytes,
//       }
//       const unwrapResultFromCache = (Radon.prototype.unwrapResultFromCache = jest.fn(
//         () => cachedSelectedOption
//       ))
//       const unwrapArgument = (Radon.prototype.unwrapArgument = jest.fn())
//       const result = radonMarkup.unwrapSelectedOption(cacheRef)

//       expect(result).toStrictEqual(selectedOption)
//       expect(unwrapResultFromCache).toBeCalledWith({ id: 1 })
//       expect(unwrapArgument).toBeCalledTimes(0)
//     })
//   })

//   describe('unwrapArgument', () => {
//     it('Input type', () => {
//       const { Radon } = require('../src/radon')
//       const radonMarkup = new Radon()
//       const cacheRef = { id: 1 }

//       const inputArgument = {
//         hierarchicalType: MarkupHierarchicalType.Argument,
//         id: 1,
//         label: 'label',
//         markupType: MarkupType.Input,
//         value: 'value',
//       }

//       const unwrapResultFromCache = (Radon.prototype.unwrapResultFromCache = jest.fn(
//         () => inputArgument
//       ))
//       const unwrapSelectedOption = (Radon.prototype.unwrapSelectedOption = jest.fn())

//       const result = radonMarkup.unwrapArgument(cacheRef)

//       expect(result).toStrictEqual(inputArgument)
//       expect(unwrapResultFromCache).toBeCalledWith(cacheRef)
//       expect(unwrapSelectedOption).toBeCalledTimes(0)
//     })

//     it('Select type', () => {
//       const { Radon } = require('../src/radon')
//       const radonMarkup = new Radon()
//       const cacheRef = { id: 1 }

//       const selectedOption = {
//         arguments: [],
//         hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
//         label: 'label',
//         markupType: MarkupType.Option,
//         outputType: OutputType.Bytes,
//       }

//       const cachedSelectArgument = {
//         id: 1,
//         scriptId: 0,
//         markupType: MarkupType.Select,
//         hierarchicalType: MarkupHierarchicalType.Operator,
//         outputType: OutputType.Bytes,
//         selected: { id: 2 },
//         options: [],
//         label: 'label',
//       }
//       const selectArgument = {
//         id: 1,
//         scriptId: 0,
//         markupType: MarkupType.Select,
//         hierarchicalType: MarkupHierarchicalType.Operator,
//         outputType: OutputType.Bytes,
//         selected: selectedOption,
//         options: [],
//         label: 'label',
//       }

//       const unwrapSelectedOption = (Radon.prototype.unwrapSelectedOption = jest.fn(
//         () => selectedOption
//       ))

//       const unwrapResultFromCache = (Radon.prototype.unwrapResultFromCache = jest.fn(
//         () => cachedSelectArgument
//       ))

//       const result = radonMarkup.unwrapArgument(cacheRef)

//       expect(result).toStrictEqual(selectArgument)
//       expect(unwrapResultFromCache).toBeCalledWith(cacheRef)
//       expect(unwrapSelectedOption).toBeCalledWith({ id: 2 })
//     })

//     describe('methods to interact with cache', () => {
//       it('wrapResultInCache', () => {
//         const Radon = rewire('../src/radon')

//         Radon.__get__('')
//       })
//     })
//   })
// })
