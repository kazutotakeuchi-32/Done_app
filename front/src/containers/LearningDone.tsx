import { Container } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetNextTasks } from '../reducks/draft_learns/operations'
import { ModalForm } from '../templates/modalForm'
import DenseTable from '../templates/Table'

export const LearningDone = () => {
  const dispatch = useDispatch()
  const useDraftLearns = (state) => state.draftLearns
  const { nextTasks } = useSelector(useDraftLearns)
  useEffect(() => {
    dispatch(fetchGetNextTasks())
  }, [])

  // const handleSubmid = ({})=>{
  //   ""
  // }
  return (
    <div className="">
      <Container component="main" maxWidth="md">
        <DenseTable draftNextTasks={nextTasks} />
        <ModalForm />
      </Container>
    </div>
  )
}
