import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../common/headerSlice";
import TitleCard from "../../components/Cards/TitleCard";
import { RECENT_TRANSACTIONS } from "../../utils/dummyData";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SearchBar from "../../components/Input/SearchBar";
import { getAllEmployeeCalculatedSalary } from "../../hooks/useSalary";
import { paysalary } from "../../hooks/useSalary";
// const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
const TopSideButtons = ({ applySearch }) => {
  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");
  const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"];

  const showFiltersAndApply = (params) => {
    // applyFilter(params);
    setFilterParam(params);
  };

  const removeAppliedFilter = () => {
    // removeFilter();
    setFilterParam("");
    setSearchText("");
  };

  useEffect(() => {
    if (searchText == "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  return (
    <div className="inline-block float-right">
      <SearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
      {/**   {filterParam != "" && (
        <button
          onClick={() => removeAppliedFilter()}
          className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
        >
          {filterParam}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      )}
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-sm btn-outline">
          <FunnelIcon className="w-5 mr-2" />
          Filter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52"
        >
          {locationFilters.map((l, k) => {
            return (
              <li key={k}>
                <a onClick={() => showFiltersAndApply(l)}>{l}</a>
              </li>
            );
          })}
          <div className="divider mt-0 mb-0"></div>
          <li>
            <a onClick={() => removeAppliedFilter()}>Remove Filter</a>
          </li>
        </ul>
      </div>
      */}
    </div>
  );
};

function Transactions() {
  const dispatch = useDispatch();
  const [todayDate, setTodayDate] = useState();
  const [transactions, setTransactions] = useState([]);
  const [trans, setTrans] = useState(transactions);

  const removeFilter = () => {
    setTrans(transactions);
  };

  const applyFilter = (params) => {
    let filteredTransactions = transactions.filter((t) => {
      return t.location == params;
    });
    setTrans(filteredTransactions);
  };

  // Search according to name
  const applySearch = (value) => {
    let filteredTransactions = transactions.filter((t) => {
      return (
        t.email.toLowerCase().includes(value.toLowerCase()) ||
        t.email.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTrans(filteredTransactions);
  };
  useEffect(() => {
    const today = new Date();

    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const formattedToday = yyyy + "-" + mm + "-" + dd;
    setTodayDate(formattedToday);
  }, []);
  const fetchData = async () => {
    const res = await getAllEmployeeCalculatedSalary();
    setTransactions(res);
  }
  useEffect(() => {

    fetchData();
  }, [])
  const paySalary = async (item) => {
    const currentDate = new Date(Date.now());
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const salaryData = {
      userId: item.userId,
      salary: item.salary,
      date: formattedDate

    }
    const response = await paysalary(salaryData);
    console.log(response);
    fetchData();
    dispatch(showNotification({ message: "Salary Paid", status: 1 }));

  }
  return (
    <>
      <input className=" p-2 rounded-lg" type="date" value={todayDate} />

      <TitleCard
        title="Salary"
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
            applySearch={applySearch}
          />
        }
      >
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email Id</th>
                <th>Total Salary</th>
                <th>Deduction</th>
                <th>Remaining Salary</th>
                <th>Transaction Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <img src={l.avatar} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{l.employeeName}</div>
                        </div>
                      </div>
                    </td>
                    <td>{l.employeeEmail}</td>
                    <td>{l.salary || 'N/A'}</td>
                    <td>{l.totalDeduction || 'N/A'}</td>
                    <td>{l.remainingSalary || 'N/A'}</td>
                    <td>{moment(l.date).format("D MMM")}</td>
                    {
                      l.salleryStatus.status == "unpaid" ? <td>
                        <button onClick={() => { paySalary(l) }} className=" bg-cyan-600  text-white p-1 rounded-lg cursor-pointer">Pay</button>
                      </td> : <td>
                        <span className=" bg-green-800  text-white p-1 rounded-lg">paid</span>
                      </td>
                    }

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Transactions;
