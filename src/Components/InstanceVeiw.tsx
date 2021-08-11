import React,{Component} from 'react';

import OntoMobileStore from './OntoMobileStore';
import { observer } from 'mobx-react';
import ClassHeirarchy from './ClassHeirarchy';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle,faMinusCircle} from '@fortawesome/free-solid-svg-icons'
import CreatClassModalD from './CreatClassModalD';
import RemoveClassModalD from './RemoveClassModal';
import AddSubClassModal from './AddSubClassModal';
import AddMemberModal from './AddMemberModal';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import {Button} from 'react-bootstrap';

@observer
export default class InstanceVeiw extends React.Component<{Store:OntoMobileStore}>{

useStyles: any;
ClassHeirarcy:ClassHeirarchy[];
client:OntoMobileStore= new OntoMobileStore();
state={
showDataPropertyModal:false,
showObjectPropertyModal:false,
dpName:'',
Membername:'',
dpValue:'',
rangeMember:'',
opName:''
};
constructor(props:any){
    super(props);
    this.render = this.render.bind(this);
    this.ClassHeirarcy = this.client.ClassHeirarcy;
    this.useStyles = makeStyles({
        root: {
          height: 216,
          flexGrow: 1,
          maxWidth: 400,
        },
      });
}

render(){
    return(
        <div className="ComponentContainer">
        <div className="ContentContainerIns row">
        <div className="Heirachy col-6">
        <div className="row MembersHeading">
        <div className="MemberName col-6">Classes</div>
        <CreatClassModalD Store={this.props.Store} ></CreatClassModalD>
        <AddSubClassModal Store={this.props.Store}></AddSubClassModal>         
        <RemoveClassModalD Store={this.props.Store}></RemoveClassModalD>
        </div>
          {this.DataTreeView(this.ClassHeirarcy)}
        <div className="row MembersHeading">
         <div className="MemberName col-10">Members</div>
         <AddMemberModal Store={this.props.Store}></AddMemberModal>
       </div>
       <div className="MemberList">
         <ul className="InstanceList">
             {this.GetMemberList()}
         </ul>
       </div>
       </div>
       <div className="Instances col-6">
       <div className="row MembersHeading">
       <div className="MemberName col-10">Data Properties</div>
       {this.DataPropertyModal()}
       </div>
       <div className="MemberList pList ">
         {this.getDPList()}
       </div>
       <div className="row MembersHeading">
       <div className="MemberName col-10">Object Properties</div>
       {this.ObjectPropertyModal()}
       </div>
       <div className="MemberList pList">
         {this.getOPList()}
       </div>
       </div>
      </div>
      </div>
    )
}

ObjectPropertyModal(){
  
  return(
    <div className="col-2 iconHolder" onClick={e=>this.AddObjectProperthyModal()}><FontAwesomeIcon title="Add Object Property" icon={faPlusCircle} />
    <Modal
            titleAriaId= "Add Data Propperty"
            isOpen={this.state.showObjectPropertyModal}
            onDismiss={this.closeOPModal}
            isBlocking={false}
          >
            <div className="Modal_Header">Add Object Properties</div>
            <div className="Modal_Body">
            <input type="text" onChange={(e) => {this.ChangOPNameHandle(e)}} className="form-control" placeholder="Enter Property Name"id="Propertyname" value={this.state.opName}></input>
                <input type="text" onChange={(e) => {this.ChangOPValueHandle(e)}} className="form-control" placeholder="Enter Instance from Range Class"id="Value" value={this.state.rangeMember}></input>      
            </div>
            <div className="Modal_Footer">
                <Button className="btn btn-primary" onClick={ (e:any) => {this.AddObjectProperty()}}> Add Property</Button>
            </div>
          </Modal>
    </div>
  )
}
DataPropertyModal(){

  return(
    <div className="col-2 iconHolder" onClick={e=>this.AddDataProperthyModal()}><FontAwesomeIcon title="Add Data Property" icon={faPlusCircle} />
    <Modal
            titleAriaId= "Add Data Propperty"
            isOpen={this.state.showDataPropertyModal}
            onDismiss={this.closeDPModal}
            isBlocking={false}
            >
            <div className="Modal_Header">Add Data Properties</div>
            <div className="Modal_Body">
                <div className="form-gorup">
                <input type="text" onChange={(e) => {this.ChangDPNameHandle(e)}} className="form-control" placeholder="Enter Property Name"id="Propertyname" value={this.state.dpName}></input>
                <input type="text" onChange={(e) => {this.ChangDPValueHandle(e)}} className="form-control" placeholder="Enter Value"id="Value" value={this.state.dpValue}></input>                
                </div>
            </div>
            <div className="Modal_Footer">
                <Button className="btn btn-primary" onClick={ (e:any) => {this.AddDataProperty()}}> Add Property</Button>
            </div>
            </Modal>
    </div>
  );
}
closeDPModal=() =>{
  this.setState({
    showDataPropertyModal:false
  })
}
closeOPModal=() =>{
  this.setState({
    showObjectPropertyModal:false
  })
}
AddDataProperty =() =>{
  this.setState({
    showDataPropertyModal:false 
  });
  this.client.AddDataProperty(this.state.Membername,this.state.dpName,this.state.dpValue );
  //alert(this.state.dpName + this.state.dpValue+ this.state.Membername);
}

AddObjectProperty =() =>{
  this.setState({
    showObjectPropertyModal:false 
  });

  this.client.AddObjectProperty(this.state.Membername,this.state.rangeMember,this.state.opName);

}
ChangDPValueHandle =(e:any)=>{
  this.setState({
    dpValue:e.target.value
  })
}
ChangOPValueHandle =(e:any)=>{
  this.setState({
    rangeMember:e.target.value
  })
}
ChangDPNameHandle=(e:any) => {
this.setState({
  dpName: e.target.value
})
}
ChangOPNameHandle=(e:any) => {
  this.setState({
    opName: e.target.value
  })
  }
AddDataProperthyModal(){
this.setState({
  showDataPropertyModal:true 
});

}
AddObjectProperthyModal(){
  this.setState({
    showObjectPropertyModal:true 
  });
  
  }
getTree(obj:ClassHeirarchy[]){

    return obj.map( (treeItemData)=>{
     if(treeItemData!=null){
      let children = undefined;
      if (treeItemData.children.length>0) {
        children = this.getTree( treeItemData.children );
      }
      return (
          <TreeItem
            nodeId={treeItemData.name+"id123"}
            label={treeItemData.name}
            children={children}
            onClick={(e) => { this.handleClick(treeItemData.name)}}
          ></TreeItem>
        );
     }
    }
    );
 }
    
