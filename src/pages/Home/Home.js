import React, { useState, useContext} from 'react'
import { Redirect } from "react-router-dom"

import { ContextAPI } from "../../ContextAPI/ContextAPI"
import { api } from '../../services/api'

import Extract from '../../components/Extract/Extract'

import { MdDelete } from "react-icons/md"
import { FiEdit3 } from "react-icons/fi"
import styles from "./Home.module.css"

const Home = () => {
  const storage = useContext(ContextAPI)
  const date = storage.financeData

  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const submit = (e) => {
    e.preventDefault()

    const dateAtualy = () => {
      const data = new Date()
    
      const day = String(data.getDate()).padStart(2,'0')
      const month = String(data.getMonth() + 1).padStart(2,'0')
      const year = String(data.getFullYear());
      const newYear = (year % 100).toString().padStart(2, 0)
    
      return `${day}-${month}-${newYear}`
    }

    const requsicao = {
      title: title,
      value: value,
      type: type,
      category: category,
      date: dateAtualy()
    }

    if(requsicao.title === '' || requsicao.value === '' || requsicao.type === '' || requsicao.category === '') {
      return
    } else {
      storage.setAddTransaction(requsicao)
    }
    clear()
  }

  const clear = () => {
    setTitle('')
    setValue('')
    setType(false)
    setCategory('')
  }

  const formEdit = (id) => {
    setEdit(true)
    setId(id)

    const search = storage.financeData.filter((items) => {
      return items.id === id
    })

    setTitle(search[0].title)
    setValue(search[0].value)
    setType(search[0].type)
    setCategory(search[0].category)
  }

  const update = (e) => {
    e.preventDefault()

    const requsicao = {
      title: title,
      value: value,
      type: type,
      category: category
    }

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
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Descrição"
          required 
          />

          <input 
            type="text" 
            id="valor"
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            placeholder= "R$"
            required 
          />

          <select
            id="categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>Selecione</option>
            <option value="alimentação">Alimentação</option>
            <option value="casa">Casa</option>
            <option value="despesas">Despesas</option>
            <option value="impostos">Impostos</option>
            <option value="laser">Laser</option>
            <option value="saúde">Saúde</option>
            <option value="trabalho">Trabalho</option>
          </select>

          <label>
            <input
              type="radio"
              checked={type === "entrada"}
              value={"entrada"}
              style={{ width: "10px" }}
              onChange={(e) => setType(e.target.value)}
            />
            Entrada
          </label>

          <label>
            <input
              type="radio"
              checked={type === "saida"}
              value="saida"
              style={{ width: "10px" }}
              onChange={(e) => setType(e.target.value)}
            />
            Saida
          </label>

          {edit === true ?
            <button onClick={update}>Atualizar</button> :
            <button onClick={submit}>Cadastrar</button>
          }
        </form>

        <Extract />
      </section>
      
      <section>
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
                <td>{items.title}</td>
                <td>{items.type}</td>
                <td>{items.category}</td>
                {
                  items.type === 'saida' ?
                  <td style={{color: 'red'}}>{items.value}</td> :
                  <td>{items.value}</td>
                }
                <td>{items.date}</td>
                <td><button onClick={() => storage.deleteTransaction(items.id)}><MdDelete /></button></td>
                <td><button onClick={() => formEdit(items.id)}><FiEdit3 /></button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className={styles.demonstrative} onClick={() => setRedirect(true)}>Demonstrativo</button>
        {redirect === true  && <Redirect to="demonstrative" />}
      </section>
    </div>
  )}

export default Home
