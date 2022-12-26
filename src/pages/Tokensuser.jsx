import { Footer } from './HomeConfig';
import './app.css'
import LoadingScreen from 'react-loading-screen';
import {
    getFirestore,
    useState,
    query ,
    collection,
    getDocs,
    app,useEffect,
    Header,
    Link
} from './TokenConfig'
import "./styles/index.css"
import { Button, Input  } from 'antd';
import { useSelector } from 'react-redux';

function Tokenuser() {
  
    const db = getFirestore(app)

    const [data,setData] = useState([]);
    const [searchTerm,setSearchTerm] = useState("")
    const [loading,setLoading] = useState(true)
    const results = async() =>{
        const q = query(collection(db, "Company"));
        const data = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        data.push({id:doc.id,... doc.data()})
        setData(data)
        });
    }


    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        },2000)

        results()
    },[])

        const Theme = useSelector(state => state.ThemeReducer.user)
        const Color = useSelector(state => state.ThemeReducer.theme)
































  return (
    <div  className='bg-img-2' >
       

     
  
  {
    loading === true ?


<LoadingScreen
loading={true}
bgColor='#f1f1f1'
spinnerColor='#9ee5f8'
textColor='#676767'
text='Please wait us '
> 

</LoadingScreen>
:
<>
        <div className="container-fluid h-[auto]   flex flex-col justify-around items-center">


            <div className="Search">
                    <Input placeholder="Search" onChange={(e)=> setSearchTerm(e.target.value)}/>
                
            </div>

                <div className="tableUser">
                                            <table class="table">
                            <thead>
                                <tr>
                       
                                <th scope="col" style={{color:"black"}} className="text-white">Company Name</th>
                                <th scope="col" style={{color:"black"}} className="text-white">Country</th>
                                <th scope="col" style={{color:"black"}} className="text-white">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                  {   data.filter(val=>{
                                    if (searchTerm === ''){
                                        return val
                                    }
                                    else if (val.Company_Name.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return val
                                    }
                                  }).map((item)=>{
                return (
                    <tr key={item.id}>
                           <td> <p className="font-black text-3xl text-white">{item.Company_Name}</p></td>
                            <td><p className='font-black text-3xl text-white' >{item.Country}</p></td>
                            <td><Button type='primary'><Link to={`/userToken/${item.id}`} >View</Link></Button></td>
                    </tr>
    
                )
            })
                
            }
                            </tbody>
                            </table>

                </div>

        </div>


                </>
}
    </div>
  )
}

export default Tokenuser