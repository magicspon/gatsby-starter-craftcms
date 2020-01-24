const componentGenerator = require('./component/')

module.exports = plop => {
	plop.setGenerator('component', componentGenerator)
}
