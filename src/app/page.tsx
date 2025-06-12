'use client'
import React from 'react'
import Header from './components/header'
import Hero from './components/hero'

function page() {
  // list all the emails registered in the database
  const [emails, setEmails] = React.useState<string[]>([]);
  React.useEffect(() => {
    const fetchEmails = async () => {
      const res = await fetch('/api/fetch');
      if (res.ok) {
        const data = await res.json();
        console.log('Fetched Emails:', data);
        setEmails(data.emails.map((user: { Email: string }) => user.Email));
      } else {
        console.error('Failed to fetch emails');
      }
    };
    fetchEmails();
  
  }, []);
  console.log('Registered Emails:', emails);
  return (
    <>
      <Header />
      <div className="relative">
      <Hero />
      <div className="absolute top-0 left-0 right-0 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="p-5 bg-gray-50/90 backdrop-blur-sm rounded-lg my-5">
        <h2 className="mb-3 text-2xl text-gray-800 font-medium">Registered Emails</h2>
        <ul className="list-none p-0">
          {emails.map((email, index) => (
          <li key={index} className="py-1.5 border-b border-gray-200 text-gray-600">
            {email}
          </li>
          ))}
        </ul>
        </div>
      </div>
      </div>
    </>
  )
}
export default page