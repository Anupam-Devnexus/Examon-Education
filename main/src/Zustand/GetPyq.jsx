import {create} from "zustand"
import axios from "axios"


export default usePyqstore = ((set, get)=>({


    error:null,
    loading:false,
    pyqData:[],

    fetchPyq : async ()=>{
        let response = await axios.get('http://194.238.18.1:3004/api/pyq/add');
        
    }

}))