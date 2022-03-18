const { queryEntities } = require('./storage')
const { buildProjection } = require('./projection')

module.exports = async function (context, message) {
  context.log.info(`Received: ${JSON.stringify(message)}`)
  try {
    if (message?.id) {
      const partitionKey = message.id
      const events = await queryEntities(partitionKey)
      context.log.info(`Event found: ${JSON.stringify(events)}`)
      const projection = buildProjection(partitionKey, events)
      context.log.info(`Projection built: ${JSON.stringify(projection)}`)
      context.bindings.blobBinding = projection
      context.done()
    }
  } catch (error) {
    context.log.error('Unable to process message:', error)
  }
}
