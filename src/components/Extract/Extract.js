import React, {useContext, useState, useEffect} from 'react'
import { ContextAPI } from "../../ContextAPI/ContextAPI"

import styles from "./Extract.module.css"

const Extract = () => {
  const storage = useContext(ContextAPI)
  const data = storage.financeData

  const [entrance, setEntrance] = useState(null)
  const [exit, setExit] = useState(null)

  const value = entrance - exit

  useEffect(() => {
    const sum = data !== null && data.map((items) => {
      return items.type === "entrada" && Number(items.value)
    }).reduce((a,b) => a + b, 0)

    setEntrance(sum)
  }, [data])

  useEffect(() => {
    const subration = data !== null && data.map((items) => {
      return items.type === "saida" && Number(items.value)
    }).reduce((a,b) => a + b, 0)

    setExit(subration)    
  }, [data])

  return (
    <section className={styles.container}>
      <h1>Saldo</h1>
      <span>R$ {value}</span>

      <h1>Entrada</h1>
      <span>R$ {entrance}</span>

      <h1>Despesas</h1>
      <span style={{color: 'red'}}>R$ {exit}</span>
    </section>
  )
}

export default Extract
