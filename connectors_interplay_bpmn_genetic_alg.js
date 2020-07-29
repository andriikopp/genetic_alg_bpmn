let a = 3
let b = 9

let obj = function(x, y) {
	return Math.abs((a + x) - (b + y))
}

let min = Math.min(a, b) - Math.max(a, b)
let max = Math.max(a, b) - Math.min(a, b)

let rand = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

let num = 4

// initialization
let chromosomes = []

for (let i = 0; i < num; i++) {
	chromosomes[i] = [rand(min, max), rand(min, max)]
}

let solutions = []

while (solutions.length == 0) {
	// evaluation
	let objectives = []

	for (let i = 0; i < num; i++) {
		let x = chromosomes[i][0]
		let y = chromosomes[i][1]

		objectives[i] = obj(x, y)
	}

	// selection
	let fitness = []

	for (let i = 0; i < num; i++) {
		fitness[i] = {
			obj: objectives[i],
			val: 1 / (1 + objectives[i]),
			chr: chromosomes[i]
		}
	}

	fitness.sort(function(a, b) {
		return a.val - b.val
	})

	// crossover
	chromosomes[0] = [fitness[2].chr[0], fitness[3].chr[1]]
	chromosomes[1] = [fitness[2].chr[1], fitness[3].chr[0]]

	// mutation
	let mut = rand(0, num - 1)
	let inv = rand(0, 1)

	chromosomes[mut][inv] = rand(min, max)

	for (let i = 0; i < num; i++) {
		let x = chromosomes[i][0]
		let y = chromosomes[i][1]

		objectives[i] = obj(x, y)

		fitness[i] = {
			obj: objectives[i],
			val: 1 / (1 + objectives[i]),
			chr: chromosomes[i]
		}
	}

	// end
	for (let i = 0; i < num; i++) {
		if (Math.abs(fitness[i].val - 1) <= 10E-6) {
			solutions.push(fitness[i])
		}
	}
}

console.log(solutions)
