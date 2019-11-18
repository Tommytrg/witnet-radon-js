import { markup2mir } from './markup2mir'
import { Radon } from './radon'
import { mir2markup } from './mir2markup'
import { Mir } from './types'

export { Radon, markup2mir, mir2markup }

export default {
  Radon,
  markup2mir,
  mir2markup,
}

const dr = {
  creationDate: 1574349677396,
  description: '',
  id: '8f9902dc-94e5-496e-bbe1-e1b28b7ed45e',
  name: 'template',
  radRequest: {
    description: '',
    name: 'template',
    radRequest: {
      retrieve: [{ script: [0x75, 0x40, 0x41], url: '' }, { script: [0x75], url: '' }],
      aggregate: [80],
      tally: [80],
      timelock: 0,
    },
  },
}

const radon = new Radon(dr.radRequest as Mir).getMarkup()
// radon.updateMarkup(6, 'asBoolean')
console.dir(radon, { depth: null })
