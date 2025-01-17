import { Alert, Button } from "antd";
import moment from "moment";
import "./index.css";
import { doctorTimeSlot } from "../../constant/global";
import axios from "axios";
import { BASE_URL } from "../../constant/url";
const SelectApppointment = ({
  selectedDate,
  handleDateChange,
  selectTime,
  setSelectTime,
}) => {
  const handleSelectTime = async (date) => {
    try {
      let { data } = await axios.get(
        BASE_URL+"/api/isAvailable/" + selectedDate + "/" + date
      );
      if (data) {
        alert("Time already booked please change time or date");
        setSelectTime("");
      } else {
        setSelectTime(date);
      }
    } catch (error) {}
  };

  const amTimeSlot = doctorTimeSlot.filter((item) => item.includes("AM"));
  const pmTimeSlot = doctorTimeSlot.filter((item) => item.includes("PM"));

  const last7Days = Array.from({ length: 7 }, (_, index) =>
    moment().clone().add(index, "days")
  );

  return (
    <>
      <div style={{ marginTop: "3rem" }}>
        <dir className="p-3" style={{ background: "#f8f9fa" }}>
          <div className="row">
            <div className="col-md-5 col-sm-12 mt-3 border-end">
              <p className="py-2 border-bottom info-head-date">
                {selectedDate
                  ? `Selected - ${moment(selectedDate).format("LL")}`
                  : "Select Your Desired Date for Appointment"}
              </p>
              <div className="info-date-card row">
                {last7Days.map((item, index) => (
                  <div
                    key={index + 7}
                    className="mb-3 col-md-6"
                    onClick={() => handleDateChange(item)}
                  >
                    <div
                      className={`p-3 mb-3 rounded text-center select-date ${
                        moment(item).format("LL") ===
                        moment(selectedDate).format("LL")
                          ? "active"
                          : ""
                      }`}
                    >
                      <div className="select-month">
                        {moment(item).format("MMMM YYYY")}
                      </div>
                      <div className="select-day-num">
                        {moment(item).format("D")}
                      </div>
                      <div className="select-month">
                        {moment(item).format("dddd")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4 col-sm-12 mt-3">
              <p className="py-2 border-bottom info-head-date">
                {selectTime
                  ? `Selected -  ${selectTime} To ${moment(
                      selectTime,
                      "hh:mm A"
                    )
                      .add(15, "minutes")
                      .format("hh:mm A")}`
                  : "Select Your Desired Time-Slot for Appointment"}
              </p>

              <div className="select-time-div">
                <h4>
                  Morning Time{" "}
                  <span className="text-secondary">(10AM - 12PM)</span>
                </h4>
                <div className="row text-center mt-3">
                  {amTimeSlot.map((item, id) => (
                    <div className="col-md-4 col-sm-6" key={id + 155}>
                      <Button
                        type={item === selectTime ? "success" : "default"}
                        shape=""
                        size="small"
                        className="mb-3"
                        onClick={() => handleSelectTime(item)}
                      >
                        {item}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="select-time-div">
                <h4>
                  After Noon Time{" "}
                  <span className="text-secondary">(1PM - 9PM)</span>
                </h4>
                <div className="row text-center mt-3">
                  {pmTimeSlot.map((item, id) => (
                    <div className="col-md-4" key={id + 155}>
                      <Button
                        type={item === selectTime ? "success" : "default"}
                        shape=""
                        size="small"
                        className="mb-3"
                        onClick={() => handleSelectTime(item)}
                      >
                        {" "}
                        {item}{" "}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </dir>
      </div>
    </>
  );
};

export default SelectApppointment;
