var data = [{
	id: "salt",
	x: 0,
	y: 0,
	fx: 0,
	fy: 0,
	parents: [],
	fill: "#ff0000",
	r: 20,
	"stroke-width": 3,
	path: "M-8 10 L 8 10 Q 12 10, 5 -8 M -8 10 Q -12 10, -5 -8 A 5 2 0 1 0 5 -8 A 5 4 0 1 0 -5 -8",
	"path-width": 1.5
}, {
	id: "utility",
	x: 0,
	y: 10,
	parents: ["salt"],
	r: 15,
	fill: "#ff00ff"
}, {
	id: "misc",
	x: -10, 
	y: -10,
	parents: ["salt"],
	r: 15,
	fill: "#ff00ff"
}, {
	id: "administration",
	x: 20, 
	y: 20,
	parents: ["salt"],
	r: 15,
	fill: "#ff00ff"
}, {
	id: "moderation",
	x: -20, 
	y: -20,
	parents: ["salt"],
	r: 15,
	fill: "#ff00ff"
}, {
	id: "fun",
	x: 30, 
	y: 30,
	parents: ["salt"],
	r: 15,
	fill: "#ff00ff"
}, {
	id: "devs",
	x: -30, 
	y: -30,
	parents: ["misc"],
	r: 10,
	fill: "#00ff00"
}, {
	id: "invite",
	x: 40, 
	y: 40,
	parents: ["utility", "misc"],
	r: 10,
	fill: "#00ff00"
}];