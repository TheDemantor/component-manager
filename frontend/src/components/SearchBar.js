import React, { useState } from "react";
import {
  useGetComponentsQuery,
} from "../slices/componentApiSlice";

export default function SearchBar() {
  //  const [searchInput, setSearchInput] = useState("");
  // const { data: allItems, isLoading: itemsLoading, error: itemsError } = useGetComponentsQuery({});
  //  const handleChange = (e) => {
  //     e.preventDefault();
  //     setSearchInput(e.target.value);
  //  };
  //  function searchList() {
      
  //     // filter countries according to search values
  //     let filteredItems =[];
  //     filteredItems = searchInput!==""&& allItems.filter((item) => {
  //        return item.component_name.match(searchInput.toLowerCase());
  //     });
      
  //     // create table rows
  //     let filtered = []
  //     filtered = filteredItems.map((item) => (
  //       <li class="list-group-item">{item.component_name}</li>

  //     ));
  //     return <div> {filtered} </div>;
  //  }
  //  return (
  //     <div>
  //        <input
  //           Type="search"
  //           placeholder="Search here"
  //           onChange={handleChange}
  //           value={searchInput}
  //        />
  //        <ul class="list-group">

  //           {!itemsLoading&&searchList()}
  //        </ul>
         
  //     </div>
  //  );
}