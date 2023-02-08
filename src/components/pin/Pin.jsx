import React from 'react';
import { useRef } from 'react';

const Pin = () => {
	const needleHead = useRef();

	return (
		<>
			<group>
				<mesh ref={needleHead} position={[0, 0, 3.07]}>
					<sphereGeometry args={[0.03]} />
					<meshStandardMaterial color={'red'} />
				</mesh>
				<mesh position={[0, 0, 3.02]} rotation={[Math.PI / 2, 0, 0]}>
					<cylinderGeometry args={[0.008, 0.008, 0.08, 8]} />
					<meshStandardMaterial color={'gray'} />
				</mesh>
			</group>
		</>
	);
};

export default Pin;
