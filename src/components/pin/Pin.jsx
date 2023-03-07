import React, { forwardRef } from "react";
import { useRef } from "react";

const Pin = forwardRef((props, ref) => {
	const needleHead = useRef();

	return (
		<>
			<group {...props}>
				<mesh ref={needleHead} position={[0, 0, 3.07]}>
					<sphereGeometry args={[0.03]} />
					<meshStandardMaterial color={"red"} />
				</mesh>
				<mesh ref={ref} position={[0, 0, 3.02]} rotation={[Math.PI / 2, 0, 0]}>
					<cylinderGeometry args={[0.008, 0.008, 0.08, 8]} />
					<meshStandardMaterial color={"gray"} />
				</mesh>
			</group>
		</>
	);
});

export default Pin;
