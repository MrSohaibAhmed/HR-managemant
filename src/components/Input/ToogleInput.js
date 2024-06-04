import { useState } from "react"


function ToogleInput({ labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType }) {

    const [value, setValue] = useState(defaultValue)

    const updateToogleValue = () => {
        setValue(!value)
        updateFormValue({ updateType, value: !value })
    }

    return (
        <div className={`form-control w-full  ${containerStyle}`}>
            <label className="label cursor-pointer flex justify-start">
                <span className={"label-text text-base-content  pr-4 " + labelStyle}>{labelTitle}</span>
                <span>  <input type="checkbox" className="toggle" checked={value} onChange={(e) => updateToogleValue()} /></span>
            </label>
        </div>
    )
}


export default ToogleInput
