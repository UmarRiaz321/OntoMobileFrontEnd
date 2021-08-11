import React,{Component} from 'react'
import {Provider,observer} from  'mobx-react';
import Store from './OntoMobileStore';
import Tabs from './TabsBar';
import OntoMobileStore from './OntoMobileStore';
@observer
export default class Home extends React.Component<{Store:Store}>{
     
    store:Store= new OntoMobileStore();
  
    constructor(props:any){
        super(props);
    }
    
    render(){
     return(
        <div className="App">
            <Tabs Store={this.props.Store}></Tabs>
        </div>
     );
    }
}