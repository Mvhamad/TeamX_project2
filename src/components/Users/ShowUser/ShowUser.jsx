import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShowUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  const fetchData = async () => {
    const result = await axios.get(`http://localhost:5000/api/show-user/${id}`);
    setUser(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1> {user.firstname} </h1>
    </>
  );
};
export default ShowUser;