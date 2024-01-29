
import { EditTwoTone,FolderAddTwoTone, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { message,Button,Flex,Modal,Switch } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Formtable from './Formtable';
import LogTable from './LogTable';




axios.defaults.baseURL="http://localhost:8080/api"

function Accuiel() {
    const [messageApi, contextHolder] = message.useMessage();

    const [formData,setFormData]=useState({
        name:"",
        method:"",
        url:"",
        cron:"",
        isActive: true,
    })
    const [formDataEdit,setFormDataEdit]=useState({
        name:"",
        method:"",
        url:"",
        cron:"",
        isActive: true,
        _id:""
    })
    const [addSection,setAddSection]=useState(false)

    const [dataList,setDataList]=useState([])
    const [ editSection,setEditSection] = useState(false)

    const handleOnChange = (e) =>{
        const { value, name, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
        setFormData((preve)=> {
            return{
                ...preve,
                [name]: newValue
            }
        })
    }

   
    const handleSave = async (values) => {
        // e.preventDefault();
        const response = await axios.post("/create", values);
        console.log(response);
     if (response.status==200) {
        setAddSection(false)
        getFetchData()
        messageApi.open({
            type: 'success',
            content: 'This is a success message',
          });
     }
    }
const getFetchData = async()=>{
    const response = await axios.get("/");
    console.log(response)
 if (response.status==200) {
   setDataList(response.data)
 }
}
    useEffect(()=>{
        getFetchData()
    },[])
// console.log(dataList)
   
    const handleDelete = async(id)=>{
        Modal.confirm({
            title: 'Confirm Deletion',
            content: 'Are you sure you want to delete this item?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
              
        
        const response = await axios.delete("/"+id);
        
        if (response.status==200) {
            getFetchData()
            messageApi.open({
                type: 'success',
                content: 'This is a success message',
            });
        }
      },
    });
  };

  const handleUpdateIsActive = async (id, isActive) => {
    try {
      const response = await axios.put(`/${id}/updateIsActive`, { isActive });
      if (response.status === 200) {
        getFetchData();
        messageApi.open({
          type: 'success',
          content: 'This is a success message',
        });
      }
    } catch (error) {
      console.error("Error updating isActive:", error);
    }
  };
    const handleUpdate = async(values)=>{
        // e.preventDefault()
        const response = await axios.put("/" +formDataEdit._id ,values);
        if (response.status==200) {
            getFetchData()
            messageApi.open({
                type: 'success',
                content: 'This is a success message',
              });
              setEditSection(false)
        }
    }

    const handleEditOnChange= async(e)=>{
        const {value,name} = e.target
        setFormDataEdit((preve)=> {
            return{
                ...preve,
                [name]: value
            }
        })
    }

    const handleEdit = async(el)=>{
        setFormDataEdit(el)
        setEditSection(true)
    }


    const [selectedEndpointLogs, setSelectedEndpointLogs] = useState([]);

    const handleLogClick = async (endpointId) => {
        try {
          const logsResponse = await axios.get(`/logs/${endpointId}`);
      
          if (logsResponse.status === 200) {
            setSelectedEndpointLogs(logsResponse.data);
          } else {
            messageApi.error(`Failed to fetch logs. Server responded with status: ${logsResponse.status}`);
          }
        } catch (error) {
          console.error('Error fetching logs:', error);
      
          if (error.response) {
            messageApi.error(`Failed to fetch logs. Server responded with status: ${error.response.status}`);
          } else if (error.request) {
            messageApi.error('Failed to fetch logs. No response received from the server.');
          } else {
            messageApi.error('Failed to fetch logs. Request configuration error.');
          }
        }
      };
    
  
  
      useEffect(() => {
        if (selectedEndpointLogs.length > 0) {
          Modal.info({
            title: 'Log Table',
            content: <LogTable logs={selectedEndpointLogs} />,
            width: '80%',
          });
        }
      }, [selectedEndpointLogs]);

   
  return (

    <div className="container">
        {contextHolder}
      <Button  onClick={()=>setAddSection(true)}><FolderAddTwoTone/>Add</Button>
      {
            addSection && (
                <Formtable
                handleSave={handleSave}
                handleOnChange={handleOnChange} 
                handleclose={()=> setAddSection(false)}
                rest={formData}
                />
      )
    } 
    {
        editSection && (
            <Formtable
                handleSave={handleUpdate}
                handleOnChange={handleEditOnChange} 
                handleclose={()=> setEditSection(false)}
                rest={formDataEdit}
                />
        )
    }
  
        <div className='tableContainer'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Method</th>
                        <th>Url</th>
                        <th>Cron</th>
                        <th>Active</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataList[0] ? (
                    dataList.map((el)=>{
                        return(
                            <tr key={el._id}>
                                <td>{el.name}</td>
                                <td>{el.method}</td>
                                <td>{el.url}</td>
                                <td>{el.cron}</td>
                                <td>
                      <Switch
                        checked={el.isActive}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={(checked) => handleUpdateIsActive(el._id, checked)}
                      />
                    </td>
                                <td>
                                <Flex gap="small" wrap="wrap">
                                <Button  onClick={()=>handleEdit(el)} ><EditTwoTone />Edit</Button>
                                 <Button  danger onClick={()=>handleDelete(el._id)}>Delete</Button>
                                 <Button onClick={() => handleLogClick(el._id)}>Log</Button>
                                
                                
                                 </Flex>
                                </td>
                            </tr>
                        )
                    }) )
                    : (<tr><td colSpan={100}>
                        <p style={{textAlign :'center'}}>No DATA</p> </td></tr>
                    )
                    }
                </tbody>
            </table>
        </div>
        
    </div>
  )
}
export default Accuiel;

