import './App.css';
import { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Earth } from './components/earth/Earth';

import UI from './components/ui/UI';

function App() {
	const [airportData, setAirportData] = useState([]);
	const [airport, setAirport] = useState({});
	const [loading, setLoading] = useState(true);

	const [index, setIndex] = useState(null);

	const isDataFetched = useRef(false);

	const fetchAirports = async () => {
		fetch(`http://localhost:8080/backend/index.php`)
			.then((res) => res.json())
			.then((data) => {
				setAirportData(data);
				console.log(data);
			});
	};

	// at index of 50, refetch another 50 airports
	useEffect(() => {
		setAirport(airportData[index]);
		console.log(airportData[index]);

		if (index >= 50) {
			fetchAirports();
			setIndex(0);
		}
	}, [index]);

	useEffect(() => {
		// useEffect hook fetches data from API once on mount
		if (isDataFetched.current === false) {
			try {
				fetchAirports();
			} catch (error) {
				console.log(error);
			}

			return () => {
				isDataFetched.current = true;
			};
		}
	}, []);

	return (
		<main className="h-full w-full">
			<UI
				changeIndex={(data) => {
					setIndex(data);
					setLoading(false);
					console.log('INDEX HERE: ' + (index + 1));
				}}
				loading={loading}
				latitude={airport?.latitude_deg}
				longitude={airport?.longitude_deg}
				name={airport?.name}
				country={airport?.iso_country}
				continent={airport?.continent}
				elevation={airport?.elevation_ft}
			/>
			<section
				id="canvas-sizer"
				className="mx-auto h-[100vw] max-h-[512px] w-full max-w-lg pt-16 lg:h-[100vh] lg:max-h-[1080px] lg:w-[100vw] lg:max-w-none lg:pt-0 2xl:max-h-screen
				"
			>
				<Canvas shadows>
					<Suspense fallback={null}>
						<Earth
							latitude={airport?.latitude_deg}
							longitude={airport?.longitude_deg}
						/>
					</Suspense>
				</Canvas>
			</section>
		</main>
	);
}

export default App;
