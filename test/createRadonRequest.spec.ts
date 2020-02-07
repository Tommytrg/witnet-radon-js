import { Radon, } from '../src/radon'
import {
  MirRequest,
  AggregationTallyReducer,
} from '../src/types'

describe('Radon', () => {
  it('addOperator', () => {
    const mir: MirRequest = {
      timelock: 0,
      retrieve: [
        {
          kind: 'HTTP-GET',
          url: 'source_1',
          script: [],
        },
      ],
      aggregate: {
        filters: [],
        reducer: AggregationTallyReducer.mode,
      },
      tally: {
        filters: [],
        reducer: AggregationTallyReducer.mode,
      },
    }
    const radon = new Radon(mir)
    expect(radon.getMarkup().retrieve[0].script).toStrictEqual([])
    radon.addOperator(2)

    // Expect to have string parse json map option
    expect(radon.getMarkup().retrieve[0].script[0].options[7].label).toBe('StringParseJsonMap')
    // update operator with stringparsejsonmap option
    radon.update(7, 'StringParseJsonMap')

    radon.addOperator(2)

    expect(radon.getMarkup().retrieve[0].script[1].options[1].label).toBe('MapGetArray')

    radon.update(8, 'MapGetArray')

    console.log(radon.getMarkup().retrieve[0].script[1].selected)
    // console.log(radon.getMarkup().retrieve[0].script)


  })
})