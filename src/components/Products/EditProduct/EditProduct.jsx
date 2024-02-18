import React, { useState } from "react";
import config from "../../../config.json";
import axios from "axios";
import Modal from "react-modal";
import "./editProduct.css";

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

const EditProduct = ({isActive, productInfo}) => {
  const [product, setProduct] = useState(productInfo);
  const [modalIsOpen, setModalIsOpen] = useState(isActive);
  const { name, price, quantity, image } = product;

  const onInputChange = (e) => {
    if (e.target.name === "image") {
      // Si la cible est un champ de type fichier, mettez à jour le fichier image
      setProduct({ ...product, image: e.target.files[0] });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("quantity", product.quantity);
      formData.append("price", product.price);
      formData.append("image", product.image);

      await axios.put(
        `${config.apiUrl}/editProduct/${productInfo._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error editing product:", error);
    }
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
              <label htmlFor="nam">Nom produit</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder=" Type the product's name here.."
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25" style={{color: 'black'}}>
              <label htmlFor="quantity">Quantité</label>
            </div>
            <div className="col-75">
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                placeholder=" Type the quanty of the product here.."
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
                placeholder="Type your price here.."
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="file">Upload the image</label>
            </div>
            <div className="col-75">
              <input
                type="file"
                id="image"
                name="image"
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

export default EditProduct;