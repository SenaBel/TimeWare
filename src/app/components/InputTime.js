import React from 'react'

const InputTime = ({type, label, value, onChange, error}) => {
    return(

    <div className="Input-Simples flex vertical">
       
        {label && (<label>{label}</label>)}
        <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        className={`${error ? "input-error" : ""}`}
        />
        {error && (<small  className="small-danger">{error}</small> )}
    </div>
    )
}

export default InputTime;