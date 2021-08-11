import React from 'react';
import OntoMobileStore from './OntoMobileStore';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import {Button} from 'react-bootstrap';
import ClassList from './ClassList';
import ClassHeirarchy from './ClassHeirarchy';

export default class AddSubClassModal extends React.Component<{Store:OntoMobileStore}>{
    private _titleId: string= "";
    public state ={
       parentClass:'',
       show:false,
       childClass:''
    }

    public store:OntoMobileStore=new OntoMobileStore();
    public ClassList:ClassList[]=[];
    constructor(props:any){
        super(props);
        this._titleId = "Add Sub Class";
        this.setState = this.setState.bind(this);
    }
    render(): React.ReactElement<{}>{
       
        return(
            <div className="col-2 iconHolder" onClick={e=>this.Display()}><FontAwesomeIcon title="Add Sub Class" icon={faPlusCircle} />
            <Modal
            titleAriaId={this._titleId}
            isOpen={this.state.show}
            onDismiss={this.closeModal}
            isBlocking={false}
            >
            <div className="Modal_Header"> Add Sub Class</div>
            <div className="Modal_Body">
                <div className="form-gorup">
                <label htmlFor="cname" className="form-control">Select Parent Class</label>
                 <select name="SelectClass form-control form-control-lg" ref="SelectedOption" id="cnmae" onChange={e=> this.Select(e)}>
                 {this.SetOptions(this.store.ClassHeirarcy)}
                </select>
                <label htmlFor="childCname" className="form-control">Enter Child Class Name</label>
                <input type="text" onChange={(e) => {this.ChangHandle(e)}} className="form-control" id="childCname" value={this.state.childClass}/>
                </div>
            </div>
            <div className="Modal_Footer">
                <Button className="btn btn-primary" onClick={ (e:any) => {this.AddSubClass()}}> Add Sub Class</Button>
            </div>
            </Modal>
            </div>
            
            
        )
    }
    SetOptions= (obj:ClassHeirarchy[]):any =>{
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
    public Select(e:any){
      this.setState(
          {parentClass:e.target.value}
      )
    }
    public closeModal = (): void => {
     
        this.setState({
            show:false
        })
    }
    public async Display(){
        this.GetThisClassList(this.store.ClassHeirarcy);
        this.setState({show:true})
    }
    GetThisClassList(obj:ClassHeirarchy[]){
        if(obj!=null){
            obj.map( (e:any) =>{
                if(e!=null){
                 this.ClassList.push(e.name);
                 if(e.children.lenght>0){
                     this.GetThisClassList(e.children);
                 }
                }
                
             })
        }
        
       }
       public ChangHandle(e:any){
        this.setState({
            childClass: e.target.value
        })
       }

       public AddSubClass(){
        
        this.store.AddSubClass(this.state.parentClass,this.state.childClass);

        this.setState({
            show:false
        })

        window.location.reload(false);

       }
}
