/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 airplane.gltf
Author: Mauro3D (https://sketchfab.com/maurogsw)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/low-poly-airliner-f06d488f08764e3ca26f2917d4053c69
Title: Low Poly Airliner
*/

import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";

export default function Model(props) {
	const group = useRef();
	const { nodes, materials } = useGLTF("/loveturkey/airplane.gltf");

	// const { planeRotation } = useSpring({
	// 	planeRotation: [Math.PI / 2, props.rotation, 0],
	// });

	return (
		<a.group ref={group} {...props} dispose={null}>
			<group scale={0.0001}>
				<group position={[0, 233.03, -473.05]}>
					<mesh
						geometry={nodes.Cylinder_Material001_0.geometry}
						material={materials["Material.001"]}
					/>
					<mesh
						geometry={nodes.Cylinder_Material002_0.geometry}
						material={materials["Material.002"]}
					/>
				</group>
				<group position={[-0.09, 147.85, 223.66]}>
					<mesh
						geometry={nodes.Cylinder001_Material001_0.geometry}
						material={materials["Material.001"]}
					/>
					<mesh
						geometry={nodes.Cylinder001_Material002_0.geometry}
						material={materials["Material.002"]}
					/>
				</group>
				<group position={[213.46, 181.15, -427.41]}>
					<mesh
						geometry={nodes.Cylinder002_Material001_0.geometry}
						material={materials["Material.001"]}
					/>
					<mesh
						geometry={nodes.Cylinder002_Material002_0.geometry}
						material={materials["Material.002"]}
					/>
				</group>
				<group position={[-213.46, 181.15, -427.41]}>
					<mesh
						geometry={nodes.Cylinder003_Material001_0.geometry}
						material={materials["Material.001"]}
					/>
					<mesh
						geometry={nodes.Cylinder003_Material002_0.geometry}
						material={materials["Material.002"]}
					/>
				</group>
			</group>
		</a.group>
	);
}

useGLTF.preload("/airplane.gltf");
