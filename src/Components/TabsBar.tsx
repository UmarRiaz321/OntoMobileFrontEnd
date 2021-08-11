
import React,{Component} from 'react';
import OntoMobileStore from './OntoMobileStore';
import { observer } from 'mobx-react';
import ClassH from './ClassH';
import InstanceVeiw from './InstanceVeiw';
import $ from 'jquery';
import {Navbar,Nav, NavItem, TabContent }from 'react-bootstrap'
import CreateOnto from './CreateOnto';
import LoadOnto from './LoadOnto';
import Save from './Save';
@observer
export default class TabsBar extends React.Component<{Store:OntoMobileStore}>{


constructor(props:any){
    super(props);
    this.render = this.render.bind(this);    
}
state={
 seleted:''

}
render(){
 
    return( 
        <>
        <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">ONTO MOBILE</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
          onChange={(e:any)=>{this.setState({selected:e})}}
          >
          <Nav.Link href="#ClassV"  data-target="#tabs">Class</Nav.Link>
          <Nav.Link href="#InstanceV">Instance</Nav.Link>
          <Nav.Link href="#CreateOnto">Create New Ontology</Nav.Link>
          <Nav.Link href="#LoadOnto">Load Ontology</Nav.Link>
          <Nav.Link href="#SaveOnto">Save Ontology</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
        <section className="section" id="ClassV">
        <ClassH Store={this.props.Store}></ClassH>
        </section>
        <section className="section" id="InstanceV">
          <InstanceVeiw Store={this.props.Store}></InstanceVeiw>
        </section>
        <section className="section" id="CreateOnto">
          <CreateOnto Store={this.props.Store} ></CreateOnto>
        </section>
        <section className="section" id="LoadOnto">
          <LoadOnto Store={this.props.Store} ></LoadOnto>
        </section>
        <section className="section" id="SaveOnto">
          <Save Store={this.props.Store} ></Save>
        </section>
        </>
    );
}


}