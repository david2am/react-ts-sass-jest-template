# Information and Usage

_Note:_ Feel free to remove this file from your project

## Stack of Technologies
* Vite
* Typescript
* sass
* Jest
* Testing-Library
* Mock Service Worker (msw)

## Use degit

```
// cmd | terminal

npm i -g degit
```

### Scaffold and enjoy!
```
// cmd | terminal

degit https://github.com/david2am/react-ts-sass-jest-template my-project-name
```

# Guide To Reproduce

## Build a vite template for React and Typescript
```
// cmd | terminal

npm init vite@latest

/* Follow the steps to use React and Typescript */
```


## Sass configuration

### Install sass preprocessor
```
// cmd | terminal

npm i -D sass
```

### Add _variables.sass file
```
// src/styles/_variable.sass

$some-color: #6e6b7b
```
### Download normalize.css and paste in ./src/styles/normalize.css from https://necolas.github.io/normalize.css/

### Change index.css for index.sass and update
```
// ./src/index.sass

@import url('./styles/_variables.sass')
@import url('./styles/normalize.css')
```

## Install jest & testing-library:
```
// cmd | terminal

npm i -D ts-jest jest @testing-library/jest-dom @testing-library/react
```

### Also its types:
```
// cmd | terminal

npm i -D @types/jest @types/testing-library__jest-dom @types/testing-library__react
```

### Also user-event:
```
// cmd | terminal

npm i -D @testing-library/user-event @testing-library/dom   
```


### Build a setup.ts file
```
// .jest/setup.ts

import '@testing-library/jest-dom'
```

### Build a jest.config.js file
```
// jest.config.js

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
};
```

### Add a new script to the package.json
```
// package.json

"scripts": {
    ...
    "test": "jest --watch"
  },
```

## Adding svg support to Jest

### Build a svgTransform.js file
```
module.exports = {
    process() {
        return 'module.exports = {};';
    },
    getCacheKey() {
        // The output is always the same.
        return 'svgTransform';
    },
};
```
### Update the jest.config.js
```
// jest.config.js

...
  transform: {
    "^.+\\.svg$": "<rootDir>/.jest/svgTransform.js"
  },
...
```

## Install msw (mock service worker)
```
// cmd | terminal

npm i -D msw
```

### Build handlers.ts file
```
// src/mocks/handlers.ts

import { graphql } from 'msw'

const handlers = [

  graphql.query('query', (req, res, ctx) => {
    return res(
      ctx.data({})
    )
  })

]

export default handlers
```

### Build the server.ts file
```
// src/mocks/server.ts

import { setupServer } from 'msw/node'
import handlers from './handlers'

export const server = setupServer(...handlers)
```

### Add msw server to setup.ts file
```
// .jest/setup.ts

...
import { server } from '../src/mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

### Add msw browser
```
// cmd | terminal

npx msw init ./ --save
```

### Copy/paste to main.tsx
```
// src/main.tsx

...
if (import.meta.env.MODE === 'development') {
  // @ts-ignore
  import('./mocks/browser').then(
    ({ worker }) => worker.start()
  )
}
...
```

### Build browser.ts
```
// src/mocks/browser.ts

import { setupWorker } from 'msw'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```


## Polyfill fetch

### Install it
```
// cmd | terminal

npm i -D whatwg-fetch
```

### Add to the setup.ts
```
// .jest/setup.ts

...
import 'whatwg-fetch'
...
```
