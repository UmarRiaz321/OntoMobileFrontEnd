import Configuration from './Configuration';
class OntoMobileService {

    Message: String;
    Heirarchy: Object;
    config:any;
    headers:any;
    loaded:any ;
    constructor() {
        this.config = new Configuration();
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        //headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
        this.headers.append('Access-Control-Allow-Credentials', 'true');
        this.headers.append('GET', 'POST');
        this.Message ="";
        this.Heirarchy =[];
        this.loaded = false;
    }

   async CreatOnto(){
      return fetch(this.config.CreateOntology,{
           headers:this.headers,
           method:'GET'
       }).then( res=>{
          return res.json();
       }).then(json =>
       {
           this.Message = json;
           this.loaded = true;
       })
       
   }
    async Printheirarchy(){
        
        return fetch(this.config.PrintHeirarcy,{
            headers: this.headers,
            credentials: 'include',
            method: 'POST',
        }  
        )
        .then(res =>{
            return res.json();
            })
            .then(json =>{
                  this.Heirarchy = json;
               })
  
      }
}
export default OntoMobileService;