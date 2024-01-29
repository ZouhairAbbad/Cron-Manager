
// // LogTable.js
// import React ,{ useEffect, useState }from 'react';
// import { Table, Tag } from 'antd';
//  // Importez le fichier CSS pour les styles du tableau

// const LogTable = ({ logs }) => {
  

//   const [coloredLogs, setColoredLogs] = useState([]);

//   useEffect(() => {
//     // Logique pour mettre à jour les couleurs des tags lorsque logs change
//     const updatedColoredLogs = logs.map(log => ({
//       ...log,
//       color: getTagColor(log.level),
//     }));
//     setColoredLogs(updatedColoredLogs);
//   }, [logs]);


//   const columns = [
//     {
//       title: 'Date de début',
//       dataIndex: 'dateDebut',
//       key: 'dateDebut',
//     },
//     {
//       title: 'Endpoint',
//       dataIndex: 'endpoint.name',
//       key: 'endpoint',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'response.status',
//       key: 'status',
//     },
//     {
//       title: 'Response',
//       dataIndex: 'response.text',
//       key: 'text',
//     },
//     {
//       title: 'level',
//       dataIndex: 'level',
//       key: 'level',
//       render: (level, record) => (
//         <Tag color={record.color}>{level}</Tag>
//       ),
//     },
//   ];
//   const getTagColor = (level) => {
//     // Logique de couleur ici...
//     switch (level) {
//       case 'info':
//         return 'grey';
//       case 'empty':
//         return 'orange';
//       case 'success':
//         return 'green';
//       case 'error':
//         return 'red';
//       default:
//         return 'blue';
//     }
//   };
//   return (
//     <div className="log-table-container">
//       <Table dataSource={coloredLogs} columns={columns} rowKey="_id" />
//     </div>
//   );
// };

// export default LogTable;



import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const LogTable = ({ logs }) => {
  const [coloredLogs, setColoredLogs] = useState([]);

  useEffect(() => {
    // Logique pour mettre à jour les couleurs des tags lorsque logs change
    const updatedColoredLogs = logs.map(log => ({
      ...log,
      color: getTagColor(log.level),
      icon: getTagIcon(log.level),
    }));
    setColoredLogs(updatedColoredLogs);
  }, [logs]);

  const getTagColor = (level) => {
    switch (level) {
      case 'info':
        return 'processing';
      case 'empty':
        return 'warning';
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTagIcon = (level) => {
    switch (level) {
      case 'info':
        return <SyncOutlined spin />;
      case 'empty':
        return <ExclamationCircleOutlined />;
      case 'success':
        return <CheckCircleOutlined />;
      case 'error':
        return <CloseCircleOutlined />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  const columns = [
    {
      title: 'Date de début',
      dataIndex: 'dateDebut',
      key: 'dateDebut',
    },
    {
      title: 'Endpoint',
      dataIndex: 'endpoint.name',
      key: 'endpoint',
    },
    {
      title: 'Status',
      dataIndex: 'response.status',
      key: 'status',
    },
    {
      title: 'Response',
      dataIndex: 'response.text',
      key: 'text',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      render: (level, record) => (
        <Tag color={record.color} icon={record.icon}>
          {level}
        </Tag>
      ),
    },
  ];

  return (
    <div className="log-table-container">
      <Table dataSource={coloredLogs} columns={columns} rowKey="_id" />
    </div>
  );
};

export default LogTable;

