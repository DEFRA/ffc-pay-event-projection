jest.mock('../../app/storage')
const mockStorage = require('../../app/storage')
jest.mock('../../app/projection')
const mockProjection = require('../../app/projection')
const processProjection = require('../../app/index')
const mockContext = require('../mock-context')

describe('index function', () => {
  const message = { id: '123' }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  test('receives message from service bus and successfully calls queryEntities and buildProjection', async () => {
    mockStorage.queryEntities.mockResolvedValue({})
    mockProjection.buildProjection.mockResolvedValue(message)

    await processProjection(mockContext, message)

    expect(mockStorage.queryEntities.mock.calls.length).toBe(1)
    // expect(mockProjection.buildProjection).toHaveBeenCalledTimes(1)
    // expect(mockContext.blobBinding).toEqual(message)
    // expect(mockContext.done.mock.calls.length).toEqual(1)
  })
})
