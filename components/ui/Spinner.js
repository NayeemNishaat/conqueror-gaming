function Spinner(props) {
	return (
		<div className="flex flex-col items-center justify-center h-[50vh]">
			<div className="atom-spinner">
				<div className="spinner-inner">
					<div className="spinner-line"></div>
					<div className="spinner-line"></div>
					<div className="spinner-line"></div>
					<div className="spinner-circle">&#9679;</div>
				</div>
			</div>
			<p className="text-3xl font-semibold text-green-500">
				props.message
			</p>
		</div>
	);
}

export default Spinner;
