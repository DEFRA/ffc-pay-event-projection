const buildProjection = (message, events) => {
  const projection = {}

  if (events.length > 0) {
    const sortedEvents = events.sort((a, b) => b.EventRaised - a.EventRaised)
    projection.correlationId = message.id
    projection.agreementNumber = message.agreementNumber
    projection.paymentRequestNumber = message.paymentRequestNumber
    projection.frn = message.frn
    projection.events = []

    for (const event of sortedEvents) {
      const payload = JSON.parse(event.Payload)
      projection.events.push({
        eventType: event.EventType,
        timestamp: event.timestamp,
        eventRaised: event.EventRaised,
        payload
      })
    }
  }

  return projection
}

module.exports = { buildProjection }
