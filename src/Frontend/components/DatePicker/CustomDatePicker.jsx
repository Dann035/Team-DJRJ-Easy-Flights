import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css';

const CustomDatePicker = ({ 
  selectedDate, 
  onChange, 
  placeholderText, 
  minDate, 
  maxDate,
  selectsStart,
  selectsEnd,
  startDate,
  endDate,
  label
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Custom input component
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="custom-date-input" onClick={onClick} ref={ref}>
      <span className={`date-placeholder ${value ? 'has-value' : ''}`}>
        {value || placeholderText}
      </span>
      <FaCalendarAlt className="calendar-icon" />
    </div>
  ));

  // Custom header component
  const CustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    return (
      <div className="custom-header">
        <button
          className="month-nav-button"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
        >
          <FaChevronLeft />
        </button>
        
        <div className="month-year-display">
          <span>{months[date.getMonth()]}</span>
          <span>{date.getFullYear()}</span>
        </div>
        
        <button
          className="month-nav-button"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
        >
          <FaChevronRight />
        </button>
      </div>
    );
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <div className="custom-datepicker-container">
      {label && <label className="date-label">{label}</label>}
      
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          onChange(date);
          setIsOpen(false);
        }}
        onCalendarOpen={() => setIsOpen(true)}
        onCalendarClose={() => setIsOpen(false)}
        customInput={<CustomInput />}
        renderCustomHeader={CustomHeader}
        calendarClassName={`custom-calendar ${isOpen ? 'is-open' : ''}`}
        popperClassName="custom-popper"
        dateFormat="dd/MM/yyyy"
        minDate={minDate}
        maxDate={maxDate}
        selectsStart={selectsStart}
        selectsEnd={selectsEnd}
        startDate={startDate}
        endDate={endDate}
        popperModifiers={{
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: 'viewport'
          }
        }}
        popperPlacement="bottom-start"
        dayClassName={date => 
          date.getDay() === 0 || date.getDay() === 6 
            ? "weekend-day" 
            : undefined
        }
      />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="datepicker-backdrop"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDatePicker;