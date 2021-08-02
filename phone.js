const fs = require('fs')
const path = require('path')
const {v4: uuid} = require('uuid')

class Phone{
    constructor(model,price,img){
        this.model = model
        this.price = price
        this.img= img
        this.id = uuid()
    }

    toJSON(){
        return ({
            model: this.model,
            price: this.price,
            img: this.img,
            id: this.id
        })
    }

    static async update(phone) {
        const phones = await Phone.getAll()
    
        const idx = phones.findIndex(c => c.id === phone.id)
        phones[idx] = phone

        return new Promise((res,rej)=>{
            fs.writeFile(path.join(__dirname,'..','data','phones.json'),JSON.stringify(phones),
            (err) => {
                if(err) {
                    rej(err)
                }
                else{
                    res()
                }
            })
            
        })
    }

    static async getById(id) {
        const phones = await Phone.getAll()
        return phones.find(c => c.id ===id)
    }

    async save(){
        const phones = await Phone.getAll()
        phones.push(this.toJSON())
        console.log(phones);

        return new Promise((res,rej)=>{
            fs.writeFile(path.join(__dirname,'..','data','phones.json'),JSON.stringify(phones),
            (err) => {
                if(err) {
                    rej(err)
                }
                else{
                    res()
                }
            })
            
        })
       
       
    }

    static getAll() {
        return new Promise((res,rej) => {
            fs.readFile(
                path.join(__dirname,'..','data','phones.json'),
                'utf-8',
                (err,content)=>{
                    if(err) {
                        rej(err)
                    }
    
                    else{
                        res(JSON.parse(content))
                    }
                }
            )
        })
     
    }   


}

module.exports = Phone