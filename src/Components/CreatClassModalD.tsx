import React from 'react';
import OntoMobileStore from './OntoMobileStore';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faPlusCircle,faMinusCircle} from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import CreatClassModal  from './CreatClassModal';
import {Button} from 'react-bootstrap';


@observer
export default class CreatClassModalD extends React.Component<{Store:OntoMobileStore}>{
    private _titleId: string= "";
    public state:CreatClassModal={
       show:false,
       isDraggable:false,
       value:'Enter Class Name'
    }
    public Fstate:any;
    store:OntoMobileStore = new OntoMobileStore();
    constructor(props:any){
        super(props);
        this._titleId = "Create New Class";
        this.setState = this.setState.bind(this);
        
    
    }
  
    render(): React.ReactElement<{ }>{
        return(
            
            <div className="col-2 iconHolder" onClick={e=>this.Display()}><FontAwesomeIcon title="Add Class" icon={faPlusSquare} />
            <Modal
            titleAriaId={this._titleId}
            isOpen={this.state.show}
            onDismiss={this.closeModal}
            isBlocking={false}
            >
            <div className="Modal_Header">Create New Class</div>
            <div className="Modal_Body">
                <div className="form-gorup">
                <label htmlFor="cname"  className="form-control">Enter Name</label>
                <input type="text" onChange={(e) => {this.ChangHandle(e)}} className="form-control" id="cname" value={this.state.value}/>
                </div>
            </div>
            <div className="Modal_Footer">
                <Button className="btn btn-primary" onClick={ (e:any) => {this.CreatClass()}}> Create Class</Button>
            </div>
            </Modal>
            </div>
            
            
        )
    }

    public closeModal = (): void => {
     
        this.setState({
            show:false
        })
    }
    public async Display(){
     this.setState({show:true})
    }

    public CreatClass =():void =>{
       
        this.store.CreateClass(this.state.value);
        this.setState({show:false});
         window.location.reload(false);

    }
   public ChangHandle(e:any){
     this.setState({
         value: e.target.value
     })
    }
}