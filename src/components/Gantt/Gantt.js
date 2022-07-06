import React, { Component } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

export default class Gantt extends Component {
	dataProcessor = null;

	initZoom() {
		gantt.ext.zoom.init({
			levels: [
				{
					name: "Days",
					scale_height: 60,
					min_column_width: 70,
					scales: [
						{
							unit: "week",
							step: 1,
							format: function (date) {
								var dateToStr = gantt.date.date_to_str("%d %M");
								var endDate = gantt.date.add(date, -6, "day");
								var weekNum = gantt.date.date_to_str("%W")(date);
								return (
									"Week " +
									weekNum +
									", " +
									dateToStr(date) +
									" - " +
									dateToStr(endDate)
								);
							},
						},
						{ unit: "day", step: 1, format: "%D %j %M" },
					],
				},
				{
					name: "Months",
					scale_height: 60,
					min_column_width: 70,
					scales: [
						{ unit: "month", step: 1, format: "%F %Y" },
						{ unit: "week", step: 1, format: "Week %W" },
					],
				},
			],
		});
	}

	setZoom(value) {
		if (!gantt.ext.zoom.getLevels()) {
			this.initZoom();
		}
		gantt.ext.zoom.setLevel(value);
	}

	shouldComponentUpdate(nextProps) {
		return this.props.zoom !== nextProps.zoom;
	}

	componentDidMount() {
		gantt.config.date_format = "%Y-%m-%d %H:%i";
		const { tasks } = this.props;
		gantt.init(this.ganttContainer);
		gantt.parse(tasks);
	}

	componentWillUnmount() {
		if (this.dataProcessor) {
			this.dataProcessor.destructor();
			this.dataProcessor = null;
		}
	}

	render() {
		const { zoom } = this.props;
		this.setZoom(zoom);
		return (
			<div
				ref={(input) => {
					this.ganttContainer = input;
				}}
				style={{ width: "100%", height: "100%" }}
			></div>
		);
	}
}
