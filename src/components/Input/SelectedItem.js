import { color } from "chart.js/helpers";
import Select from "react-select";
import './selectItem.css'



export default function MultiSelect({ options, value, updateFormValue }) {
    return (
        <div className="container">
            <p>Members</p>
            <Select
                isMulti
                name="teamMembers"
                options={options}
                value={value}
                onChange={selectedOptions => updateFormValue(selectedOptions.map(option => option.value))}
                className="w-full h-7 mt-3 selectClass"
                classNamePrefix="select"
            />
        </div>
    );
}