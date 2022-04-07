import React, { useEffect, useReducer, useState } from 'react'
import { resHandle } from '../../components/util/utils'

const Dashboard = () => {
  const [state, setstate] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      noOfTemplate: ''
    }
  )

  // useEffect(() => {
  //     handleGetDashboard()
  // }, [])

  // useEffect(() => {
  //     handleGetWalletList();
  // },[])

  let { noOfTemplate } = state
  return (
    <div className='page_wrapper'>
      <div className='row mt-4 dash_sm_card'>
        <div className='col-md-3'>
          <div className='cm_card bg-primary'>
            <h5>Total No. of Template</h5>
            <h3 className='mb-1'>{noOfTemplate}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
