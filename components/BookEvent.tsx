'use client';

import { set } from "mongoose";
import { useState } from "react";

const BookEvent = () => {
  
     const[email,setEmail] = useState("");
     const[submitted,setSubmitted] = useState(false);


   const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

            // Here you would typically send the email to your backend to process the booking
              setTimeout(() => {
                    setSubmitted(true);
              }, 1000); // Simulate an API call
        }


  return (
    <div id="book-event">
         {submitted ? (
            <p className="text-sm">Thank you for booking your spot!</p>
         ) : (
            <form onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="email">Email Address:</label>
               <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="Enter your email"
               />
              </div>

               <button type="submit" onClick={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
               }}>
                  Book Now
               </button>
            </form>
         )}
    </div>
  )
}

export default BookEvent
