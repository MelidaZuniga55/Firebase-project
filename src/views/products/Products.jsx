import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../repositories/firebase/config";
import { useEffect, useState } from "react";

export const Products = () => {
  // Estado original para mostrar la lista de productos
  const [products, setProducts] = useState([]);

  // 🆕 Estado para controlar el formulario de nuevos productos
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });

  // Obtener productos de Firestore
  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsData = [];

    querySnapshot.forEach((doc) => {
      productsData.push({ id: doc.id, ...doc.data() });
    });

    setProducts(productsData);
  };

  // Agregar un producto a Firestore
  const addProduct = async (product) => {
    const docRef = await addDoc(collection(db, "products"), {
      name: product.name,
      price: product.price,
      stock: product.stock
    });
    console.log("Document written with ID: ", docRef.id);

    getProducts(); // 🆕 Recargar la lista después de agregar un producto
  };

  // Ejecutar getProducts cuando cargue el componente
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Products</h2>

      {/* 🆕 Formulario para agregar un producto */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          className="form-control mb-2"
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            if (newProduct.name && newProduct.price && newProduct.stock) {
              addProduct(newProduct); // 🆕 Llamamos a addProduct
              setNewProduct({ name: "", price: "", stock: "" }); // 🆕 Limpiar formulario
            }
          }}
        >
          Agregar Producto
        </button>
      </div>

      {/* 🆕 Lista de productos obtenidos desde Firestore */}
      <ul className="list-group">
        {products.map((p) => (
          <li key={p.id} className="list-group-item">
            {p.name} - ${p.price} - Stock: {p.stock}
          </li>
        ))}
      </ul>
    </div>
  );
};
