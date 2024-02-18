import React, { useState } from "react";
import config from "../../../config.json";
import "./addUser.css";
import axios from "axios";
import Modal from "react-modal";

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

const AddUser = () => {
    const [user, setUser] = useState({
        fistname: "",
        lastname: "",
        address: "",
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { firstname, lastname, address } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${config.apiUrl}/newUser`, user);
        setModalIsOpen(false);
        window.location.reload();
    };

    return (
        <div>
            <button className="button-81" onClick={() => setModalIsOpen(true)}>
                Nouvel Utilisateur
            </button>
            <Modal
                appElement={document.getElementById("root") || undefined}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={modalStyles}
                contentLabel="Add User Modal"
            >
                <h2>Ajouter un utilisateur</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-25">
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
                        <div className="col-25">
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
                            <label htmlFor="adress">Adresse</label>
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

export default AddUser;