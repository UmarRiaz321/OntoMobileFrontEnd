import React from 'react';
import OntoMobileStore from './OntoMobileStore';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle} from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import {Button} from 'react-bootstrap';
import ClassList from './ClassList';
import ClassHeirarchy from './ClassHeirarchy';

@observer
export default class RemoveClassModal extends React.Component<{Store:OntoMobileStore}>{

    private _titleId: string= "";
    public state ={
       value:'',
       show:false
    }
    store:OntoMobileStore = new OntoMobileStore();
    public ClassList:ClassList[]=[];
    constructor(props:any){
        super(props);
        this._titleId = "Remove Class";
        this.setState = this.setState.bind(this);
    
       
    }

    render(): React.ReactElement<{ }>{
        return(
            
            <div className="col-2 iconHolder" onClick={e=>this.Display()}><FontAwesomeIcon title="Remove Class" icon={faMinusCircle} />
            <Modal
            titleAriaId={this._titleId}
            isOpen={this.state.show}
            onDismiss={this.closeModal}
            isBlocking={false}
            >
            <div className="Modal_Header"> Remove Class</div>
            <div className="Modal_Body">
                <div className="form-gorup">
                <label htmlFor="cname" className="form-control">Select Class Name To Remove</label>
                 <select name="SelectClass form-control form-control-lg" ref="SelectedOption" id="cnmae" onChange={e=> this.Select(e)}>
                 {this.SetOptions(this.store.ClassHeirarcy)}
                </select>
                </div>
            </div>
            <div className="Modal_Footer">
                <Button className="btn btn-primary" onClick={ (e:any) => {this.RemoveClass()}}> Remove Class</Button>
            </div>
            </Modal>
            </div>
            
            
        )
    }
    SetOptions= (obj:ClassHeirarchy[]):any =>{
          return obj.map(((e:any) : any =>{
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
          {value:e.target.value}
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
     obj.map( (e:any) =>{
       if(e!=null){
        this.ClassList.push(e.name);
        if(e.children.lenght>0){
            this.GetThisClassList(e.children);
        }
       }
      
     })
    }
    RemoveClass(){
    this.store.RemoveClass(this.state.value);
    this.setState({
        show:false
    })
    window.location.reload(false);
    }

}