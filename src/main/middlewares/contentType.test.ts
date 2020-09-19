import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  it('Should return default content type as json', async () => {
    app.get('/test_content_type', (request, response) => {
      response.send('')
    })
    await request(app).get('/test_content_type').expect('content-type', /json/)
  })

  it('Should return XML content type when forced', async () => {
    app.get('/test_content_type_xml', (request, response) => {
      response.type('xml')
      response.send('')
    })
    await request(app).get('/test_content_type_xml').expect('content-type', /xml/)
  })
})
