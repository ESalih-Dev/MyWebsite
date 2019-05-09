import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";

am4core.useTheme(am4themes_animated);

interface Props {
    pages: string[]
    showPage: any
    halfSized: boolean
}

interface State {
    windowHeight: number
    windowWidth: number
}

const CHARTDATA = [
    {
        name: "Erkin Salih",
        value: 80,
        children: [
            {
                name: "My\nProjects",
                click: true,
                value: 50
            },
            {
                name: "Technical\nSkills",
                click: true,
                value: 50,
                collapsed: true,
                children: [
                    {
                        name: "Coding",
                        value: 35,
                        click: true,
                        collapsed: true,
                        children: [
                            { name: "Python", value: 10 },
                            { name: "C++", value: 10 },
                            { name: "JS", value: 10 },
                            { name: "Java", value: 10 },
                            { name: "Swift", value: 10 },
                            { name: "Obj-C", value: 10 },        
                        ]
                    },
                    {
                        name: "Other\nSkills",
                        value: 35,
                        click: true,
                        collapsed: true,
                        children: [
                            { name: "AWS", value: 10 },
                            { name: "HTML", value: 10 },
                            { name: "Heroku", value: 10 },
                            { name: "Git", value: 10 },
                            { name: "MS\nOffice", value: 10 },
                            { name: "Unix", value: 10 }
                        ]
                    }
                ]
            },
            {
                name: "CV",
                click: true,
                value: 50
            },
            {
                name: "About\nMe",
                click: true,
                value: 50
            },
            {
                name: "Contact\nMe",
                click: true,
                value: 50,
                children: [
                    { name: "LinkedIn", click: true, value: 25},
                    { name: "Facebook", click: true, value: 25 },
                    { name: "Email", click: true, value: 25 }
                ]
            }
        ]
    }
];

function setUpSeriesProperties(series: any) {
    series.dataFields.value = "value";
    series.dataFields.children = "children";
    series.maxLevels = 3;
    series.manyBodyStrength = -20;
    series.links.template.strength = 2;
    series.minRadius = am4core.percent(2);
    series.maxRadius = am4core.percent(7);
    return series;
}

function setUpNodeProperties(nodesList: any) {
    nodesList.isActive = false;
    nodesList.propertyFields.name = "name";
    nodesList.propertyFields.click = "click";
    nodesList.outerCircle.strokeDasharray = "3,3";
    nodesList.label.text = "{name}"
    nodesList.fontSize = "1.1vmax";
    nodesList.tooltipText = "{name}";

    return nodesList;
}

function setUpLinkProperties(linksList: any) {
    linksList.strokeWidth = 1;
    let linkHoverState = linksList.states.create("hover");
    linkHoverState.properties.strokeOpacity = 1;
    linkHoverState.properties.strokeWidth = 2;
}

function createNodeEventTriggers(nodesList: any) {
    nodesList.events.once("inited", (event: any) => {
        event.target.outerCircle.disabled = !event.target.click;
    });
}

class TreeMenu extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            windowHeight: window.innerHeight, 
            windowWidth: window.innerWidth
        }
    }

    componentDidMount() {
        window.addEventListener("resize", () => {
            this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight});
        })
        let chart: any = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
        let series = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

        chart.data = CHARTDATA;

        // Set up series
        series = setUpSeriesProperties(series);

        // Set up node properties (circles)
        let nodesList: any = setUpNodeProperties(series.nodes.template);

        // Create triggers for node actions
        createNodeEventTriggers(nodesList);
        let prevNode: any = undefined;
        nodesList.events.on("hit", (event: any) => {
            if (prevNode) { prevNode.outerCircle.strokeDasharray = "3,3"; }
            let nodeCircle: any = event.target.outerCircle;
            nodeCircle.strokeDasharray = nodeCircle.strokeDasharray ? undefined : "3,3";
            console.log(event.target.name);
            let pageSelect: string = event.target.name.replace(/\n| /gm, "").toLowerCase();
            if (this.props.pages.indexOf(pageSelect) > -1) { this.props.showPage(pageSelect); }
            prevNode = event.target;
        }, this);

        // Set link properties (connecting lines)
        setUpLinkProperties(series.links.template);
    }

    render() {
        const resizedWidth = (this.props.halfSized) ? window.innerWidth/2.5 : window.innerWidth
        return <div id="chartdiv" style={{
            height: window.innerHeight, 
            width: resizedWidth,
            transition: "width 1.5s"
        }}/>
    }
}

export default TreeMenu;