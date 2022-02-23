const buildProjection = (partitionKey, events) => {
  const projection = {}
  for (const event of events) {
    projection[event.EventType] = {
      timestamp: event.timestamp,
      eventType: event.EventType,
      payload: JSON.parse(event.Payload)
    }
  }

  projection.invoiceNumber = partitionKey

  return projection
}

module.exports = { buildProjection }
