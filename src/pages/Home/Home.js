import React, { useState, useContext} from 'react'
import { Redirect } from "react-router-dom";

import Extract from '../../components/Extract/Extract'

import { ContextAPI } from "../../ContextAPI/ContextAPI"
import { api } from '../../services/api'

import { MdDelete } from "react-icons/md"
import { FiEdit3 } from "react-icons/fi"

import styles from "./Home.module.css"

const Home = () => {
  const storage = useContext(ContextAPI)
  const date = storage.financeData

  const [titulo, setTitulo] = useState('')
  const [valor, setValor] = useState('')
  const [tipo, setTipo] = useState('')
  const [categoria, setCategoria] = useState('')

  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const red = 'red'

  const submit = (e) => {
    e.preventDefault()

    const dateAtualy = () => {
      const data = new Date()
    
      const day = String(data.getDate()).padStart(2,'0')
      const month = String(data.getMonth() + 1).padStart(2,'0')
      const year = String(data.getFullYear());

      const ano = (year % 100).toString().padStart(2, 0)
    
      return `${day}-${month}-${ano}`

      
    }

    const requsicao = {
      titulo: titulo,
      valor: valor,
      tipo: tipo,
      categoria: categoria,
      data: dateAtualy()
    };

    if(requsicao.titulo === '' || requsicao.valor === '' || requsicao.tipo === '' || requsicao.categoria === '') {
      return
    } else {
      storage.setAddTransaction(requsicao)
    }
    clear()
  };

  const clear = () => {
    setTitulo('')
    setValor('')
    setTipo(false)
    setCategoria('')
  }

  const formEdit = (id) => {
    setEdit(true)
    setId(id)

    const search = storage.financeData.filter((items) => {
      return items.id === id
    })

    console.log("search", search)
    setTitulo(search[0].titulo)
    setValor(search[0].valor)
    setTipo(search[0].tipo)
    setCategoria(search[0].categoria)
  }

  const update = (e) => {
    e.preventDefault()

    const requsicao = {
      titulo: titulo,
      valor: valor,
      tipo: tipo,
      categoria: categoria
    };

    api.patch(`finances/${id}`, requsicao).then((resposta) => {
      if (resposta.status === 200) {

        const data = date.filter((items) => {
          return items.id !== resposta.data.id
        })
        const array = [...data, resposta.data]
        storage.setFinanceData(array)
      }
    })
      
    clear()
    setEdit(false)
  }

  return (
    <div className={styles.home}>
    <section>
      <form className={styles.form}>

        <input 
          type="text" 
          id="titulo" 
          value={titulo} 
          onChange={(e) => setTitulo(e.target.value)} 
          placeholder="Descrição"
          required 
        />

        <input 
          type="text" 
          id="valor"
          value={valor} 
          onChange={(e) => setValor(e.target.value)} 
          placeholder= "R$"
          required 
        />

        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="" disabled>Selecione</option>
          <option value="contas">Contas</option>
          <option value="laser">Laser</option>
          <option value="mercado">Mercado</option>
          <option value="pagamento">Pagamento</option>
          <option value="roupas">Roupas</option>
        </select>

        <label>
          <input
            type="radio"
            checked={tipo === "entrada"}
            value={"entrada"}
            style={{ width: "10px" }}
            onChange={(e) => setTipo(e.target.value)}
          />
          Entrada
        </label>

        <label>
          <input
            type="radio"
            checked={tipo === "saida"}
            value="saida"
            style={{ width: "10px" }}
            onChange={(e) => setTipo(e.target.value)}
          />
          Saida
        </label>

        {
          edit === true ?
          <button onClick={update}>Atualizar</button> :
          <button onClick={submit}>Cadastrar</button>
        }
      </form>
    </section>

<section>
  <div>

    {/* <h2 style={{ color: "royalblue" }}>Transações</h2> */}
    
    <table className={styles.table}>
      <thead>
        <tr>
          <th><strong className="my-teams-button">Titulo</strong></th>
          <th><strong className="my-teams-button">Tipo</strong></th>
          <th><strong className="my-teams-button">Categoria</strong></th>
          <th><strong className="my-teams-button">Valor</strong></th>
          <th><strong className="my-teams-button">Data</strong></th>
        </tr>
      </thead>
      <tbody>
        {date !== null && date.map((items) => (
          <tr key={items.id}>
            <td>{items.titulo}</td>
            <td>{items.tipo}</td>
            <td>{items.categoria}</td>
            {
              items.tipo === 'saida' ?
              <td style={{color: 'red'}}>{items.valor}</td> :
              <td>{items.valor}</td>
            }
            <td>{items.data}</td>
            <td><button onClick={() => storage.deleteTransaction(items.id)}><MdDelete /></button></td>
            <td><button onClick={() => formEdit(items.id)}><FiEdit3 /></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

<div>
  <Extract />
</div>

<div>
  <button className={styles.demonstrative} onClick={() => setRedirect(true)}>Demonstrativo</button>
  {
    redirect === true  && <Redirect to="demonstrative" />
  }
</div>


</div>
  )
}

export default Home
