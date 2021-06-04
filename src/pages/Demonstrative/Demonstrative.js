import React, {useState, useContext, useEffect} from 'react'
import { Redirect } from "react-router-dom"

import Header from '../../components/Header/Header'

import { ContextAPI } from "../../ContextAPI/ContextAPI"

import styles from "./Demonstrative.module.css"

const Demonstrative = () => {
  const storage = useContext(ContextAPI)
  const data = storage.financeData
  
  const [expenses, setExpenses] = useState("")
  const [category, setCategory] = useState("")
  const [newData, setNewData] = useState(null)
  const [total, setTotal] = useState(null)

  const [initial, setInitial] = useState(false)

  useEffect(() => {
    const newDate = data !== null && data.filter((items) => {
      return items.type === expenses
    })

    setNewData(newDate)

    const sum = newDate !== null && newDate !== false && newDate.map((items) => {
      return items.type === expenses && Number(items.value)
    }).reduce((a,b) => a + b, 0)

    setTotal(sum)
  }, [expenses])

  useEffect(() => {
    const newDate = data !== null && data.filter((items) => {
      return items.category === category
    })

    setNewData(newDate)

    const sum = newDate !== null && newDate !== false && newDate.map((items) => {
      return items.category === category && Number(items.value)
    }).reduce((a,b) => a + b, 0)

    setTotal(sum)
  }, [category])

  return (
    <>
      <Header />

      <main className={styles.container}>
        <section>
          <button className={styles.voltar} onClick={() => setInitial(true)}>Voltar</button>

          {initial === true  && <Redirect to="/" />}

          <div>
            <select
                id="tipo"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
              >
                <option value="" disabled>Selecione</option>
                <option value="entrada">Entrada</option>
                <option value="saida">Saida</option>
            </select>

          
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
          </div>

          {total > 0 && 
            <div className={styles.saldo}>
              <h1>Total</h1>
              <span>R$ {total}</span> 
            </div>
          }
      </section>

      <section>
        {newData !== null && newData !== false &&
          <table className = {styles.table}>
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
              {newData !== null && newData !== false && newData.map((items) => (
                <tr key={items.id}>
                <td>{items.title}</td>
                <td>{items.type}</td>
                <td>{items.category}</td>
                {items.type === 'saida' ? 
                  <td style={{color: 'red'}}>{items.value}</td> :
                  <td>{items.value}</td>
                }
                <td>{items.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </section>
    </main>
  </>
  )
}

export default Demonstrative
