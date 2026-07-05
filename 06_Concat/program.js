import concat from 'concat-stream'

process.stdin.pipe(concat((input) => {
	const output = input.toString().split('').reverse().join('')
	process.stdout.write(output)
}));
