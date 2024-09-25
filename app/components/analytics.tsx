"use client";

export function Analytics() {
	const token = process.env.NEXT_PUBLIC_BEAM_TOKEN;
	console.log('token', token);

	if (!token) {
		return null;
	}
	return (
		<script
			src="https://beamanalytics.b-cdn.net/beam.min.js"
			data-token={token}
			async
		/>
	);
}
