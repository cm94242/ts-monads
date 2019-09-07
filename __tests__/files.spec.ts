import * as fs from 'fs'
import * as files from '../src/files'

afterEach(() => {
	if (fs.existsSync('dummy.json')){
		fs.unlinkSync('dummy.json')
	}
})

describe('file suite', () => {

	test(`json basics - exists`, () => {
		const body = {
			'a' : 'b',
			'c' : { 'd' : 'e' }
		}

		fs.writeFileSync('dummy.json', JSON.stringify(body))
		const read = files.read_json_file('dummy.json')
		expect(read.isDefined()).toBe(true)
	})

	test(`json basics - not exists`, () => {
		const read = files.read_json_file('dummy.json')
		expect(read.isDefined()).toBe(false)
	})

})
