import React, { Component } from "react";
import Gantt from "./components/Gantt";
import Toolbar from "./components/Toolbar";
import data from "./data/data";

class App extends Component {
	state = {
		currentZoom: "Days",
	};

	handleZoomChange = (zoom) => {
		this.setState({
			currentZoom: zoom,
		});
	};

	render() {
		const { currentZoom, messages } = this.state;
		return (
			<div>
				<div className="zoom-bar">
					<Toolbar zoom={currentZoom} onZoomChange={this.handleZoomChange} />
				</div>
				<div className="gantt-container">
					<Gantt tasks={data} zoom={currentZoom} />
				</div>
			</div>
		);
	}
}

export default App;
