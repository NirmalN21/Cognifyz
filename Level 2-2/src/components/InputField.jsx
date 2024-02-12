import React from 'react'

const InputField = (props) => {
    return (
        <>
            <div className="form-group">
                <label htmlFor={props.htmlFor}><i className={props.className}></i></label>
                <input type={props.type} name={props.name} id={props.id} autocomplete="off"
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder} 
                    onClick={props.onType}
                    />
            </div>
        </>
    )
}

export default InputField
