const getForms = async (req, res) => {
  const {formId} = req.params
  const {filters, ...restQueryParams} = req.query

  const payload = await fetch(`https://api.fillout.com/v1/api/forms/${formId}/submissions?${new URLSearchParams(restQueryParams)}`, {
    headers: {
      Authorization: `Bearer ${process.env.FILLOUT_API_KEY}`
    }
  })
  const jsonPayload = await payload.json()

  const jsonFilters = JSON.parse(filters || "[]")

  if(!Array.isArray(jsonFilters)) {
    res.status(400).json({message: "filters param should be formatted as an array"})
    return
  }

  const responses = [...jsonPayload.responses]
    .filter(response => {
      const questions = response.questions
      let matches = true

      jsonFilters.forEach(filter => {
        const question = questions.find(q => filter.id === q.id)

        if(filter.condition === "equals") {
          if(question.value !== filter.value) {
            matches = false
          }
        } else if(filter.condition === "does_not_equal") {
          if(question.value === filter.value) {
            matches = false
          }
        } else if(filter.condition === "greater_than") {
          if(question.value <= filter.value) {
            matches = false
          }
        } else if(filter.condition === "less_than") {
          if(question.value >= filter.value) {
            matches = false
          }
        }
      })

    return matches
  })

  res.send({...jsonPayload,responses})
}

module.exports = {
  getForms
}
