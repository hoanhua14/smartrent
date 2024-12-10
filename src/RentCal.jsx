import { useState } from "react";
import mockData from "./data";
import { useNavigate } from "react-router-dom";
export default function RentCal() {
  const [currElec, setCurrElec] = useState("");
  const [prevElec, setPrevElec] = useState("");
  const [elecBill, setElecBill] = useState(0);
  const [currWater, setCurrWater] = useState("");
  const [prevWater, setPrevWater] = useState("");
  const [waterBill, setWaterBill] = useState(0);
  const [rent, setRent] = useState("");
  const [garbage, setGarbage] = useState("");
  const [misc, setMisc] = useState("");
  const [total, setTotal] = useState(0);
  const [addr, setAddr] = useState("");
  const [unit, setUnit] = useState("");
  const [tenant, setTenant] = useState("");
  const [prevBalance, setPrevBalance] = useState("");
  const navigate = useNavigate();
  function handleAddrChange(e) {
    setAddr(e.target.value);
  }
  function handleUnitChange(e) {
    setUnit(e.target.value);
  }
  function handleTenantChange(e) {
    setTenant(e.target.value);
  }
  function handleCurrElecChange(e) {
    setCurrElec(e.target.value);
    calculateElecBill(prevElec, e.target.value);
  }
  function handlePrevElecChange(e) {
    setPrevElec(e.target.value);
    calculateElecBill(e.target.value, currElec);
  }
  const calculateElecBill = (prevElec, currElec) => {
    if (prevElec && currElec) {
      const bill = (currElec - prevElec) * 4000;
      setElecBill(bill);
    }
  };
  const handleCurrWaterChange = (e) => {
    setCurrWater(e.target.value);
    calculateWaterBill(prevWater, e.target.value);
  };
  const handlePrevWaterChange = (e) => {
    setPrevWater(e.target.value);
    calculateWaterBill(e.target.value, currWater);
  };
  const calculateWaterBill = (prevWater, currWater) => {
    const bill = (currWater - prevWater) * 18000;
    setWaterBill(bill);
  };
  const handleRentChange = (e) => {
    setRent(e.target.value);
  };
  const handleGarbageChange = (e) => {
    setGarbage(e.target.value);
  };
  const handleMiscChange = (e) => {
    setMisc(e.target.value);
  };
  const handlePrevBalanceChange = (e) => {
    setPrevBalance(e.target.value); // New handler for previous balance
  };
  let categories = [waterBill, elecBill, rent, garbage, misc, prevBalance];
  let idGenerator = 1;
  const calculateTotal = (e) => {
    e.preventDefault();

    const totalSum = categories.reduce(
      (acc, category) => acc + (parseFloat(category) || 0),
      0
    );
    setTotal(totalSum);
    const newEntry = {
      id: idGenerator++,
      address: addr,
      unit: unit,
      tenant: tenant,
      rent: rent,
      prevElec: prevElec,
      currElec: currElec,
      billElec: elecBill,
      prevWater: prevWater,
      currWater: currWater,
      billWater: waterBill,
      prevBalance: prevBalance,
      total: total,
    };
    mockData.push(newEntry);
    console.log("mock updated:", mockData);
    navigate("/dashboard");
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form>
        <h2>Hóa đơn tiền phòng</h2>
        <h5>
          Địa chỉ:
          <input
            placeholder="Dia chi"
            value={addr}
            onChange={handleAddrChange}
          ></input>
        </h5>

        <h5>
          Phòng:
          <input
            placeholder="Unit"
            value={unit}
            onChange={handleUnitChange}
          ></input>
        </h5>
        <h5>
          Họ Tên:
          <input
            placeholder="Tenant"
            value={tenant}
            onChange={handleTenantChange}
          ></input>
        </h5>

        <h5>
          Chênh lệch Điện:
          <input
            value={currElec}
            onChange={handleCurrElecChange}
            placeholder="Số mới:"
            type="number"
          ></input>
          <input
            value={prevElec}
            onChange={handlePrevElecChange}
            name="prevElecInput"
            placeholder="Số cũ:"
            type="number"
          ></input>
        </h5>
        <h5>Tiền Điện: {elecBill}</h5>

        <h5>
          Chênh lệch Nước:
          <input
            value={currWater}
            onChange={handleCurrWaterChange}
            name="currentWaterInput"
            placeholder="Số mới:"
            type="number"
          ></input>
          <input
            value={prevWater}
            onChange={handlePrevWaterChange}
            name="prevWaterInput"
            placeholder="Số cũ:"
            type="number"
          ></input>
        </h5>

        <h5>Tiền Nước: {waterBill}</h5>
        <h5>
          Chi Phí Thuê :
          <input
            value={rent}
            onChange={handleRentChange}
            name="rent"
            type="number"
            placeholder="Tiền phòng:"
          ></input>
        </h5>
        <h5>
          Tiền Rác:
          <input
            value={garbage}
            onChange={handleGarbageChange}
            name="trashBill"
            type="number"
            placeholder="Tiền Rác:"
          ></input>
        </h5>
        <h5>
          Tiền Phát Sinh:
          <input
            value={misc}
            onChange={handleMiscChange}
            name="miscellaneous"
            type="number"
            placeholder="Tiền Phát Sinh:"
          ></input>
        </h5>
        <h5>
          Tiền Nợ Cũ:
          <input
            value={prevBalance}
            onChange={handlePrevBalanceChange}
            name="prevBalance"
            type="number"
            placeholder="Tiền Nợ Cũ:"
          ></input>
        </h5>
        <button onClick={calculateTotal}>Submit</button>
      </form>
    </div>
  );
}
