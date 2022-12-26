import { Footer } from "./HomeConfig";
import { FileUploader } from "react-drag-drop-files";
import { increment } from "firebase/firestore";
import './app.css'
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {
  Modal ,
  doc ,
  getDocs,
  where,
  query,
  updateDoc,
  useEffect ,
  useState ,
  getDoc ,
  getFirestore ,
  collection ,
  addDoc ,
  Input ,
  app ,
  useParams ,
  Header ,
  Button 
} from "./TokenConfig"
import { useSelector } from "react-redux";
import StopWatch from "../Re-useable/StopWatch";

function UserToken() {
  const db = getFirestore(app)
  const [tokenId,setTokenId] = useState()
  const [tokess,setToken] = useState([])
  const time = useSelector(state => state.TimeReducer.time)
  // useEffect(()=>{
    
  // },[])
  const {id} = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const storage = getStorage(app)


  const fileTypes = ["JPG", "PNG", "GIF"];


  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);

  } 
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

    let [tokenUpdate,setTokenUpdate] = useState()
    const [data,setData] = useState('');
    //console.log(tokenId)

    const tokenCounter = async () =>{
      const docRef = doc(db, `/Company/${id}/Tokens/${tokenId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());
      console.log(docSnap.data().CounterToken)

        setTokenUpdate(docSnap.data().CounterToken)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    tokenCounter()
   
   useEffect(()=>{
                    const token = async() =>{
                      const docRef = doc(db, `/Company/${id}/Tokens/Tokens${id}`);
                      const docSnap = await getDoc(docRef);

                      if (docSnap.exists()) {
                        setTokenId(docSnap.id)
                        //console.log(docSnap.id)
                        console.log(docSnap.data());
                        setToken(docSnap.data())
                      } else {
                        console.log("No Document--------------------3");
                      }


                  }
                  var timer ;
                  token()
                  timer =  setTimeout(async ()=>{
                    

                    //console.log(tokenId);
                    //console.log(id)
                    //console.log(tokenId)
                    if(data === tokenUpdate ) {
                      alert("Your Token") 
                    }

                    const washingtonRef = doc(db, `/Company/${id}/Tokens/${tokenId}`);
                    
                  
                    updateDoc(washingtonRef, {
                      CounterToken:increment(1)  
                    });

                  
      

      

      const userID = JSON.parse(localStorage.getItem("User"))
      const q = query(collection(db, `/Company/${id}/Tokens/${tokenId}/TokenBuyer`), where("userID", "==", userID.uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        //console.log({id:doc.id,... doc.data()});
        setData(doc.data().TokenNo)
        console.log(doc.data().TokenNo);

        //console.log(data)
        
      });
     

      //console.log(tokenId);
      const docRef = doc(db, `/Company/${id}/Tokens/${tokenId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());

        setTokenUpdate(docSnap.data().CounterToken)
      } else {
        // doc.data() will be undefined in this case
      }

        //console.log(data);
        //console.log(tokenUpdate);
         
      

    },600000)
    return () => {
      if (tokenUpdate === tokess.TotalTokens) {
        clearInterval(timer)
      }
    };
 
   },[tokenUpdate])
 


  
    const [single,setSingle] = useState([]);

   
    
    const [url,setUrl] = useState();
      async function addToken(Name,email,Token){
        console.log('processing')
        const loginUser = JSON.parse(localStorage.getItem("User"))
        const docRef = await addDoc(collection(db, `/Company/${id}/Tokens/${tokenId}/TokenBuyer`), {

          name: Name,
          Email: email,
          Image:url,
          TokenNo:Token+1,
          userID:loginUser.uid
        });
        //console.log(docRef)
      }
  

    useEffect(()=>{
        getDsata()
    },[])

 async    function getDsata(){
        const docRef = doc(db, "Company", id);
        const docSnap = await getDoc(docRef);
        const d = []
        if (docSnap.exists()) {
        d.push(docSnap.data())
      console.log(d)

        setSingle(d)
        } else {
        // doc.data() will be undefined in this case
      console.log('no data')
       
        }
    }






 
    //  ======================= Add Token Info ==============================
    async function uploadImage(image) {

      const storageRef = ref(storage, `Token/${image.name}`)
      const snapshot = await uploadBytes(storageRef, image)
      const url = await getDownloadURL(snapshot.ref)
      setUrl(url)
    }
  


  




  




    // =====================================================================================
    const [updateToken,setupdate] = useState(tokess.TotalTokens)
    const [Name,setName] = useState();
    const [email,setEmail] = useState()
     

    const update = async() =>{
      
    //console.log()
    uploadImage(file)
    addToken(Name,email,Number(tokess.TotalTokens))      
   

      if(time  === "11:59:00 PM"){
        const washingtonRef = doc(db,  `/Company/${id}/Tokens/Tokens${id}`);

        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
          TotalTokens:0
        });
  
      }
     
      const washingtonRef = doc(db,  `/Company/${id}/Tokens/Tokens${id}`);

      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        TotalTokens:tokess.TotalTokens != tokess.start_token ? Number(tokess.TotalTokens) + 1 :"Token is full"
      });


    }


    const Reset = async()=>{
      const washingtonRef = doc(db,  `/Company/${id}/Tokens/Tokens${id}`);

      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        TotalTokens:0
      });

    }

   
    //console.log(tokess)
   

    const Color = useSelector(state => state.ThemeReducer.theme)



    const [tokkenCounter,setTokkenCounter]=useState(0)
    const [totalTokken,setTotalToken]=useState(200)
    const [yourToken,setYourToken]=useState(6)


