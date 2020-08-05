let splitFlows = 9
let joinFlows = 9

let splits = 3
let joins = 2

let W = function(x) {
	return Math.abs((splitFlows + x[0] + 1) / (splits + x[1] + 1) - (joinFlows + x[2] + 1) / (joins + x[3] + 1))

	// constraints
	+ Math.abs((splitFlows + x[0]) / 3 - (splits + x[1]))
	+ Math.abs((joinFlows + x[2]) / 3 - (joins + x[3]))
}

let minFlows = Math.min(splitFlows, joinFlows) - Math.max(splitFlows, joinFlows)
let maxFlows = Math.max(splitFlows, joinFlows) - Math.min(splitFlows, joinFlows)

let minConnectors = Math.min(splits, joins) - Math.max(splits, joins)
let maxConnectors = Math.max(splits, joins) - Math.min(splits, joins)

let rand = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

let eps = 10e-6



let experiments = [1, 10, 100, 1000, 10000]

for (let j of experiments) {
	let times = j

	console.time("opt");

	for (let i = 0; i < times; i++) {
		for (let x1 = minFlows; x1 <= maxFlows; x1++) {
			for (let x2 = minConnectors; x2 <= maxConnectors; x2++) {
				for (let x3 = minFlows; x3 <= maxFlows; x3++) {
					for (let x4 = minConnectors; x4 <= maxConnectors; x4++) {
						let x = [x1, x2, x3, x4]

						if (Math.abs(W(x)) <= eps) {
							console.log(x)
						}
					}
				}
			}
		}
	}

	console.timeEnd("opt");
}
