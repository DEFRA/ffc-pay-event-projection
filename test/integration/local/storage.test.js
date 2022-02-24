const { queryEntities } = require('../../../app/storage')
jest.mock('@azure/data-tables', () => {
  return {
    odata: jest.fn(),
    TableClient: jest.fn().mockImplementation(() => {
      return {
        createTable: jest.fn(),
        listEntities: jest.fn().mockImplementation(() => {
          return [
            { PartitionKey: '123', RowKey: '456', event: 'event1' },
            { PartitionKey: '123', RowKey: '789', event: 'event2' },
            { PartitionKey: '123', RowKey: '101112', event: 'event3' }
          ]
        })
      }
    })
  }
})

describe('storage function', () => {
  afterEach(async () => {
    jest.resetAllMocks()
  })

  test('return 3 events', async () => {
    const partitionKey = '123'
    const events = await queryEntities(partitionKey)
    expect(events.length).toEqual(3)
  })

  test('return 0 events as no partition key is supplied', async () => {
    const events = await queryEntities()
    expect(events.length).toEqual(0)
  })
})
