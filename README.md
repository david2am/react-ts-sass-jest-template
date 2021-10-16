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


## Install sass preprocessor
```
// cmd | terminal

npm i -D sass
```


## Install jest & testing-library:
```
// cmd | terminal

npm i -D ts-jest @testing-library/jest-dom @testing-library/react
```

### Also its types:
```
// cmd | terminal

npm i -D @types/testing-library__jest-dom @types/testing-library__react
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

## Install msw (mock service worker)
```
// cmd | terminal

npm i -D msw
```

### Build handlers.js file
```
// src/mocks/handlers.js

import { graphql } from 'msw'

const handlers = [
  // first query
  graphql.query('query', null)
]

export default handlers
```

### Build the server.js file
```
// src/mocks/server.js

import { setupServer } from 'msw/node'
import handlers from './handlers'

export const server = setupServer(...handlers)
```

### Add msw server to setup.js file
```
// .jest/setup.js

...
import { server } from '../src/mocks/server.js'

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

### Build browser.js
```
// src/mocks/browser.js

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

### Add to the setup.js
```
// .jest/setup.js

...
import 'whatwg-fetch'
...
```
