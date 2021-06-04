import React, { createContext, useState, useEffect } from 'react'
import { api } from '../services/api'

export const ContextAPI = createContext()

export const Storage = ({children}) => {

  const [financeData, setFinanceData] = useState(null)
  const [addTransaction, setAddTransaction] = useState(null)
  const [update, setUpdate] = useState(null)

  useEffect(() => {
    api.get('finances')
    .then((response) => setFinanceData(response.data))
  }, [setFinanceData])

  useEffect(() => {
    if(addTransaction !== null) {
      api.post('finances', addTransaction)
      .then(response => setFinanceData([...financeData, response.data])
    )} 
  }, [addTransaction])
  
  const deleteTransaction = (id) => {
    api.delete(`finances/${id}`).then((resposta) => {
      if (resposta.status === 200 || resposta.status === 201) {
        const newFinanceData = [...financeData].filter((item) => {
          return item.id !== id
        })

        setFinanceData(newFinanceData)
      }
    }) 
  } 
  
  return (
    <ContextAPI.Provider value={
        { financeData, setFinanceData, 
          addTransaction, setAddTransaction,
          deleteTransaction, 
          update, setUpdate
        }}>

      {children}
    </ContextAPI.Provider>
  )
}
