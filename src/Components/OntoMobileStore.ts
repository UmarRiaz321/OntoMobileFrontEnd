import {autorun, observable} from 'mobx';
import ClassHeirarchy from './ClassHeirarchy';
import Members from './Members';
import { async } from 'q';
import DataPropertyList  from './DataPropertyList';


export default class OntoMobileStore {

@observable  ClassHeirarcy:ClassHeirarchy[]=[];
@observable Message = "";
@observable Members: Members[]=[];
@observable loaded:boolean =false;
@observable IRI:string ="";
@observable ShowModal:boolean = false;
@observable CreatClassMessage:String="";
@observable SelectedClass:String="";
@observable Path:String="";
@observable dpList: DataPropertyList[]=[];
@observable opList: DataPropertyList[]=[];


constructor(){
  setTimeout(() => {
    this.loaded = true;
  }, 1000);
  
}
fun = autorun(async()=>{
  await this.PrintHeirarchy();
})
CreateOntology(){
  fetch('http://localhost:8080/CreateOntology')
  .then((res:any) =>{
    if(res.status == 200){
      alert("Emty Ontology Create");
    }
    
  })
}
async PrintHeirarchy(){
 await fetch('http://localhost:8080/PrintClassH')
  .then((res:any):any => 
     res.json()
  ).then((data:any): any =>
  {
    this.ClassHeirarcy[0] = data;
  }
  )
}
async GetMemberList(ClassName:String){
 await fetch('http://localhost:8080/GetIndviuals?ClassName='+ClassName)
 .then((res:any):Promise<any> =>{
     return res.json();
 }).then((response:any): any =>{
  this.Members = response;
 });  
}

async CreateClass(ClassName:String){
  await fetch('http://localhost:8080/AddClass?ClassName='+ClassName);
  
}
async RemoveClass(ClassName:String){
  await fetch('http://localhost:8080/RemoveClass?ClassName='+ClassName);
}

async AddSubClass (ParentClass :String, ChildClass:String){

  await fetch('http://localhost:8080/AddSubClass?CClassName='+ChildClass+'&PClassName='+ParentClass);
    
}

async AddInstance(ParentClass:String,InstanceName:String){

  await fetch('http://localhost:8080/AddInstance?CName='+ParentClass+'&IName='+InstanceName);
  
}

async RemoveInstance(IName:String){
  await fetch('http://localhost:8080/RemoveInstance?InstanceName='+IName);
}
async LoadFromFile(path:String){
await fetch('http://localhost:8080/LoadOntologyFromFile?Path='+path)
      .then((res:any) =>{
         if(res.status ==200){
           alert('Ontology Loaded');
         }
      })
      window.location.reload(false);
}

async LoadFromWeb(path:String){
  await fetch('http://localhost:8080/LoadOntologyFromWeb?Path='+path)
        .then((res:any) =>{
           if(res.status ==200){
             alert('Ontology Loaded');
           }
        })
        
  }

  async SaveOnto(name:String){
    await fetch('http://localhost:8080/SaveOntology?OntologyName='+name)
    .then((res:any) =>{
       if(res.status ==200){
         alert('Ontology Saved');
       }
    })
  }
  async FetchDataProperties(InstanceName:String){
    await fetch('http://localhost:8080/ListDataProp?AcName='+InstanceName)
          .then((res:any)=>{
           
            return res.json();
          })
          .then((response:any): any =>{
            this.dpList = response;
            console.log(this.dpList);
          }
          )
  }

  async FetchObjectProperties(InstanceName:String){
    await fetch('http://localhost:8080/ListObjectProp?AcName='+InstanceName)
          .then((res:any)=>{
           
            return res.json();
          })
          .then((response:any): any =>{
            this.opList = response;
            console.log(this.opList);
          }
          )
  }

  async AddDataProperty(IName:String,PName:String,Value:String){
    await fetch('http://localhost:8080/AddDataProperty?AcName='+IName+"&Property="+PName+"&Value="+Value)
          .then((res:any)=>{
            if(res.status==200){
              alert("Property Added");
            }
          })
  }

  async AddObjectProperty(AcName:String,PcName:String,Property:String){
    await fetch('http://localhost:8080/AddObjectProperty?AcName='+AcName+"&PassName="+PcName+"&Property="+Property)
    .then((res:any)=>{
      if(res.status==200){
        alert("Property Added");
      }
    })
  }

}
