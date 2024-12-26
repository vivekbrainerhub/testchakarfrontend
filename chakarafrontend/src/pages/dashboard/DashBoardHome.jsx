import React, { useEffect, useState } from "react";
import TableComponent from "../../component/TableComponent";
import { useSelector } from "react-redux";
import { allUserService } from "../../services/userServices";
import Pagination from "../../component/Pagination";
import _ from "lodash";
import BasicStatistics from "./DashboardStats";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
const config = {
  showView: true,
  showEdit: false,
  showDelete: true,
};

const DashBoardHome = () => {
  const [page, setPage] = useState(1);
  const [limit, setlimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const alluser = useSelector((store) => store.user.user);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  console.log(page, totalPages, alluser);
  const fetchAllUser = async () => {
    const response = await allUserService(limit, page);
    setTotalPages(response?.totalPages);
  };
  const [statistics, setStatistics] = useState([
    { title: "Users", stat: alluser.length, icon: "BsPerson", iconSize: "3em" },
    { title: "Servers", stat: "1,000", icon: "FiServer", iconSize: "3em" },
    { title: "Datacenters", stat: "7", icon: "GoLocation", iconSize: "3em" },
    { title: "Datacenters", stat: "7", icon: "GoLocation", iconSize: "3em" },
  ]);

  useEffect(() => {
    fetchAllUser();
  }, [page, statistics]);
  const handleEdit = (id) => {
    console.log("Editing row with ID:", id);
    // Handle the edit functionality here
  };

  const handleView = (id) => {
    console.log("Viewing row with ID:", id);
    // Handle the view functionality here
  };

  const handleDelete = (id) => {
    console.log("Viewing row with ID:", id);
  };

  const iconMap = {
    BsPerson: BsPerson,
    FiServer: FiServer,
    GoLocation: GoLocation,
  };

  return (
    <>
      <BasicStatistics statistics={statistics} iconMap={iconMap} />
      <TableComponent
        data={alluser}
        config={config}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleView={handleView}
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default DashBoardHome;
