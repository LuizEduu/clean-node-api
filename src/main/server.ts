import app from './config/app'

app.get('/', (request, response) => {
  return response.send('Hello Word')
})

app.listen(3333, () => {
  console.log('server is running')
})
