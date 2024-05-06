import { useState } from "react";
import './Attendance.css'
import { lady } from "../../assets";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LuChevronsLeft, LuChevronsRight } from "react-icons/lu";

const Attendance = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); //  getMonth() returns a zero-based index, so we add 1 to get the actual month.

  let weeks = [];
  let week = [];

  const createCalendar = () => {
    const monthNames = [
      "January",
      " February",
      "March",
      "April",
      " May",
      "June",
      "July",
      " August",
      "September",
      "October",
      " November",
      "December",
    ];

    const daysOfWeek = [
      "Sun",
      "Mon",
      "tue",
      "Wed",
      "Thur",
      "Fri",
      "Sat",
      "Sun",
    ];

    const firstDay = new Date(year, month - 1, 1).getDay();

    const numDays = new Date(year, month, 0).getDate();

    let days = [];

    // Giving the remaining days emoty place holders
    for (let i = 0; i < firstDay; i++) {
      days.push("");
    }

    // Loop through each day of the month
    for (let day = 1; day <= numDays; day++) {
      // Push the day into the days array
      days.push(day);
    }

    // Split the number of days into week

    days.forEach((day, index) => {
      // Push the day into weeks
      week.push(day);
      // Check if we've reached the end of the week or the end of the days array
      // index canting started of the week like sunday is 1, munday is 2 etc...
      if ((index + 1) % 7 === 0 || index === days.length - 1) {
        weeks.push(week);
        week = [];
      }
    });
    return (
      <div>
        <h2>
          {monthNames[month - 1]} {year}
        </h2>

        <div className="days-of-week">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {weeks.map((week, index) => (
          <div key={index} className="week">
            {week.map((day, index) => (
              <div
                key={index}
                className={`day ${day === "" ? "empty" : ""} ${
                  isToday(year, month, day) ? "today" : ""
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  

  const isToday = (checkYear, checkMonth, checkDay) => {
    const today = new Date();
  
    return (
      checkYear === today.getFullYear() &&
      checkMonth === today.getMonth() + 1 &&
      checkDay === today.getDate()
    );
  };

  const [activeIndex, setActiveIndex] = useState(-1);

  const handleToggleClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index)
  }


  const studentData = [
    {
    name: "Aliyu Abdullah",
    buttonText: "Go there",
    image: lady
    },
    {
    name: "Kenny Soliu",
    buttonText: "Assuming you are fine than this",
    image: lady
    },
    {
    name: "Zainab MM",
    buttonText: "Softwere Dev",
    image: lady
    },
    
    
  ];

  const handlePrevMonthClick = () => {
    if(month === 1) {
      setMonth(12);
      setYear(year -1);

    }else{
      setMonth(month -1)
    }
  }
  const handleNextMonthClick = () => {
    if(month === 12) {
      setMonth(1);
      setYear(year + 1);

    }else{
      setMonth(month + 1)
    }
  }
  const handlePrevYearClick = () => {
  setYear(year -1)
  }
  const handleNextYearClick = () => {
    setYear(year + 1)
  }

  
  return (
    <div className="attCon">
      <div>
        <h2 className="dailyText">Daily Attendance </h2>
          <p className="selectDay">Select Day</p>
       
      </div>
  
      <div className="calendar">
        <div className="controls">
          <button className="yearButton" onClick={handlePrevYearClick}>
            <LuChevronsLeft/>
          </button>
          <button className="monthButton" onClick={handlePrevMonthClick}>
            {/* <LuChevronsLeft/> */}
            <FaChevronLeft/>
          </button>
          {createCalendar()}
          <button className="monthButton" onClick={handleNextMonthClick}>
            <FaChevronRight/>
          </button>
          <button className="yearButton" onClick={handleNextYearClick}>
            <LuChevronsRight/>
          </button>
        </div>
      </div>

      <div className="peopleDetail">
        <h2 className="markText">Mark Attendance</h2>
        {studentData.map((person, i) => (
          <div className="peopleMov" key={i}>
            <div className="flex-column">
              <div className="image_st">
                <img src={person.image} alt={person.name} />
              </div>

              <div className="titleBox">
                <h3 className="titleText">
                  {person.name}
                </h3>

                <p className="titlePara">
                  {person.buttonText}
                </p>
              </div>
            </div>

            <div className={`toggleSwitch ${
              activeIndex === i ? "active" : ""
            }`}
            onClick={() => handleToggleClick(i)}>

            </div >
          </div>
        ))}

        <div className="attendanceLas">
          <button className="attendanceBtn">Submit</button>
        </div>
      </div>
    </div>
  );
};


export default Attendance;