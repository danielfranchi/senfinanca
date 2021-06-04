import React, {useState, useContext, useEffect} from 'react'
import Header from '../../components/Header/Header'
import { ContextAPI } from "../../ContextAPI/ContextAPI"

import { Redirect } from "react-router-dom";

import styles from "./Demonstrative.module.css"

const Demonstrative = () => {
  const storage = useContext(ContextAPI)
  const date = storage.financeData
  
  const [despesas, setDespesas] = useState("")
  const [categoria, setCategoria] = useState("")
  const [aa, setAa] = useState(null)
  const [total, setTotal] = useState(null)

  const [Voltar, setVoltar] = useState(false)

  useEffect(() => {
    const newDate = date !== null && date.filter((items) => {
      return items.tipo === despesas
    })
    setAa(newDate)

    const soma = newDate !== null && newDate !== false && newDate.map((items) => {
      return items.tipo === despesas && Number(items.valor)
    }).reduce((a,b) => a + b, 0)

    setTotal(soma)

  }, [despesas])

  useEffect(() => {
    const newDate = date !== null && date.filter((items) => {
      return items.categoria === categoria
    })

    setAa(newDate)

    const soma = newDate !== null && newDate !== false && newDate.map((items) => {
      return items.categoria === categoria && Number(items.valor)
    }).reduce((a,b) => a + b, 0)

    setTotal(soma)
  }, [categoria])

  return (
    <>
    <Header />
    <main className={styles.container}>
      <section>
        <button className={styles.voltar} onClick={() => setVoltar(true)}>Voltar</button>

        {
        Voltar === true  && <Redirect to="/" />
        }
        <div>
        <select
            id="tipo"
            value={despesas}
            onChange={(e) => setDespesas(e.target.value)}
          >
            <option value="" disabled>Selecione</option>
            <option value="entrada">Entrada</option>
            <option value="saida">Saida</option>
        </select>

        
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
        </div>
        {
         total > 0 && 
         <div className={styles.saldo}>
         <h1>Total</h1>
         <span>R$ {total}</span> 
         </div>
         }

         

      </section>

      <section>
        {
          aa !== null && aa !== false &&

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
            {aa !== null && aa !== false && aa.map((items) => (
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
