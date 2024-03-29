import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../config.json";
import "./product.css";
import AddProduct from "../AddProduct/AddProduct";
import EditProduct from "../EditProduct/EditProduct";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [activeModal, setActiveModal] = useState(false);
    const [productInfo, setProductInfo] = useState();
    const navigate = useNavigate()

    // récupération de tous les utilisateurs
    const fetchData = async () => {
        const res = await axios.get(`${config.apiUrl}/products`);
        setProducts(res.data.data);
    };
    useEffect(() => {
        fetchData();
    }, []);
    console.log(products)
    // for searching an user
    const searchRes = (data) => {
        return data.filter((product) =>
            product.name.toLowerCase().match(search.toLowerCase())
        );
    };
    // function to delete an user
    const deleteProductData = async (id) => {
        axios.delete(`${config.apiUrl}/deleteProduct/${id}`);
        window.location.reload()
        // fetchData()
    };

    const startEdit = (product) => {
        setProductInfo(product)
        setActiveModal(!activeModal);
    }

    return (
        <div>
            <div className="AllProducts">
                <div>
                    <div className="containerp">
                        <div className="headp">
                            <div className="button">
                                <button class="button-57" role="button" onClick={() => navigate('/')}><span class="text">Retour</span><span>Accueil</span></button>
                            </div>
                            <div className="searchp">
                                <input
                                    type="text"
                                    placeholder="Search....."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* {Products.length > 0 ? ( */}
                            <div className="Table">
                                <table>
                                    <caption><h2>Liste des Produits</h2></caption>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Désignation</th>
                                            <th scope="col">Quantité</th>
                                            <th scope="col">Prix</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchRes(products).map((product, index) => (
                                            <tr key={product._id}>
                                                <td data-label="#">{index + 1}</td>
                                                <td data-label="image">
                                                    <img src={`http://localhost:8001/${product.image}`} alt={product.name} />
                                                </td>
                                                <td data-label="Désignation">{product.name}</td>
                                                <td data-label="Quantité">{product.quantity}</td>
                                                <td data-label="Quantité">{product.price} XOF</td>
                                                <td className="Actionsp" data-label="Actions">
                                                    <svg
                                                        onClick={() => startEdit(product)}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-pencil-square"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                                        />
                                                    </svg>{" "}
                                                    <svg
                                                        onClick={() => deleteProductData(product._id)}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-trash3"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                                    </svg>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {activeModal && (
                                    <EditProduct productInfo={productInfo} isActive={activeModal} />
                                )}
                            </div>
                        {/* ) : (
                            <div className="nada"><p> 0 produit.</p></div>
                        )} */}
                    </div>

                    <div className="add-button">
                        <AddProduct />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;