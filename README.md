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

yarn add -D sass
```

### Rename index.css to index.sass

### Scale 10px ~ 1rem
```
// ./src/index.sass

html 
  font-size: 62.5%
```

### Add _variables.sass file
```
// src/styles/_variable.sass

$some-color: #6e6b7b
```

### Add _mixins.sass file
```
// src/styles/_mixins.sass

@mixin text-overflow($lines)
  overflow: hidden
  display: -webkit-box
  -webkit-line-clamp: $lines
  -webkit-box-orient: vertical
```

### Add normalize.css and paste in ./src/styles/normalize.css from https://necolas.github.io/normalize.css/

### Add _index.sass
```
// src/styles/_index.sass

@forward './variables'
@forward './mixins'
```


## Install jest & testing-library:
```
// cmd | terminal

yarn add -D ts-jest jest @testing-library/jest-dom @testing-library/react
```

### Also its types:
```
// cmd | terminal

yarn add -D @types/jest @types/testing-library__jest-dom @types/testing-library__react
```

### Also user-event:
```
// cmd | terminal

yarn add -D @testing-library/user-event @testing-library/dom   
```

### Also react-hooks:
```
// cmd | terminal

yarn add -D @testing-library/react-hooks @types/testing-library__react-hooks
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

### Build a svgTransform.js file
```
// .jest/svgTransform.js

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

### Install jest-transform-stub
```
// cmd | terminal

yarn add -D jest-transform-stub
```
### Update jest.config.js
```
// ./jest.config.js

...
"transform": {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
}
...
```


## Install msw (mock service worker)
```
// cmd | terminal

yarn add -D msw
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

yarn add -D whatwg-fetch
```

### Add to the setup.ts
```
// .jest/setup.ts

...
import 'whatwg-fetch'
...
```

## Add path alias

### In tsconfig.json
```
// tsconfig.json

{
  compilerOptions: {
    ...
    "baseUrl": ".",
    "paths": {
      "@*": ["src/*"]
    }
  }
}
```

### In vite.config.ts
```
// vite.config.ts

...
import path from 'path'

export default defineConfig({
  ...
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```
