import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import pl from 'date-fns/locale/pl';
import "./CalendarArrange.scss"
import emailjs from 'emailjs-com';

const CalendarArrange = () => {
  const [dates, setDates] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [product, setProduct] = useState('');
  const [formSent, setFormSent] = useState(false);

  const handleDateChange = (date) => {
    const selectedDate = dates.find(d => d.toDateString() === date.toDateString());
    if (selectedDate) {
      setDates(dates.filter(d => d.toDateString() !== selectedDate.toDateString()));
    } else {
      setDates([...dates, date]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    emailjs.sendForm('service_qcks8wr', 'template_scg696m', e.target, 'VRkHMneHvVIMyNma9')
      .then((result) => {
          console.log(result.text);
          setFormSent(true);
      }, (error) => {
          console.log(error.text);
      });
  };
  

  return (
    <>
      <div className='app-calendar'>
        <h1 className='text-center'>SPRAWDŹ CZY MAM WOLNY TERMIN</h1>
        <div className='calendar-container'>
          <Calendar locale={pl} onChange={handleDateChange} value={dates} tileClassName={({date, view}) => (view === 'month' && dates.find(d => d.toDateString() === date.toDateString()) ? 'highlight' : null)} />
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='dates'>Wybrane daty:</label>
            <input
              type='text'
              id='dates'
              name='dates'
              value={dates.map(date => date.toLocaleDateString('pl-PL')).join(', ')}
              readOnly
            />
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Imię:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>E-mail:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='phone'>Telefon:</label>
            <input
              type='tel'
              id='phone'
              name='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='product'>Wybierz usługę:</label>
            <select
              id='product'
              name='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
            >
              <option value=''>--Wybierz--</option>
              <option value='fotografia imprez'>Fotografia imprez</option>
              <option value='fotografia oraz filmy z drona'>Fotografia oraz filmy z drona</option>
              <option value='fotografia reklamowa'>Fotografia reklamowa</option>
            </select>
          </div>
          <button type='submit' className='submit-btn'>
            Wyślij
          </button>
        </form>
        {formSent && <p>Udało się! Formularz został wysłany :) </p>}
      </div>
    </>
  )
}

export default CalendarArrange
