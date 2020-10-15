let splitFlows = 9
let joinFlows = 5

let splits = 3
let joins = 1

let W = function(x) {
	return Math.abs((splitFlows + x[1] + 1) / (splits + x[0] + 1) - (joinFlows + x[3] + 1) / (joins + x[2] + 1))

	+ Math.abs((splitFlows + x[1]) / 3 - (splits + x[0]))
	+ Math.abs((joinFlows + x[3]) / 3 - (joins + x[2]))
}

let minFlows = Math.min(splitFlows, joinFlows) - Math.max(splitFlows, joinFlows)
let maxFlows = Math.max(splitFlows, joinFlows) - Math.min(splitFlows, joinFlows)

let minConnectors = Math.min(splits, joins) - Math.max(splits, joins)
let maxConnectors = Math.max(splits, joins) - Math.min(splits, joins)

console.log('Mismatch = ' + Math.abs((splitFlows + 1) / (splits + 1) - (joinFlows + 1) / (joins + 1)))
console.log('Loss function = ' + W([0, 0, 0, 0]))
console.log(minConnectors + ' <= x1, x3 <= ' + maxConnectors)
console.log(minFlows + ' <= x2, x4 <= ' + maxFlows)

let eps = 10e-6
let experiments = [1]

for (let j of experiments) {
	let times = j

	console.time("opt");

	for (let i = 0; i < times; i++) {
		for (let x1 = minConnectors; x1 <= maxConnectors; x1++) {
			for (let x2 = minFlows; x2 <= maxFlows; x2++) {
				for (let x3 = minConnectors; x3 <= maxConnectors; x3++) {
					for (let x4 = minFlows; x4 <= maxFlows; x4++) {
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
