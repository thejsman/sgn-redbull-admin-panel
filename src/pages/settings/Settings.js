import React, { useEffect, useState } from 'react';

import Breadcrumb from '../../components/common/Breadcrumb';
import { getProfitPercentService, updateProfitPercentService } from '../../services/ApiServices';


const Settings = () => {
    const [percent , setPercent] = useState('');
    const [profitId , setProfitId] = useState('');

    const breadcrumb = [
        {link: '', linkText: 'Settings'}
    ];



    const getProfitPercent = () => {
        getProfitPercentService().then(res => {
            if(res.data.statusCode){
                setPercent(res.data.responseData.result.profitPercent);
                setProfitId(res.data.responseData.result._id);
            }
        })  
    }

    useState(() => {
        getProfitPercent();
    }, [])


    const handleSubmit = () => {
        let params = {
            profitId,
            percent
        }

        updateProfitPercentService(params).then(res => {
            if(res.data.statusCode){
                getProfitPercent(); 
            }
        })
    }



    return (
        <div className="page_wrapper">

            <Breadcrumb breadcrumb={breadcrumb} />
            <div className="twocol sb page_header">
                <h2>Service Fee</h2>
            </div>

                <div className='row'>
                    <div className='col-md-12'>
                    <label>Service Fee ( in % )</label>
                    </div>
                    <div className='col-md-2'>
                        <div className='form-group'>
                            <input
                                type="text"
                                value={percent}
                                onChange={e => setPercent(e.target.value)}
                                className="form-control" />
                        </div>
                    </div>
                    <div className='col-md-3'>
               

                        <span className='btn btn-primary' onClick={handleSubmit}>Save</span>
                    </div>
                </div>

    
        </div>
    )
}

export default Settings
