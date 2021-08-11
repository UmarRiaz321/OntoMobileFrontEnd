import React,{Component} from 'react';

import OntoMobileStore from './OntoMobileStore';
import { observer } from 'mobx-react';

@observer 
export default class Save extends React.Component<{Store:OntoMobileStore}>{

state={
    OntoName:''
}
client:OntoMobileStore= new OntoMobileStore();
constructor(props:any){

    super(props);
    
}

render(){
    return(
        <div className="ComponentContainer">
         
         <div className="LoadElement">
         <div className="miniHeader">Save Ontology File</div>
               <input type="text" onChange={(e) => {this.ChangHandle(e)}} className="form-control" id="loadFromFile" placeholder="Enter Name" value={this.state.OntoName}/>
               <button className="form-control btn btn-primary" onClick={(e) =>{this.SaveFile()}} >Save Ontology</button>
           </div>
        </div>
    );
}

ChangHandle(e:any){

    this.setState({
        OntoName:e.target.value
    })
}

async SaveFile(){
    this.client.SaveOnto(this.state.OntoName);
}
}