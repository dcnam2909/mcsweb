import { useEffect } from 'react';

export default function NotFoundPage() {
	useEffect(() => {
		document.title = 'Not Found';
	}, []);
	const styleFourOhFour = {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		background: '#121212',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};

	const styleBg = {
		backgroundColor: '#0000ff',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		backgroundSize: 'cover',
		mixBlendMode: 'overlay',
	};

	const styleCode = {
		fontFamily: 'Alfa Slab One, cursive',
		fontSize: '144px',
		height: '100vh',
		color: 'white',
		width: '100%',
		display: 'flex',
		backgorundPosition: 'center',
		alignItems: 'center',
		backgroundSize: 'cover',
		justifyContent: 'center',
		flexDirection: 'column',
		zIndex: '1',
	};
	return (
		<div className="FourOhFour" style={styleFourOhFour}>
			<div className="bg" style={styleBg}></div>
			<div className="code" style={styleCode}>
				404
				<a href="/" style={{ fontSize: '50px' }}>
					GO HOME
				</a>
			</div>
		</div>
	);
}