// ------------------------------USE EFFECT----------------------------------

    useEffect(()=>{
      const interval = setTimeout(  ()=>{
       
        if(totalTokken==tokkenCounter){
          clearInterval(interval)}
          else{
            setTokkenCounter(tokkenCounter+1)
          }
           
        },300000);
  },[tokkenCounter])





  function adddsToken(){
    setTokkenCounter(tokkenCounter+1)
  }
   
     
    function addsToken(){
      setYourToken(totalTokken+1)
    }

  return (
    <div className="bg-img">
     





      <div className="cards relative w-full h-[500px] border-2 border-black grid grid-rows-1 grid-cols-2 place-items-center">


      <div style={{color:'white'}} class="" >
    <ul class="">
        {single.map((item)=>{ 
            return (
                // <>
                // <li class="list-group-item cursor-pointer"><span className='text-xl font-black'>Company Name: </span>  {item.Company_Name}</li>
                // <li class="list-group-item cursor-pointer"><span className='text-xl font-black'>Opening Time: </span>  {item.Start_timing}</li>
                // <li class="list-group-item cursor-pointer"><span className='text-xl font-black'>Ending Time:  </span> {item.End_Time}</li>
                // <li class="list-group-item cursor-pointer"><span className='text-xl font-black'>Starting Year </span> {item.StartingYear}</li>
                // </>
                <table  class=" table-dark table-sm" style={{color:'white'}}>
  <thead >
    <tr>
     
      <th scope="col"> {item.Company_Name} </th>
    
    </tr>
  </thead>
  <tbody>
    <tr>
    <th scope="col">.</th>
      <th><td>Opening Timming</td></th>
      <td> {item.Start_timing}</td>
      
    </tr>
    <tr>
      <th scope="col">.</th>
      <th><td>Ending Timming</td></th>
      <td>{item.End_Time}</td>
     
    </tr>
    <tr>
      <th scope="col">.</th>
     <th> <td colspan="2">Starting Year  </td></th>
      <td>{item.StartingYear}</td>
    </tr>
  </tbody>
</table>
            )
        })}
       
    </ul>
    <h1 style={{color:'white'}}>{tokkenCounter==totalTokken?'No Tokens Left':''}</h1>

    </div>

    <div className="current_counter w-[200px] h-[200px] border-2 border-black bg-white flex flex-col justify-around items-center">
          <h4 className="text-black font-black">Current Token</h4>
          <p className="text-black font-black">{tokkenCounter}</p>
    </div>

    <div className="current_counter w-[200px] h-[200px] border-2 border-black bg-white flex flex-col justify-around items-center">
          <h4 className="text-black font-black">Total Token</h4>
          <p className="text-black font-black">{totalTokken}</p>
    </div>


    
    <div class="w-[250px]  h-[150px] ">
    {/* tokess.TotalTokens !== tokess.start_token  */}
    <Button className="w-full bt btn btn-primary " onClick={addsToken}>Get Token</Button>
    <p className={ `text-4xl ml-[100px] font-black ${Color === "#fff" ? "text-[#000]":"text-white"}`}></p>
    <h3 style={{color:"white"}}>Your Token</h3>
    <p style={{color:"white"}}>{yourToken == tokkenCounter ? 'Your Turn':yourToken }</p>
    <Button className="w-full bt btn btn-primary " onClick={adddsToken}>Update Token</Button>

    </div>


      </div>






      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       <div className='w-[100%] h-[300px] border-2 border-black flex flex-col justify-around items-center'>
            {/* <Input type="file" onChange={(e)=> setImagePatient(e.target.files[0].name)} placeholder="Upload Image"/> */}

            <div className="image" style={{width:'100%',height:"100%",border:"2px solid black"}}>
              <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
              <Input type="text" onClick={(e)=>setName(e.target.value)} className="mt-2 mb-2" placeholder="Enter Your Name "/>
              <Input type="text" onClick={(e)=>setEmail(e.target.value)} className="mt-2 mb-2" placeholder="Enter Your Email "/>
            </div>

            <Button >Add Token</Button>
      </div>

      </Modal>

   
    </div>
  )
}

export default UserToken