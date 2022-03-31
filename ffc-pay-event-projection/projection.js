const buildProjection = (partitionKey, frn, events) => {
  const projection = {}

  if (events.length > 0) {
    const sortedEvents = events.sort((a, b) => b.EventRaised - a.EventRaised)
    projection.correlationId = partitionKey
    if (frn) {
      projection.frn = frn
    }
    for (const event of sortedEvents) {
      projection[event.EventType] = {
        timestamp: event.timestamp,
        eventRaised: event.EventRaised,
        payload: JSON.parse(event.Payload)
      }
    }
  }

  return projection
}

module.exports = { buildProjection }
