// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import './App.css';
import logo from './logo.png';
import EditPost from './components/EditPost';

function App() {

	return (
		<Router>
			<div className="app">
				<nav>
					<ul>
						<li>
							<img src={logo} className="App-logo" alt="logo" />
						</li>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/create">Create Post</Link>
						</li>
						<li>
							<Link to="/editpost">Edit Post</Link>
						</li>
					</ul>
				</nav>
				<Routes>
					<Route path="/" element={<Home />} />
					
					<Route path="/create" element={<CreatePost />} />

					<Route path="/editpost" element={<EditPost />} />
				</Routes>
			</div>

		</Router>
	);
}

export default App;
