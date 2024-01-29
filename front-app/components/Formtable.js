// import React from "react";
// import'../src/app/globals.css'
// import { CloseCircleOutlined} from '@ant-design/icons';
// const Formtable =({handleSave,handleOnChange, handleclose,rest}) =>{
    
//     return(
//         <div className="addContainer" >
        
//         <form onSubmit={handleSave}>
//         <div className="close-btn" onClick={handleclose}><CloseCircleOutlined /></div>
//             <label htmlFor="name">Name :</label>
//             <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}/>
//             <label htmlFor="method">Method :</label>
//             <select id="method" name="method" onChange={handleOnChange} value={rest.method}>
//                     <option value="GET">GET</option>
//                     <option value="POST">POST</option>
//                     <option value="PUT">PUT</option>
//                     <option value="PATCH">PATCH</option>
//                     <option value="DELETE">DELETE</option>
//             </select>
//                 <label htmlFor="url">URL :</label>
//                   <input type="text" id="url" name="url"  onChange={handleOnChange} value={rest.url}/>
//                   <label htmlFor="cron">Cron :</label>
//                   <input type="text" id="cron" name="cron"  onChange={handleOnChange} value={rest.cron}/> 
//         <button className="btn">Save</button>
        
//         </form> 
//               </div>)
//    }
// export default Formtable;

import React from "react";
import { Button, Form, Input, Modal, Select,Switch } from 'antd';

const Formtable = ({ handleSave, handleOnChange, handleclose, rest }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="  "
      open={true} // You can modify this based on your requirements
      onCancel={handleclose}
      footer={[
        <Button key="cancel" onClick={handleclose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={() => form.submit()}>
          Save
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          name: rest.name,
          method: rest.method,
          url: rest.url,
          cron: rest.cron,
          isActive: rest.isActive,
        }}
        onFinish={handleSave}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the name!',
            },
          ]}
        >
          <Input onChange={handleOnChange} />
        </Form.Item>
        <Form.Item
          name="method"
          label="Method"
          rules={[
            {
              required: true,
              message: 'Please select the method!',
            },
          ]}
        >
          {/* <select onChange={handleOnChange}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select> */}
           <Select
            style={{
              width: 120,
            }}
            onChange={(value) => handleOnChange({ target: { name: 'method', value } })}
          >
            <Select.Option value="GET">GET</Select.Option>
            <Select.Option value="POST">POST</Select.Option>
            <Select.Option value="PUT">PUT</Select.Option>
            <Select.Option value="PATCH">PATCH</Select.Option>
            <Select.Option value="DELETE">DELETE</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="url"
          label="URL"
          rules={[
            {
              required: true,
              message: 'Please input the URL!',
            },
          ]}
        >
          <Input onChange={handleOnChange} />
        </Form.Item>
        <Form.Item
          name="cron"
          label="Cron"
          rules={[
            {
              required: true,
              message: 'Please input the cron expression!',
            },
          ]}
        >
          <Input onChange={handleOnChange} />
        </Form.Item>
        <Form.Item
          name="isActive"
          label="Active"
          valuePropName="checked"
          initialValue={rest.isActive}
        >
          <Switch onChange={(checked) => handleOnChange({ target: { name: "isActive", type: "checkbox", checked } })} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Formtable;
