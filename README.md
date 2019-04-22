# Pedeffy

[![pedeffy on NPM](https://img.shields.io/npm/v/pedeffy.svg)](https://www.npmjs.com/package/pedeffy)
[![Maintainability](https://api.codeclimate.com/v1/badges/a2f47a2b30f3c1df24cf/maintainability)](https://codeclimate.com/github/inventid/pedeffy/maintainability)
[![Dependency Status](https://gemnasium.com/badges/github.com/inventid/pedeffy.svg)](https://gemnasium.com/github.com/inventid/pedeffy)

Generate any PDF file from a template.
Within a microservice.
Using React.

What else would you want?

## How does it work?

Pedeffy uses the awesome [`react-pdf`](https://github.com/diegomura/react-pdf) package under the hood to transform your React code into the PDF you want.
As a result, you can use the components from `react-pdf` to create your setup.

To see this in action, see the [`example/inventid/firstPage.js`](https://github.com/inventid/pedeffy/blob/master/example/inventid/firstPage.js) file.
You can use all of Reacts features to create nice reusable components.

This is then combined with the [inventid](https://www.inventid.nl) approach used by [maily](http://github.com/inventid/maily).
This gives you the flexibility to create a layout using React, and to get the resulting document by POSTing data to the service endpoint.

## Example

1. Clone this repository
1. Ensure you use node `8.9`
1. Run `yarn install`
1. Run `yarn example`
1. Go to [`http://localhost:3000/resume`](http://localhost:3000/resume) where you will see the resume of Luke Skywalker
1. Now go to [`http://localhost:3000/resume?footer=React-pdf%20as%20a%20service%20sounds%20like%20a%20great%20idea!`](http://localhost:3000/resume?footer=React-pdf%20as%20a%20service%20sounds%20like%20a%20great%20idea!). Note how the text in the footer is directly updated!

### Using `react-pdf` components

Components should not be used through `react-pdf` named export, but should use the named export on `pedeffy` itself.
This ensures the fonts, among other things, are registered in the correct render path.

## What to use it for?

At inventid, we use it for the following purposes: Generate lots of documents using a framework (React) which we love and library (react-pdf) which is really easy to learn.

- Invoices
- Tickets
- Quotations
- Customer invoices
- ... And much more

## Sounds awesome

It is.

## Running it in Docker

_todo_

## Big shoutout

- To the developers of `express`
- To the developers of Docker (which allow us to push this to production within minutes)
- To the developers of `react-pdf`
