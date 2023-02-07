import React from 'react';
import { TextureLoader, Shape, DoubleSide } from 'three';
import { useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useSpring, animated, config } from '@react-spring/three';

import EarthDayMap from '../../assets/textures/earth-simple.jpg';
import Pin from '../pin/Pin';

export function Earth({ latitude, longitude }) {
	// SERVER VS CLIENT CALCULATIONS
	// If a calculation uses constants (conversion from ft to m, radians, etc), keep it on the CLIENT
	// If a calculation or algorithm is complex, or is business logic, do it on the SERVER (User's CPU is a limiting factor)
	// If a section of code gives you an edge over competitors, keep it on the server to prevent reverse engineering

	const [colorMap] = useLoader(TextureLoader, [EarthDayMap]);

	const LAT_OFFSET = -0.080705;
	const LON_OFFSET = -Math.PI / 2;

	const latRot = (latitude * Math.PI) / 180 + LAT_OFFSET;
	const lonRot = -(longitude * Math.PI) / 180 + LON_OFFSET;

	const HQ_LAT = (36.884804 * Math.PI) / 180 + LAT_OFFSET;
	const HQ_LON = -(30.704044 * Math.PI) / 180 + LON_OFFSET;

	const { rotation } = useSpring({
		rotation: latitude && longitude ? [latRot, lonRot, 0] : [HQ_LAT, HQ_LON, 0],
		config: config.slow,
	});

	const getHeartShape = () => {
		const x = 0,
			y = 0;

		const heartShape = new Shape();

		heartShape.moveTo(x + 5, y + 5);
		heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
		heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
		heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
		heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
		heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
		heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

		return heartShape;
	};

	const extrudeSettings = {
		steps: 1,
		depth: 3,
	};

	return (
		<>
			<animated.mesh
				// ref={earthMesh}
				rotation={rotation}
			>
				<ambientLight intensity={0.5} />
				<pointLight color="#f6f3ea" position={[7, 3, 3]} intensity={0.8} />
				<sphereGeometry args={[3, 90, 90]} />
				<meshStandardMaterial map={colorMap} />
				<OrbitControls
					enableZoom={true}
					enablePan={true}
					enableRotate={true}
					zoomSpeed={0.6}
					panSpeed={0.5}
					rotateSpeed={0.4}
				/>
				<mesh
					castShadow
					receiveShadow
					rotation={[3.3, 1.1, 0]}
					position={[2.18, 1.65, -1.29]}
					scale={[0.003, 0.003, 0.003]}
				>
					<extrudeGeometry args={[getHeartShape(), extrudeSettings]} />
					<meshStandardMaterial color={'red'} side={DoubleSide} />
				</mesh>
			</animated.mesh>

			{latitude && longitude ? <Pin /> : <></>}
		</>
	);
}
