import React, {useContext, useState, useEffect} from 'react'

import { ContextAPI } from "../../ContextAPI/ContextAPI"

import styles from "./Extract.module.css"

const Extract = () => {
  const [entrada, setEntrada] = useState(null)
  const [saida, setSaida] = useState(null)

  const valor = entrada - saida

  const storage = useContext(ContextAPI)
  const data = storage.financeData

  useEffect(() => {
    const soma = data !== null && data.map((items) => {
      return items.tipo === "entrada" && Number(items.valor)
    }).reduce((a,b) => a + b, 0)

    setEntrada(soma)
  
  }, [data])

  useEffect(() => {
    const subtracao = data !== null && data.map((items) => {
      return items.tipo === "saida" && Number(items.valor)
    }).reduce((a,b) => a + b, 0)

    setSaida(subtracao)    
  }, [data])
    
  
  return (
    <section className={styles.container}>
      <h1>Saldo</h1>
      <span>R$ {valor}</span>

      <h1>Entrada</h1>
      <span>R$ {entrada}</span>

      <h1>Saida</h1>
      <span style={{color: 'red'}}>R$ {saida}</span>
    </section>
  )
}

export default Extract
