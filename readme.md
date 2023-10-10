# HOX Capy React Components Library

This is an library made with React, TypeScript, Rollup, Storybook, Jest, and React Testing Library. It was created to be used internally in the company, it is not intended to serve as a public library but feel free to use it as you wish.
The intention is to wrap and integrate common use cases of HOX routines, so that the developer does not have to worry about the details of components and can focus on the business logic of the application.

The components are documented using Storybook in the following link: [HOX Capy UI Library](https://capy.hox.dev.br).

## Installation

You can install this library using npm:

```
npm i --save @hox-rs/capy
```

or yarn:

```
yarn add @hox-rs/capy
```

## Usage

To use this demo library in your project, import the components you need from the library and use them in your React components.

Don't forget to install peer dependencies, depending on components you need to use.
As of now most of the components are wrappers of MUI and React hook form these are the most common dependencies, but you can check the package.json file to see all of them.

An example of usage, integrating a regular TextField from MUI with React hook form:

```tsx
import React from "react";
import { RhfTextField } from "@hox-rs/capy";
import { useForm } from "react-hook-form";

function App() {
  const { control, handleSubmit } = useForm({
    // we commonly use yup resolver here for validations, but optionally you can use "rules" directly in the component
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RhfTextField
          name="name"
          label="Name"
          control={control}
          defaultValue=""
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

For more examples check the Storybook documentation, but most of the form components are used in the same way.

## Contributing

As mentioned before this library was created to be used and maintained internally, but feel free to contribute to it if you wish, just open a pull request and we will review it as soon as possible.

## License

This demo UI library is licensed under the MIT License
