jest.mock('../../ffc-pay-event-projection/storage')
const mockStorage = require('../../ffc-pay-event-projection/storage')
jest.mock('../../ffc-pay-event-projection/projection')
const mockProjection = require('../../ffc-pay-event-projection/projection')
const processProjection = require('../../ffc-pay-event-projection/index')
const mockContext = require('../mock-context')

describe('index function', () => {
  const message = { id: '123' }

  afterEach(async () => {
    jest.resetAllMocks()
  })

  test('receives message from service bus with no id with no calls to queryEntities and buildProjection', async () => {
    await processProjection(mockContext, null)

    expect(mockStorage.queryEntities).toHaveBeenCalledTimes(0)
    expect(mockProjection.buildProjection).toHaveBeenCalledTimes(0)
    expect(mockContext.bindings.blobBinding).toEqual(undefined)
    expect(mockContext.done.mock.calls.length).toEqual(0)
  })

  test('receives message from service bus and successfully calls queryEntities and buildProjection', async () => {
    mockStorage.queryEntities.mockResolvedValue({})
    mockProjection.buildProjection.mockResolvedValue(message)

    await processProjection(mockContext, message)

    expect(mockStorage.queryEntities).toHaveBeenCalledTimes(1)
    expect(mockProjection.buildProjection).toHaveBeenCalledTimes(1)
    expect(mockContext.bindings).toHaveProperty('blobBinding')
    expect(mockContext.done.mock.calls.length).toEqual(1)
  })

  test('an error is thrown (and logged) when an error occurs', async () => {
    mockStorage.queryEntities.mockImplementation(() => { throw new Error() })
    await processProjection(mockContext, message)
    expect(mockContext.log.error).toHaveBeenCalledTimes(1)
  })
})
