import React, {
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	TextureLoader,
	Shape,
	DoubleSide,
	Vector3,
	CatmullRomCurve3,
} from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, QuadraticBezierLine } from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";

import EarthDayMap from "../../assets/textures/earth-simple.jpg";
import Pin from "../pin/Pin";

export function Earth({ latitude, longitude }) {
	// SERVER VS CLIENT CALCULATIONS
	// If a calculation uses constants (conversion from ft to m, radians, etc), keep it on the CLIENT
	// If a calculation or algorithm is complex, or is business logic, do it on the SERVER (User's CPU is a limiting factor)
	// If a section of code gives you an edge over competitors, keep it on the server to prevent reverse engineering

	const [colorMap] = useLoader(TextureLoader, [EarthDayMap]);
	const [catmullCurve, setCatmullCurve] = useState();
	const [curvePoints, setCurvePoints] = useState({});

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

	function handleLineChange({ startPoint, endPoint, midPoint }) {
		setCurvePoints({ startPoint, endPoint, midPoint });
		console.log("RERENDER");
	}

	// const pathUpdater = useCallback((startPoint, endPoint, midPoint) => {
	// 	const path = new CatmullRomCurve3([startPoint, endPoint, midPoint]);
	// 	handleCurve(() => path);
	// }, []);

	const Heart = forwardRef((props, ref) => {
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
			<mesh
				ref={ref}
				{...props}
				castShadow
				receiveShadow
				rotation={[3.3, 1.1, 0]}
				position={[2.18, 1.65, -1.29]}
				scale={[0.003, 0.003, 0.003]}
			>
				<extrudeGeometry args={[getHeartShape(), extrudeSettings]} />
				<meshStandardMaterial color={"red"} side={DoubleSide} />
			</mesh>
		);
	});

	let pinPos = new Vector3(0, 0, 0);

	const heart = useRef();
	const pin = useRef();

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
				<Heart ref={heart} />
			</animated.mesh>
			{latitude && longitude ? (
				<>
					<Pin ref={pin} />
					<Line
						start={heart}
						end={pin}
						handleLineChange={(data) => handleLineChange(data)}
					/>
					{/* <AnimatedPlane duration={5} /> */}
				</>
			) : (
				<></>
			)}
		</>
	);

	function Line({
		start,
		end,
		v1 = new Vector3(),
		v2 = new Vector3(),
		handleLineChange,
	}) {
		// Line is drawn in reverse, from the pin -> HQ : startPoint -> endPoint
		const ref = useRef();

		function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
			const R = 6371; // Radius of the earth in km
			const dLat = deg2rad(lat2 - lat1); // deg2rad below
			const dLon = deg2rad(lon2 - lon1);
			const a =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(deg2rad(lat1)) *
					Math.cos(deg2rad(lat2)) *
					Math.sin(dLon / 2) *
					Math.sin(dLon / 2);
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			const d = R * c; // Distance in km
			return d;
		}

		function deg2rad(deg) {
			return deg * (Math.PI / 180);
		}

		console.log("Distance (scaled down x1000): ");
		console.log(
			getDistanceFromLatLonInKm(latitude, longitude, 36.884804, 30.704044) /
				1000
		);

		const tempStartVec = new Vector3();
		const tempEndVec = new Vector3();
		const tempMidVec = new Vector3();

		const startTime = useRef(Date.now());
		const duration = 600;

		useFrame(() => {
			const timeElapsed = Date.now() - startTime.current;

			if (timeElapsed < duration) {
				// Get the positions of the start and end points
				start.current.getWorldPosition(tempStartVec);
				end.current.getWorldPosition(tempEndVec);

				const arcScalarKm =
					getDistanceFromLatLonInKm(latitude, longitude, 36.884804, 30.704044) /
					1000;

				let scalar = 1.75;
				if (arcScalarKm > 1.75 && arcScalarKm < 2.25) {
					scalar = arcScalarKm;
				} else if (arcScalarKm > 2.25 && arcScalarKm < 2.75) {
					scalar = 2.25;
				} else if (arcScalarKm > 2.75) {
					scalar = 2.5;
				}

				// Calculate the position of the mid point
				tempMidVec
					.copy(tempStartVec)
					.sub(tempEndVec)
					.multiplyScalar(0.5)
					.add(tempEndVec)
					.setZ(tempStartVec.z - tempEndVec.z + 1.5 + scalar);

				// Set the points of the curve
				ref.current.setPoints(tempStartVec, tempEndVec, tempMidVec);

				console.log("<- frame count from Running code for 600ms");
			}
		}, []);

		useEffect(() => {
			const timer = setTimeout(() => {
				startTime.current = Date.now();
			}, duration);

			// from pin -> to HQ : from start -> to end
			const from = start.current.getWorldPosition(v1);
			const to = end.current.getWorldPosition(v2);

			pinPos = from;

			return () => {
				clearTimeout(timer);
			};
		}, []);

		return (
			<mesh>
				<QuadraticBezierLine ref={ref} lineWidth={3} color="#ff2060" />
			</mesh>
		);
	}

	function AnimatedPlane({ duration, curvePoints }) {
		const planeRef = useRef();

		console.log("CURVE POINTS BELOW");
		console.log(curvePoints);

		useFrame((state, delta) => {
			const t = (state.clock.elapsedTime % duration) / duration;
			const point = catmullCurve.getPointAt(t);
			planeRef.current.position.copy(point);
		});

		return (
			<mesh ref={planeRef}>
				<boxGeometry args={[0.3, 0.3, 0.3]} />
				<meshStandardMaterial />
			</mesh>
		);
	}
}
