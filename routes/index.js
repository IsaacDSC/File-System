const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

//adionando algaritmo e senha
const alg = 'aes-256-ctr'
const pwd = '!@#(!1!2!3!)'


fs.readdir('./', (err, paths) => {
    console.log(paths)
})

router.get('/', (req, res) => {
    fs.readdir('./files/uploads', (err, paths) => {
        res.render('index/index', { paths: paths })
    })
})

router.post('/action', (req, res) => {
    if (req.body.action == 'cript') {
        var file = req.body.file
        const read = fs.createReadStream('../files/uploads/' + file)
        const write = fs.createWriteStream('criptografada:/' + file)
        const cipher = crypto.createCipher(alg, pwd)

        read.pipe(cipher).pipe(write)
    }
    if (req.body.action == 'decript') {

    } else {
        res.send('Você deve selecionar uma opção!')
    }
})

module.exports = router