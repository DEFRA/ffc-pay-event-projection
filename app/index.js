const { queryEntities } = require('./storage')
const { buildProjection } = require('./projection')

module.exports = async function (context, message) {
  try {
    if (message?.id) {
      const partitionKey = message.id
      const events = await queryEntities(partitionKey)
      const projection = buildProjection(partitionKey, events)
      context.bindings.blobBinding = projection
      context.done()
    }
  } catch (error) {
    context.log.error('Unable to process message:', error)
  }
}
