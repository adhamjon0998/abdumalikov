const fs = require('fs')
const path = require('path')
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)


class Card {
    static async add(cros) {
        const card = await Card.fetch()

        const idx = card.crosses.findIndex(c => c.id === cros.id)
        const condidate = card.crosses[idx]

        if (condidate) {
            // красовки уже есть
            condidate.count++
            card.crosses[idx] = condidate
        } else {
            // нужно добавить курс
            cros.count = 1
            card.crosses.push(cros)
        }
        card.price += +cros.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }

}

module.exports = Card