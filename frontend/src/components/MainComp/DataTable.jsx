import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash } from 'react-icons/fa';
import UpdateModal from './UpdateModal';


const DataTable = (props) => {
    const {sampleData,currentPage,paginationFunction,setSampleData, fectchData } = props
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showUpdate,setShowUpdate] = useState(false)
  const [updateItem,setUpdateItem] = useState({})
  const handleSort = (column) => {
    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(direction);
  };

  const PaginatedArray = paginationFunction(sampleData,currentPage)
  const sortedData = [...PaginatedArray].sort((a, b) => {
    console.log(sampleData)
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleEdit = (id) => {
    let itemtoUpdate = sortedData.find(item=>item._id == id)
    setUpdateItem(itemtoUpdate)
    setShowUpdate(!showUpdate)
  };

  const handleDelete = async (id) => {
    if(!id){
        alert("Item can't delete internal issues")
    }else{
        await axios.delete(`/api/employee/${id}`,{withCredentials:true}).then(()=>{

            let result = sampleData.filter((item)=>item._id != id)
            setSampleData([...result])
            alert("successfully deleted")

        }).catch(()=>{
            alert("Item can't be deleted try again")
        })
    }
  };

  const formatDate =(dateString)=> {
    const date = new Date(dateString)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    hours = hours % 12 || 12;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const period = isPM ? 'PM' : 'AM';

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    const formattedDate = `${formattedDay}-${formattedMonth}-${year} ${formattedHours}:${formattedMinutes} ${period}`;

    return formattedDate;
}


  return (
    <>
    <div className="bg-slight-gray text-black p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-light-gray">
          <thead className="bg-slate-400">
            <tr>
              <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('id')}>
                ID
                {sortColumn === 'id' && (sortDirection === 'asc' ? <FaSortUp className="inline ml-2" /> : <FaSortDown className="inline ml-2" />)}
              </th>
              <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('name')}>
                Name
                {sortColumn === 'name' && (sortDirection === 'asc' ? <FaSortUp className="inline ml-2" /> : <FaSortDown className="inline ml-2" />)}
              </th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('email')}>
                Email
                {sortColumn === 'email' && (sortDirection === 'asc' ? <FaSortUp className="inline ml-2" /> : <FaSortDown className="inline ml-2" />)}
              </th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">Designation</th>
              <th className="px-4 py-2 text-left">Gender</th>
              <th className="px-4 py-2 text-left">Course</th>
              <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('date')}>
                Date
                {sortColumn === 'date' && (sortDirection === 'asc' ? <FaSortUp className="inline ml-2" /> : <FaSortDown className="inline ml-2" />)}
              </th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-light-gray text-black">
            {sortedData.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2">{item._id}</td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">
                  <img src={`http://localhost:5000/${item.image}`} alt={item.name} className="w-12 h-12 rounded-full" />
                </td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">{item.mobile}</td>
                <td className="px-4 py-2">{item.designation}</td>
                <td className="px-4 py-2">{item.gender}</td>
                <td className="px-4 py-2">{item.course}</td>
                <td className="px-4 py-2">{formatDate(item.createdAt)}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="text-primary hover:text-primary-dark focus:outline-none"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <UpdateModal setSampleData={setSampleData} sampleData={sampleData} updateItem={updateItem} setUpdateItem={setUpdateItem} showUpdate={showUpdate} setShowUpdate={setShowUpdate} fectchData={fectchData}/>
    </>
  );
};

export default DataTable;