 DataTreeView = (treeItems:ClassHeirarchy[])=>{
     const classes= this.useStyles;
     return (
         <TreeView
             className={classes.root}
             defaultCollapseIcon={<ExpandMoreIcon />}
             defaultExpandIcon={<ChevronRightIcon />}
         >
           {this.getTree( treeItems)}
         </TreeView>
       );
 }
 
 handleClick = (event:any)=>{ 
   this.client.GetMemberList(event);
   
 }
 
 GetMemberList(){
 if(this.client.Members.length>0){
  return this.client.Members.map( e =>{
       
    return(
    
      <div className="MemberNameList row">
        <div className="col-10 " onClick={(f)=>{this.getProperties(e.name)}}>
        <li>{e.name}</li>
        </div>
        <div className="col-2 iconHolder"><FontAwesomeIcon title="Remove Instance" onClick={(f:any)=>{this.RemoveInstance(e.name)}} icon={faMinusCircle}></FontAwesomeIcon></div>
      </div>
    )
  })
 }
 }
 public RemoveInstance(IName:String){
 this.client.RemoveInstance(IName);
  }

async getProperties(IName:String){
  this.setState({
    Membername:IName
  })
 await this.client.FetchDataProperties(IName);
 await this.client.FetchObjectProperties(IName);
}
getDPList(){
 return this.client.dpList.map( e =>{
   
  return(
    <div className ="row">
      <div className="col-8 text-centre">
        <div>{e.name}</div>
      <ul className="list-group proprtyList"> 
      <li className="list-group-item"> {this.getValues(e.vaues)}</li>
      </ul>
      </div>
    </div>
  )

  })
}
getOPList(){
  return this.client.opList.map( e =>{
    
   return(
     <div className ="row">
       <div className="col-8 text-centre">
         <div>{e.name}</div>
       <ul className="list-group proprtyList"> 
       <li className="list-group-item"> {this.getValues(e.vaues)}</li>
       </ul>
       </div>
     </div>
   )
 
   })
 }
getValues(Values:String[]){
  if(Values.length>0){
    return Values.map(e=>{
      return(
        <li>{e}</li>
      )
    })
  }
 
}

}