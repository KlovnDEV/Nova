let ESX = null
emit('esx:getSharedObject', obj => {
  ESX = obj
})
const MoneySet = new Set()

class Money {
  #amount

  constructor(name, identifier, amount) {
    this.name = name
    this.identifier = identifier

    MoneySet.add(this)

    const res = exports.db.post(
      'money/get',
      JSON.stringify({
        name: this.name,
        identifier: this.identifier,
      }),
    )

    if (res[0] === 200) {
      const body = JSON.parse(res[1])
      this.#amount = body.amount || amount || 0
      this.update()
    }

    this.Get = () => {
      return this.amount
    }

    this.Set = (amount, description) => {
      this.amount = amount
      console.log(`Set money ${amount} (${description})`)
    }

    this.Add = (amount, description) => {
      this.amount += amount
      console.log(`Add money ${amount} (${description})`)
    }

    this.Remove = (amount, description) => {
      if (!this.IsEnough(amount)) {
        console.log(`Remove money failed ${amount} (${description})`)
        return false
      }

      this.amount -= amount
      console.log(`Remove money ${amount} (${description})`)
      return true
    }

    this.IsEnough = amount => {
      return this.amount >= amount
    }
  }

  get amount() {
    return this.#amount
  }

  set amount(value) {
    const OldAmount = this.#amount
    this.#amount = value

    const res = exports.db.post(
      'money/set',
      JSON.stringify({
        name: this.name,
        identifier: this.identifier,
        amount: value,
      }),
    )

    if (res[0] !== 200) {
      this.#amount = OldAmount
      return false
    }

    this.update()

    return true
  }

  update() {
    const xPlayer = ESX.GetPlayerFromIdentifier(this.identifier)
    emitNet('money:update', xPlayer ? xPlayer.source : -1, this.name, this.identifier, this.amount)
  }
}

function updateAllData(xPlayer) {
  const allData = {}

  for (const money of MoneySet) {
    if (!allData[money.identifier]) {
      allData[money.identifier] = {}
    }

    allData[money.identifier][money.name] = money.amount
  }

  emitNet('money:updateAll', xPlayer.source, allData)
}

on('esx:playerLoaded', (playerId, xPlayer) => {
  if (xPlayer) {
    updateAllData(xPlayer)
  }
})

exports('new', (name, identifier, amount) => {
  return new Money(name, identifier, amount)
})

exports('test', () => {
  updateAllData(ESX.GetPlayerFromIdentifier('9428e5f193a7dd413d98c62db7340c1c791dbec2'))
})
