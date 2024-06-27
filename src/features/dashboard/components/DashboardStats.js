import { useNavigate } from "react-router-dom"
function DashboardStats({ title, icon, value, description, colorIndex, data }) {

    const navi = useNavigate();
    const COLORS = ["primary", "primary"]

    const getDescStyle = () => {
        if (description.includes("↗︎")) return "font-bold text-green-700 dark:text-green-300"
        else if (description.includes("↙")) return "font-bold text-rose-500 dark:text-red-400"
        else return ""
    }
    const navigate = () => {
        navi("/app/employees")
    }

    return (
        <div className="stats shadow" onClick={navigate} style={{ cursor: "pointer" }}>
            <div className="stat">
                <div className={`stat-figure dark:text-slate-300 text-${COLORS[colorIndex % 2]}`}>{icon}</div>
                <div className="stat-title dark:text-slate-300">{title}</div>
                <div className={`stat-value dark:text-slate-300 text-${COLORS[colorIndex % 2]}`}>{data}</div>
                <div className={"stat-desc  " + getDescStyle()}>{description}</div>
            </div>
        </div>
    )
}

export default DashboardStats