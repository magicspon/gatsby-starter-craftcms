const R = require('ramda')

const data = {
	'students.0.email': ['The email has already been taken.'],
	'students.0.terms': ['The terms must be accepted.'],
	'students.1.email': ['The email has already been taken.'],
	'students.1.terms': ['The terms must be accepted.']
}

// R.match(/\d+/g)('students.0.email') // ?

R.compose(
	R.groupBy(v => v.id),
	R.map(([key, value]) => {
		const id = R.compose(R.head, R.match(/\d+/g))(key)
		const [, rule] = key.split(`${id}.`)
		return {
			id,
			rule,
			error: value[0]
		}
	}),
	R.toPairs
)(data)

const entries = {
	craft: {
		entries: [
			{
				id: '9',
				title: 'Home',
				videoEnabled: true,
				video:
					'https://player.vimeo.com/external/245275218.hd.mp4?s=f17174f558c75ef474e7a56ce244e82e6b7b2d3c&profile_id=174',
				button: [
					{
						col1: 'Buy now and support your school',
						text: 'Buy now and support your school'
					}
				],
				heading: 'School fundraising made easy with everyday grocery items'
			}
		]
	}
}

const clean = R.compose(R.head, R.prop('entries'), R.prop('craft'))(entries) // ?
