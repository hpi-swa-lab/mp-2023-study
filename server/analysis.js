const fs = require('fs');

function median(numbers) {
    const sorted = Array.from(numbers).sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
}

let ft = fs.readdirSync("responses").filter(f => f.startsWith("45"))
let dataRaw = ft.map(fn => fs.readFileSync("responses/" + fn))
let isTutorial = (d) => d.task.statements.length == 3;

let d = dataRaw.map(d => JSON.parse(d)).filter(d => !isTutorial(d))
d.sort((a,b) => a.task.stateId - b.task.stateId)

console.log("--- Desktop NoDecomp ---")
console.log("Duration", median(d.filter(i => i.task.view == "Desktop-NoDecomp").map(i => i.response.duration)))
console.log("TLX",d.filter(i=>i.task.view =="tlx")[2].response.scores.scores.reduce((a,b) => (a+b),0))

console.log("--- Desktop Decomp ---")
console.log("Duration",median(d.filter(i => i.task.view == "Desktop-Decomp").map(i => i.response.duration)))
console.log("TLX",d.filter(i=>i.task.view =="tlx")[0].response.scores.scores.reduce((a,b) => (a+b),0))

console.log("--- VR NoDecomp ---")
console.log("Duration",median(d.filter(i => i.task.view == "VR-NoDecomp").map(i => i.response.duration)))
console.log("TLX", d.filter(i=>i.task.view =="tlx")[3].response.scores.scores.reduce((a,b) => (a+b),0))

console.log("--- VR Decomp ---")
console.log("Duration",median(d.filter(i => i.task.view == "VR-Decomp").map(i => i.response.duration)))
console.log("TLX",d.filter(i=>i.task.view =="tlx")[1].response.scores.scores.reduce((a,b) => (a+b),0))
