import { graphql } from 'msw'

export const handlers = [

  graphql.query('query', (req, res, ctx) => {
    return res(
      ctx.data({})
    )
  })
  
]