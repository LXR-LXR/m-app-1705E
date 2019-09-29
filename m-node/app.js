const express = require('express')
const cors = require('cors')
const { queryPromise } = require('./mysqlQuery')

const app = express()

app.use(cors())

app.get('/api/get_user', async (req, res) => {
  let token = req.headers.token
  console.log(token)
  let users = await queryPromise('select * from user')
  res.send({
    code: 400,
    data: users,
    message: '用户列表'
  })
})

app.listen(3000, () => {
  console.log('3000端口')
})