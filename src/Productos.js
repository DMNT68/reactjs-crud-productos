import React, { useEffect, useState } from 'react';

export const Productos = () => {
  const [formulario, setFormulario] = useState({ nombre: 'Cafe', descripcion: 'Cafe tinto', precio: 1.5 });
  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(false);
  const [prodSelect, setProdSelect] = useState(0);

  const onChange = (e) =>
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });

  const onSubmite = () => {
    console.log(formulario);
    if (formulario) {
      postProducto();
    }
    setEditando(false);
  };

  const onEdit = () => {
    console.log(formulario);
    if (formulario) {
      putProducto();
    }
    setEditando(false);
  };

  const postProducto = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formulario),
    };
    fetch('http://localhost:8000/api/productos', requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((productos) => {
        console.log(productos);
        getProductos();
      });
  };

  const getProductos = () => {
    fetch('http://localhost:8000/api/productos')
      .then((response) => {
        return response.json();
      })
      .then((productos) => {
        console.log(productos);
        if (productos.ok) setProductos(productos.product);
      });
  };

  const putProducto = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formulario),
    };
    fetch(`http://localhost:8000/api/productos/${prodSelect}`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((productos) => {
        console.log(productos);
        getProductos();
        setProdSelect(0);
      });
  };
  const deleteProducto = (id) => {
    const requestOptions = {
      method: 'DELETE',
    };
    fetch(`http://localhost:8000/api/productos/${id}`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((productos) => {
        console.log(productos);
        getProductos();
      });
  };

  const editar = (data) => {
    setEditando(true);
    setFormulario(data);
    setProdSelect(data.id);
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div style={{ flexDirection: 'column' }}>
      <div style={{ marginTop: 10 }}>
        <label>NOMBRE</label>
        <input style={{ marginLeft: 50 }} name="nombre" value={formulario.nombre} onChange={onChange} placeholder="nombre producto" />
      </div>
      <div style={{ marginTop: 10 }}>
        <label>DESCRIPCION</label>
        <input style={{ marginLeft: 50 }} name="descripcion" value={formulario.descripcion} onChange={onChange} placeholder="DESCRIPCION" />
      </div>
      <div style={{ marginTop: 10 }}>
        <label>PRECIO</label>
        <input style={{ marginLeft: 50 }} name="precio" value={formulario.precio} onChange={onChange} placeholder="PRECIO" />
      </div>
      {editando ? (
        <button style={{ marginTop: 30 }} onClick={onEdit}>
          EDITAR
        </button>
      ) : (
        <button style={{ marginTop: 30 }} onClick={onSubmite}>
          REGISTRAR
        </button>
      )}

      <div style={{ marginTop: 40 }}>
        <table border="1">
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => {
              return (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.descripcion}</td>
                  <td>{p.precio}</td>
                  <td>
                    <button onClick={() => deleteProducto(p.id)}>eliminar</button>
                    <button onClick={() => editar(p)}>editar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
