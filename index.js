var express = require('express')

var bp = require('body-parser')

var request = require('request')

let URL = 'http://api.wolframalpha.com/v1/spoken'

app = express()
app.use(bp.json())

var port = process.env.PORT || 3000;


app.post("/api/login", (req, resp) => {
    let data = req.body
    resp.setHeader('Content-Type', 'application/json')
    if(data.name == 'Prasanna' && data.password == 'Prasanna123'){
        resp.send(JSON.stringify({
            success : true
        }))
    }else{
        resp.send(JSON.stringify({
            success : false
        }))
    }
})

function send_response(res, body, resp){
    if(body!=null){
        resp.setHeader('Content-Type', 'application/json')
        resp.send(JSON.stringify({
            success : true,
            content : body
        }))
    }
}

app.post('/api/query', (req, resp) => {
    let query = req.body.query_string
    if(query!= null){
        console.log(query)
        request.get({url : URL, qs : {'appid' : '6JKYLV-4YG98RJUPV', 'i' : query}}, (err, res, body) =>{
               send_response(res, body, resp)
        })
      }
    })

app.listen(port, () => {
    console.log('Server running')
})