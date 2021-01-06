import lodash from 'lodash'
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  // console.log(action)
  const stateTmp=lodash.cloneDeep(state)

  switch (action.type) {
  case 'GOOD':
    stateTmp.good=stateTmp.good+1
    return stateTmp
  case 'OK':
    stateTmp.ok=stateTmp.ok+1
    return stateTmp
  case 'BAD':
    stateTmp.bad=stateTmp.bad+1
    return stateTmp
  case 'ZERO':
    return initialState
  default: return state
  }

}

export default counterReducer