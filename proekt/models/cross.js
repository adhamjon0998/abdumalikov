const { v4: uuid } = require('uuid')
const fs = require('fs')
const path = require('path')
class Cross {
    constructor(model, price, img) {
        this.model = model,
            this.price = price,
            this.img = img,
            this.id = uuid()

    }

    toJSON() {
        return {
            model: this.model,
            price: this.price,
            img: this.img,
            id: this.id
        }

    }

    static async update(cros) {
        const crosses = await Cross.getAll()

        const idx = crosses.findIndex(c => c.id === cros.id)
        crosses[idx] = cros

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'crosses.json'),
                JSON.stringify(crosses),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    async save() {
        const crosses = await Cross.getAll()
        crosses.push(this.toJSON())

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'crosses.json'),
                JSON.stringify(crosses),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })

    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'crosses.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(JSON.parse(content))
                    }
                }
            )
        })

    }

    static async getById(id) {
        const crosses = await Cross.getAll()
        return crosses.find(c => c.id === id)
    }
}

module.exports = Cross