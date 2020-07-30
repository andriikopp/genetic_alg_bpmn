let a = 3
let b = 9

let obj = function(x, y) {
	return Math.abs((a + x) - (b + y))
}

let min = Math.min(a, b) - Math.max(a, b)
let max = Math.max(a, b) - Math.min(a, b)

let rand = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

let num = 6
let eps = 10e-6

// initialization
let chromosomes = []

for (let i = 0; i < num; i++) {
	chromosomes[i] = [rand(min, max), rand(min, max)]
}

let solutions = []

while (solutions.length == 0) {
	// evaluation
	let objectives = []

	chromosomes.forEach(x => objectives.push(obj(x[0], x[1])))

	// stop ?
	objectives.forEach((x, i) => {
		if (x <= eps) {
			solutions.push([x, chromosomes[i]])
		}
	})

	// selection
	let fitness = []

	chromosomes.forEach((x, i) => fitness.push({ obj: objectives[i], chr: x }))

	fitness.sort((a, b) => a.obj - b.obj)

	// crossover
	chromosomes[num - 1] = [fitness[0].chr[0], fitness[1].chr[1]]
	chromosomes[num - 2] = [fitness[0].chr[1], fitness[1].chr[0]]

	// mutation
	let mut = rand(0, num - 1)
	let inv = rand(0, 1)

	chromosomes[mut][inv] = rand(min, max)
}

console.log(solutions)
