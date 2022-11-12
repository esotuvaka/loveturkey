import React from 'react';

const UI = ({
	changeIndex,
	loading,
	latitude,
	longitude,
	name,
	country,
	continent,
	elevation,
}) => {
	const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
	const countryFull = regionNames.of(country || 'us');

	// REFACTOR THESE CALCULATIONS TO BE DONE ON THE BACKEND
	const elevationMeters =
		Math.round((elevation + Number.EPSILON) * 100 * 0.3048) / 100;

	const latRounded =
		Math.round((parseFloat(latitude) + Number.EPSILON) * 10000) / 10000;
	const lonRounded =
		Math.round((parseFloat(longitude) + Number.EPSILON) * 10000) / 10000;

	return (
		<>
			<aside className="z-10 flex justify-center lg:absolute lg:h-screen lg:w-1/3 ">
				<div className="absolute z-10 w-full px-6">
					<h1
						id="loveturkey"
						className="  text-center font-barlow text-6xl font-semibold text-ltred lg:ml-[20%] lg:mb-4 lg:mt-[20%] lg:w-full lg:text-left"
					>
						LOVETURKEY
					</h1>
				</div>
				<div className="absolute mt-[100vw] flex w-[100vw] flex-col p-6 py-0 pb-8 pt-4 min-[512px]:mt-[512px] min-[512px]:w-[512px] lg:mt-[35%] lg:block lg:h-full lg:w-full lg:py-6">
					<div className="ml-[20%] flex h-16 items-end ">
						<div className="flex h-16 items-start rounded-md bg-red-700 transition-all duration-200 hover:h-[60px] active:h-[56px]">
							<button
								onClick={() => {
									changeIndex((prev) => prev + 1);
								}}
								id="search-button"
								className="mb-2 w-min rounded-md bg-ltred px-4 py-2 align-middle font-barlow text-3xl font-bold text-white shadow-lg transition-all duration-200 "
							>
								Search!
							</button>
						</div>
					</div>
					{loading ? (
						<></>
					) : (
						<div className="ml-[10%] flex flex-col lg:mt-8 lg:ml-[20%]">
							<h2 className="font-barlow text-3xl font-semibold lg:mt-2 lg:mb-2 lg:w-3/4 lg:text-4xl">
								{name}
							</h2>
							<h3 className="font-barlow text-2xl text-ltred/80 lg:mb-2 lg:text-3xl">
								{countryFull}, {continent}
							</h3>

							<p className="font-barlow text-xl">
								Elevation: {elevation}ft / {elevationMeters}m
							</p>
							<p
								className="w-full text-left font-barlow text-2xl font-semibold text-ltred lg:hidden lg:p-0 lg:text-4xl"
								id="coords"
							>
								{latRounded}° N, {lonRounded}° W
							</p>
						</div>
					)}
				</div>
			</aside>
			<aside className="absolute bottom-0 z-10 mt-[145vw] hidden w-full pb-2 lg:right-0 lg:flex lg:h-screen lg:w-1/3">
				{loading ? (
					<></>
				) : (
					<div className="flex lg:ml-[20%] lg:mt-[20%] lg:px-4">
						<p
							className="w-full pl-6 text-left font-barlow text-2xl text-ltred lg:p-0 lg:text-4xl"
							id="coords"
						>
							{latRounded}° N, {lonRounded}° W
						</p>
					</div>
				)}
			</aside>
		</>
	);
};

export default UI;
