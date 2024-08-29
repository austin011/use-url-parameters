# useURLParameters

An intuitive react hook that plugs URL Parameters into your react hook lifecycle.

## Installation

With yarn

```bash
yarn add use-url-parameters
```

With npm

```bash
npm install use-url-parameters
```

With pnpm

```bash
pnpm install use-url-parameters
```

## How it Works

On Component Render

- Read URL Parameters with the name of each key passed into the hook's first parameter
- Sets your components state based the current URL parameters using each function passed in as the second argument

On State Update

- Updates your URL parameters to match the state passed in as the hooks first parameter

## Example

```tsx
import { useState } from "react";
import useURLParameters from "use-url-parameters";

export default function Component() {
  const [filters, setFilters] = useState({
    name: "",
    age: "",
  });

  useURLParameters(
    {
      name: filters.name,
      age: filters.age,
    },
    {
      name: (val) => setFilters((prev) => ({ ...prev, name: val })),
      age: (val) => {
        // Only set the age if the URL Parameter is a number
        if (!isNaN(parseInt(val))) {
          setFilters((prev) => ({ ...prev, age: val }));
        }
      },
    }
  );

  ...
}
```
