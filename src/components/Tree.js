import React from "react";
import { Component } from "react";
import * as d3 from "d3";

var d3BinaryTree = require("d3-binarytree").binarytree();

class Tree extends Component {
    
    constructor(props){

        super(props);

        this.state = {
            data:[],
            formData: ' '
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event){
        this.setState({formData: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        this.state.data.push(this.state.formData);
        console.log(`formData: ${this.state.formData}`);
        d3BinaryTree.add(this.state.formData);
        this.drawNodes();
        this.setState({formData: ' '});
    }

    componentDidUpdate(){
        //console.log(d3BinaryTree.data());
    }

    componentDidMount(){
        this.drawChart();
    }

    drawNodes(){
        //Get svg canvas
        let svg = d3.select(this.refs.canvas).select("svg");
        
        //Initial position for any node
        const ix = 400;
        const iy = 18;

        
        console.log("*******************************");
        console.log("-------------------------------");

        d3BinaryTree.visit((node, x0, x1) => {
            if(node.length)
            {
                console.log(node.length);
                console.log(node.left);
                console.log(node.right);
            }
            if (!node.length)
                do {
                    console.log(node.data);
                    console.log(x0);
                    console.log(x1);
                    console.log("-------------------------------");
                }
            while (node = node.next);
        });

        console.log("*******************************");
        
    }

    drawChart(){
        //Get canvas
        const canvas = d3.select(this.refs.canvas);

        //Declare svg size constants
        const width = 800;
        const height = 800;
        
        //Declare svg element
        let svg = canvas.append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("border-color", "black")
            .style("border-style", "solid")
            .style("border-width", "1px");

    }

    render() {
        return (
            <div id="ans">
                <div ref="canvas">

                </div>
                <div id="form">
                    <form onSubmit={this.handleSubmit}>
                        New node value:<br/>
                        <input type="text" value={this.state.formData} name="value" onChange={this.handleChange}/><br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        );
    }

}

export default Tree;