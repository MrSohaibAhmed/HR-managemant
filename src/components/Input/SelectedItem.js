import { color } from "chart.js/helpers";
import Select from "react-select";
import './selectItem.css'

const colourOptions = [
    { value: "Sohaib", label: "Sohaib" },
    { value: "Wajahat", label: "Wajahat" },
    { value: "Ehtisham", label: "Ehtisham" },
    { value: "Hamza", label: "Hamza" },
    { value: "Bilal", label: "Bilal" },
    { value: "Wasif", label: "Wasif" },
    { value: "Fida", label: "Fida" },

];

export default function MultiSelect() {
    return (
        <div className="container  ">
            <p>Members</p>
            <Select
                defaultValue={[colourOptions[1], colourOptions[4]]}
                isMulti
                name="colors"
                options={colourOptions}
                className="w-full h-7 mt-3 selectClass"
                classNamePrefix="select"
                styles={{ color: "red" }}
            />
        </div>
    );
}