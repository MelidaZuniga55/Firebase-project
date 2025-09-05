import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../repositories/firebase/config";
import { useEffect, useState } from "react";
import '../../assets/css/styles.css';

export const Products = () => {
  //Utilizar este estado para mapear los productos
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //Obtener los productos de Firestore
  const getProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = [];
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsData);
    } catch (err) {
      console.error(err);
      setError("Error al cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  //Utilizar la funcion en un formulario
  const addProduct = async (product) => {
    try {
      await addDoc(collection(db, "products"), {
        name: product.name,
        price: Number(product.price),
        stock: Number(product.stock)
      });
      setNewProduct({ name: "", price: "", stock: "" });
      getProducts();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error al agregar el producto");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container mt-5">
      <div className="products-card">
        <h2 className="text-center mb-4" style={{ color: "#4B3F72", fontWeight: "600" }}>
          Gestión de Productos🛍️
        </h2>


        {error && <p className="text-danger text-center">{error}</p>}

        <div className="mb-3">
          <input
            type="text"
            placeholder="Nombre"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            placeholder="Precio"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="form-control"
            min="0"
            step="0.01"
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            className="form-control"
            min="0"
          />
        </div>

        <button
          className="btn"
          onClick={() => {
            if (!newProduct.name || newProduct.price === "" || newProduct.stock === "") {
              setError("Todos los campos son obligatorios");
              return;
            }
            if (Number(newProduct.price) < 0 || Number(newProduct.stock) < 0) {
              setError("Precio y stock deben ser números positivos");
              return;
            }
            addProduct(newProduct);
          }}
        >
          Agregar Producto
        </button>

        {/* Lista */}
        <h4 className="text-center mt-4 mb-3">Lista de Productos</h4>
        {loading ? (
          <p className="text-center">Cargando productos...</p>
        ) : (
          <ul className="list-group products-list">
            {products.map((p) => (
              <li key={p.id}>
                <div>
                  <strong>{p.name}</strong> <br />
                  <small>Precio: ${parseFloat(p.price).toFixed(2)} | Stock: {p.stock}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
