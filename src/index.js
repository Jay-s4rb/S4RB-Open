import './style';
import { h }  from 'preact';
import 'milligram';
import Portal from './components/portal/Portal';

const App = () => (
	<div class="container app" >
		<header class="app__header">
			<h1>Complaints Per Million Units</h1>
		</header>
		<Portal />
	</div>
);

export default App;
