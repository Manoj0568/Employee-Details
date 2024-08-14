// src/components/HeroSection.js
import React, { useEffect, useState } from 'react';
import { FaSearch, FaSort } from 'react-icons/fa';

const HeroSection = (props) => {
    const {sampleData,setSampleData,fectchData, showModal,setShowModal,currentPage,setCurrentPage} = props
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10; 
  const totalItems = sampleData.length   
  
  useEffect(()=>{
     if(searchTerm==""){
        fectchData()
     }
  },[searchTerm])
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const searchHandler = ()=>{
    if(searchTerm=="" || searchTerm.length<3) return alert("Search can't be empty enter min 3 char")
    let searchData = sampleData.filter((item)=>item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    console.log(searchData)
    return setSampleData(()=>[...searchData])
  }
  const pages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="bg-dark-gray text-white flex items-center py-4 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 bg-light-gray text-white rounded-md border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={searchHandler}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md focus:outline-none"
          ><FaSearch/>&nbsp;
           Search
          </button>
          <button
            onClick={()=>setShowModal(!showModal)}
            className="flex items-center px-4 py-2 bg-green-400 hover:bg-green-400 text-white rounded-md focus:outline-none"
          >
           Create Record
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-white">Page {currentPage} of {pages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pages}
            className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
