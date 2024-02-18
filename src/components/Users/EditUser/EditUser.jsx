import React, { useState } from "react";
import config from "../../../config.json";
import axios from "axios";
import Modal from "react-modal";
import "./editUser.css";

// Configurez le style du modal
const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    borderRadius: "5px",
    padding: "20px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
    maxWidth: "450px",
    width: "100%",
  },
};

const EditUser = ({isActive, userInfo}) => {
  const [user, setUser] = useState(userInfo);
  const [modalIsOpen, setModalIsOpen] = useState(isActive);
  const { firstname, lastname, address } = user;

  // useEffect(() => {
  //   console.log(userInfo);
  // }, []);

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${config.apiUrl}/updateUser/${userInfo._id}`, user);
    window.location.reload();
  };

  return (
    <div>
      <Modal
        appElement={document.getElementById('root') || undefined}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyles}
      >
        <h2>Modifier utilisateur</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-25" style={{color: 'black'}}>
              <label htmlFor="firstname">Prénom</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={firstname}
                placeholder=" Type Your first name here.."
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25" style={{color: 'black'}}>
              <label htmlFor="lastname">Nom</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={lastname}
                placeholder=" Type Your last name here.."
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="address">Adresse</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                placeholder="Type your address here.."
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div className="row">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditUser;