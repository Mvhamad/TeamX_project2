import React, { useState } from "react";
import config from "../../../config.json";
import "./addProduct.css";
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

const AddProduct = () => {
    const [product, setProduct] = useState({
        image: null,
        name: "",
        quantity: "",
        price: "",
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { name, price, quantity, image } = product;

    const onInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("quantity", product.quantity);
      formData.append("price", product.price);
      formData.append("image", product.image);
      await axios.post(`${config.apiUrl}/newProduct`, formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });
      setModalIsOpen(false);
      window.location.reload();
  };
  
    const handleFileChange = (e) => {
      setProduct({ ...product, image: e.target.files[0] });
  };

    return (
        <div>
            <button className="button-81" onClick={() => setModalIsOpen(true)}>
                Nouveau Produit
            </button>
            <Modal
                appElement={document.getElementById("root") || undefined}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={modalStyles}
                contentLabel="Add User Modal"
            >
                <h2>Ajouter un nouveau produit</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="name">Nom du produit</label>
                        </div>
                        <div className="col-75">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                placeholder=" Type product name here.."
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="quantity">Quantité</label>
                        </div>
                        <div className="col-75">
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={quantity}
                                placeholder=" Type the quantity here.."
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="price">Prix</label>
                        </div>
                        <div className="col-75">
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={price}
                                placeholder="Type price here.."
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="image">Image produit</label>
                        </div>
                        <div className="col-75">
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleFileChange}
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

export default AddProduct;