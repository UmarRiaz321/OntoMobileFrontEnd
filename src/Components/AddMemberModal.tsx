import React from 'react';
import OntoMobileStore from './OntoMobileStore';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import {Button} from 'react-bootstrap';
import ClassList from './ClassList';
import ClassHeirarchy from './ClassHeirarchy';

@observer

export default class AddMemberModal extends React.Component<{Store:OntoMobileStore}>{

    private _titleId: string= "";
    public state ={
       show:false,
       Member:'',
       parentClass:''
    }
    public store:OntoMobileStore=new OntoMobileStore();
    constructor(props:any){
        super(props);
        this._titleId = "Add New Member";
        this.setState = this.setState.bind(this);
    }

    render(): React.ReactElement<{}>{

        return(
            <div className="col-2 iconHolder" onClick={e=>this.Display()}><FontAwesomeIcon title="Add Instance" icon={faPlusCircle} />
            <Modal
            titleAriaId={this._titleId}
            isOpen={this.state.show}
            onDismiss={this.closeModal}
            isBlocking={false}
            >
            <div className="Modal_Header">Add New Member</div>
            <div className="Modal_Body">
                <div className="form-gorup">
                <label htmlFor="cname"  className="form-control">Select Class</label>
                <select name="SelectClass form-control form-control-lg" ref="SelectedOption" id="cnmae" onChange={e=> this.Select(e)}>
                 {this.SetOptions(this.store.ClassHeirarcy)}
                </select>
                </div>
                <div className="form-gorup">
                <label htmlFor="Membername"  className="form-control">Enter New Member Name</label>
                <input type="text" onChange={(e) => {this.ChangHandle(e)}} className="form-control" id="Membername" value={this.state.Member}/>
                </div>
            </div>
            <div className="Modal_Footer">
                <Button className="btn btn-primary" onClick={ (e:any) => {this.CreateMember()}}> Add Members</Button>
            </div>
            </Modal>
            </div>
        )
    }
   public SetOptions= (obj:ClassHeirarchy[]):any =>{
       if(obj.length>0) {
        return obj.map((e=>{
            if(e!=null){
               let children = undefined;
               if(e.children.length>0){
                   children = this.SetOptions(e.children);
               }  
               return(
                  <>
                      <option value={e.name}>{e.name}</option>
                      {children}
                  </>
                  
                 )
            }
            
           }))
       }
       
  }
  public Select(e:any){
    this.setState(
        {parentClass:e.target.value}
    )}
    public async ChangHandle(event:any){

        this.setState({
           Member: event.target.value
        })
    }
    public closeModal = (): void => {
     
        this.setState({
            show:false
        })
    }
    public async Display(){
        this.setState({show:true})
    }
    public async CreateMember(){
         
        this.store.AddInstance(this.state.parentClass ,this.state.Member);
        this.setState({
            show:false
        })
    }
   
}