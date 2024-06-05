import { color } from "chart.js/helpers";
import Select from "react-select";
import './selectItem.css'



export default function MultiSelect({ options }) {
    return (
        <div className="container  ">
            <p>Members</p>
            <Select
                // defaultValue={[options[1], options[4]]}
                // defaultValue={}

                isMulti
                name="colors"
                options={options}
                className="w-full h-7 mt-3 selectClass"
                classNamePrefix="select"
              
                // styles={{ color: "red" }}
            />
        </div>
    );
}