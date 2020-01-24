const path = require('path')

module.exports = {
	description: 'Add component',
	prompts: [
		{
			type: 'list',
			name: 'type',
			message: 'Select the type of component',
			default: 'component',
			choices: () => ['components', 'templates']
		},
		{
			type: 'input',
			name: 'name',
			message: 'What should it be called?',
			validate: value => {
				if (/.+/.test(value)) {
					return true
				}
				return 'name is required'
			}
		},
		{
			type: 'confirm',
			name: 'cssModules',
			default: false,
			message: 'Do you want to use css modules?'
		},
		{
			type: 'confirm',
			name: 'test',
			default: false,
			message: 'Do you want to add a test?'
		}
	],
	actions: data => {
		const base = path.resolve(
			process.cwd(),
			`src/{{type}}//{{properCase name}}/`
		)

		const actions = [
			{
				type: 'add',
				path: path.resolve(base, `{{properCase name}}.js`),
				templateFile: path.resolve(__dirname, 'fn.js.hbs'),
				abortOnFail: true
			}
		]

		if (data.cssModules) {
			actions.push({
				type: 'add',
				path: path.resolve(base, `{{properCase name}}.module.css`),
				templateFile: path.resolve(__dirname, 'style.css.hbs'),
				abortOnFail: true
			})
		}

		actions.push({
			type: 'add',
			path: path.resolve(base, `{{properCase name}}.stories.js`),
			templateFile: path.resolve(__dirname, 'stories.js.hbs'),
			abortOnFail: true
		})

		actions.push({
			type: 'add',
			path: path.resolve(base, `index.js`),
			templateFile: path.resolve(__dirname, 'index.js.hbs'),
			abortOnFail: true
		})

		if (data.test) {
			actions.push({
				type: 'add',
				path: path.resolve(base, `__tests__/{{properCase name}}.test.js`),
				templateFile: path.resolve(__dirname, 'test.js.hbs'),
				abortOnFail: true
			})
		}

		return actions
	}
}
