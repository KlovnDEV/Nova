let ESX = null
let MoneyCache = {}

const tick = setTick(() => {
  emit('esx:getSharedObject', obj => (ESX = obj))
  if (ESX) {
    clearTick(tick)
    init()
  }
})

function init() {}

onNet('money:update', (name, identifier, amount) => {
  if (!MoneyCache[identifier]) {
    MoneyCache[identifier] = {}
  }
  MoneyCache[identifier][name] = amount
})

onNet('money:updateAll', data => {
  MoneyCache = data
})

on('money:get', (name, identifier, cb) => {
  if (!MoneyCache[identifier]) {
    cb(null)
    return
  }

  cb(MoneyCache[identifier][name])
})
