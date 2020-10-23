# Requirements
- Node (I used v14.4.0, but I think any somewhat recent version would be fine)
- Yarn or npm (both lock files are included)

There's a few unused things in package.json, that's because this is a react seed project I have, and didn't use everything
# How to run
`yarn install`
or 
`npm install`

followed by

`yarn start`
or 
`npm start`

Bring up `http://localhost:1234` in a browser

Note: For the app to work/return a score, you must have the java server running on localhost:8080. It's also a barebones app since it's a kata. I focused more on getting it working with the java side than making it pretty, though in hindsight I wish I would've spent more time on the single component, as I think there's some efficiencies to be made there, a lot of duplication.

# Tests
`yarn test`
or
`npm run test`

# Frameworks used
- Typescript
- React
- axios
- Mocha & chai for testing
