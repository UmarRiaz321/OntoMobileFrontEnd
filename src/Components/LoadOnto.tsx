import React,{Component} from 'react';

import OntoMobileStore from './OntoMobileStore';
import { observer } from 'mobx-react';


@observer
export default class LoadOnto extends React.Component<{Store:OntoMobileStore}>{
 state={
    fromFile:'',
    fromWeb:''
  }
  store:OntoMobileStore=new OntoMobileStore();
  constructor(props:any){
      super(props);
     
  }
    render(){

        return(

         <div className="ComponentContainer">
           <div className="LoadElement">
           <div className="miniHeader">Load Ontology From File</div>
               <input type="text" onChange={(e) => {this.ChangHandle(e)}} className="form-control" id="loadFromFile" placeholder="Enter Path" value={this.state.fromFile}/>
               <button className="form-control btn btn-primary" onClick={(e) =>{this.LoadFromFile()}} >Load From File</button>
           </div>
           {/* <div className="LoadElement">
           <div className="miniHeader">Load Ontology From Web</div>
               <input type="text" onChange={(e) => {this.ChangHandleWeb(e)}} className="form-control" id="loadFromWeb" placeholder="Enter URL" value={this.state.fromWeb}/>
               <button className="form-control btn btn-primary" onClick={(e) =>{this.LoadFromWeb()}} >Load From Web</button>
           </div> */}
         </div>
        );
    }

    public ChangHandle(e:any){
        this.setState({
            fromFile: e.target.value
        })
    }
    public ChangHandleWeb(e:any){
        this.setState({
            fromWeb:e.target.value
        })
    }

    public async LoadFromFile(){
        this.store.LoadFromFile(this.state.fromFile);
    }
    public async LoadFromWeb(){
      this.store.LoadFromWeb(this.state.fromWeb);
    }
}