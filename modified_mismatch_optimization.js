let splitFlows = 5
let joinFlows = 6

let splits = 1
let joins = 2

let W = function(x) {
	return Math.abs((splitFlows + x[0] + 1) / (splits + x[1] + 1) - (joinFlows + x[2] + 1) / (joins + x[3] + 1)

	// constraints
	+ ((splitFlows + x[0]) / (splits + x[1]) - 3)
	+ ((joinFlows + x[2]) / (joins + x[3]) - 3))
}

let minFlows = Math.min(splitFlows, joinFlows) - Math.max(splitFlows, joinFlows)
let maxFlows = Math.max(splitFlows, joinFlows) - Math.min(splitFlows, joinFlows)

let minConnectors = Math.min(splits, joins) - Math.max(splits, joins)
let maxConnectors = Math.max(splits, joins) - Math.min(splits, joins)

let rand = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

let num = 6
let eps = 10e-6

// initialization
let chromosomes = []

for (let i = 0; i < num; i++) {
	chromosomes[i] = [rand(minFlows, maxFlows), rand(minConnectors, maxConnectors), rand(minFlows, maxFlows), rand(minConnectors, maxConnectors)]
}

let solutions = []

while (solutions.length == 0) {
	// evaluation
	let objectives = []

	chromosomes.forEach(x => objectives.push(W(x)))

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
	chromosomes[num - 1] = [fitness[0].chr[0], fitness[0].chr[1], fitness[1].chr[2], fitness[1].chr[3] ]
	chromosomes[num - 2] = [fitness[0].chr[2], fitness[0].chr[3], fitness[1].chr[0], fitness[1].chr[1]]

	// mutation
	let mut = rand(0, num - 1)

	chromosomes[mut] = [rand(minFlows, maxFlows), rand(minConnectors, maxConnectors), rand(minFlows, maxFlows), rand(minConnectors, maxConnectors)]
}

console.log(solutions)
