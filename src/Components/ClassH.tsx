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

@observer
class ClassH extends React.Component<{Store:OntoMobileStore}>{
useStyles: any;

client:OntoMobileStore;

C:ClassHeirarchy[];
constructor(props:any){
    super(props);
    this.render = this.render.bind(this);
    
    this.useStyles = makeStyles({
        root: {
          height: 216,
          flexGrow: 1,
          maxWidth: 400,
        },
      });
      this.client = new OntoMobileStore();

      this.C= this.client.ClassHeirarcy;
}

render(){

    return(
    <div className="ComponentContainer">
    <div className="ContentContainer row">
    <div className="Heirachy col-6">
    <div className="row MembersHeading">
         <div className="MemberName col-6">Classes</div>
         <CreatClassModalD Store={this.props.Store} ></CreatClassModalD>
         <AddSubClassModal Store={this.props.Store}></AddSubClassModal>         
         <RemoveClassModalD Store={this.props.Store}></RemoveClassModalD>
       </div>
      {this.DataTreeView(this.C)}
    </div>
    <div className="Instances col-6">
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
    </div>
    </div>
    );
}



getTree(obj:ClassHeirarchy[]){
 
    return obj.map(treeItemData => {
      if(treeItemData!=null){
        let children = undefined;
      if (treeItemData.children.length>0 ) {
        children = this.getTree( treeItemData.children );
      }
    
      return (
          <TreeItem
            nodeId={treeItemData.name+"8"}
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
  return this.client.Members.map((e:any) :any  =>{
    return(
      <div className="row">
        <li className="col-8">{e.name}</li>
        <div className="col-4 iconHolder"><FontAwesomeIcon title="Remove Instance" onClick={(f:any)=>{this.RemoveInstance(e.name)}} icon={faMinusCircle}></FontAwesomeIcon></div>
      </div>
    ) 
  })
}

}

RemoveInstance(IName:String){

  this.client.RemoveInstance(IName);
  this.render();
}

}
export default  ClassH;