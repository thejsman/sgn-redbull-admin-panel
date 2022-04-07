import React, {useEffect, useReducer, useState} from 'react'


const Filter = (props) => {
    console.log(props, "prooooooooo")
    const [color, setColor] = useState(""); // will set color of filter
    const [startDate, setStartDate] = useState(''); //filter start date
    const [endDate, setEndDate] = useState(''); // filter end date

    const handleDateChange = (e) => {
        if (e.target.name === "startDate") {
            setStartDate(e.target.value);
        } else {
            setEndDate(e.target.value);
            setColor('');
        }
    }
    const handleFilter = () => {
        if (startDate > endDate)
            setColor("danger");
        if(startDate && endDate && startDate < endDate)
            props.onclick(startDate, endDate)

    }
    const clearFilter = () => {
        setStartDate('');
        setEndDate('');
        setColor('');
        props.onClear();
    }

    return (
        <div className="d-flex justify-content-end align-items-center">
            <div className="date-wrapper d-flex align-items-center mr-2">
                <input title="To" name="startDate" type='date' className="mr-1" value={startDate} onChange={e => handleDateChange(e)}/>
                <input title="From" name="endDate" disabled={startDate ? false : true} type='date' value={endDate}
                       className={`mr-1 text-${color}`}
                       onChange={e => handleDateChange(e)}/>
                <span className="icon"><i className={startDate ? "text-danger fa fa-times-circle" : " text-muted fa fa-times-circle"} onClick={() => clearFilter()}></i></span>
            </div>
            <button className="btn btn-primary btn-sm mr-2" onClick={() => handleFilter()}>Filter</button>
        </div>
    )
}

export default Filter
