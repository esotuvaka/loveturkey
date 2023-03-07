import { CatmullRomCurve3, Vector3 } from "three";

export function Curve({ p1, p2 }) {
	let v1 = new Vector3(p1.x, p1.y, p1.z);
	let v2 = new Vector3(p2.x, p2.y, p2.z);

	let points = [];

	for (let i = 0; i <= 20; i++) {
		let p = new Vector3().lerpVectors(v1, v2, i / 20);
		p.multiplyScalar(1 + 0.1 * Math.sin((Math.PI * i) / 20));
		points.push(p);
	}

	let path = new CatmullRomCurve3(points);

	console.log(p1, p2);
	console.log(path);

	return (
		<>
			<mesh>
				<tubeGeometry args={[path, 20, 0.01, 8, false]} />
				<meshStandardMaterial color={"blue"} />
			</mesh>
		</>
	);
}
