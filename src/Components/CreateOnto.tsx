import React,{Component} from 'react';

import OntoMobileStore from './OntoMobileStore';
import { observer } from 'mobx-react';

@observer

export default class CreateOnto extends React.Component<{Store:OntoMobileStore}>{
    
    client:OntoMobileStore;
    constructor(props:any){

        super(props);
        this.CreatOnto = this.CreatOnto.bind(this);
        this.client = new OntoMobileStore();
    }
    store:OntoMobileStore=new OntoMobileStore();
    render(){
        return(
            <div className="CreateOnto">
             <button className="btn btn-primary" onClick={(e:any)=> this.CreatOnto()}>Create Empty Ontology</button>
            </div>
        );
    }
    CreatOnto(){
     this.client.CreateOntology();
    }
}