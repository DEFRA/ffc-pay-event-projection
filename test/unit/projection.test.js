const { buildProjection } = require('../../ffc-pay-event-projection/projection')

describe('projection function', () => {
  const events = [
    {
      EventType: 'InvoiceCreated',
      timestamp: '2019-01-01T00:00:00.000Z',
      Payload: '{"id":"123","invoiceNumber":"123","invoiceDate":"2019-01-01T00:00:00.000Z","invoiceTotal":100,"invoiceStatus":"Draft"}'
    }
  ]

  afterEach(async () => {
    jest.resetAllMocks()
  })

  test('projection is created from the events payload', async () => {
    const projectionOutput = {
      InvoiceCreated: {
        timestamp: '2019-01-01T00:00:00.000Z',
        eventType: 'InvoiceCreated',
        payload: {
          id: '123',
          invoiceNumber: '123',
          invoiceDate: '2019-01-01T00:00:00.000Z',
          invoiceTotal: 100,
          invoiceStatus: 'Draft'
        }
      },
      invoiceNumber: '1234567890'
    }

    const projection = await buildProjection('1234567890', events)
    expect(projection).toEqual(projectionOutput)
  })

  test('no projection is created with empty events payload', async () => {
    const projection = await buildProjection('1234567890', [])
    expect(projection).toEqual({})
  })
})
