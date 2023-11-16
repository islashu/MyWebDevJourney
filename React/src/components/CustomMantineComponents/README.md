All custom component contains some form of mantine components.

We will eventually remove the mantine component for shadcn but we need a way to more easily plug and play these components

We want to create a way where we decouple these components from the rest of the codebase so when we do eventually switch out
we can just modify in one location and the rest of the project is unaffected.

## Common components
These are the base components that will be used individually or in combination to create the custom components.


## Custom larger components
These component will exist outside of the common file directory and will usually contain a combination of the common components.


## Issues
- [ ] For forms, we are unable to abstract the components into custom components and we have to use mantine components directly.
- [ ] Any changes to the form will automatically mean that we have to change the code in the form component directly.
