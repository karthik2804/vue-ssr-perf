import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const server = express()

server.get('/', (req, res) => {
    const app = createSSRApp({
        template: `<div>Hello, SSR!</div>`
    })

    renderToString(app).then((html) => {
        res.send(html)
    })
})

server.listen(3000, () => {
    console.log('ready')
})