import { graphql } from 'msw'

export const handlers = [
  // first query
  graphql.query('query', (req, res, ctx) => {
    return res(
      ctx.data({})
    )
  })
]