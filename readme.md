# HOX Capy UI Library

This is an UI library made with React, TypeScript, Rollup, Storybook, Jest, and React Testing Library. It was created to be used internally in the company, it is not intended to serve as a public library but feel free to use it as you wish.

The components are documented using Storybook in the following link: [HOX Capy UI Library](https://capy.hox.dev.br).

## Installation

You can install this UI library using npm:

```
yarn add @hox-rs/capy
```

## Usage

To use this demo UI library in your project, import the components you need from the library and use them in your React components.

```jsx
import React from "react";
import { Button } from "@hox-rs/capy";

function App() {
  return (
    <div>
      <Button
        disabled={false}
        text="Click me!"
        onClick={() => alert("Button clicked!")}
      />
    </div>
  );
}

export default App;
```

## Contributing

As mentioned before this library was created to be used and maintained internally, but feel free to contribute to it if you wish, just open a pull request and we will review it as soon as possible.

## License

This demo UI library is licensed under the MIT License
