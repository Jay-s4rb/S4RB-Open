import './style';
import { h }  from 'preact';
import Portal from './components/portal/Portal';

const App = () => (
	<div className="container app" >
		<header className="app__header">
			<h1>Complaints Per Million Units</h1>
		</header>
		<Portal />
	</div>
);

export default App;
