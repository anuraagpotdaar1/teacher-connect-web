const stats = [
  { name: 'Total Schools', stat: '15,897' },
  { name: 'Total Teacher Intake', stat: '72,253' },
  { name: 'Teacher Occupied', stat: '70,152' },
  { name: 'Teacher Vacancy', stat: '2,156' },
]

export default function Home() {
  return (
    <div className="m-16">
      <dl className="grid grid-cols-1 gap-16 sm:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 shadow-lg bg-indigo-50 rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-black truncate">{item.name}</dt>
            <dd className="mt-1 text-3xl text-indigo-700 font-bold">{item.stat}</dd>
          </div>
        ))}
      </dl>
      <form className="shadow-lg mt-16">
        <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg px-4">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-500 mr-3 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <label htmlFor="search" className="sr-only">Search</label>
          <input type="search" id="search" name="search" className="block w-full p-4 text-sm font-medium bg-gray-50 focus:outline-none focus:border-transparent" placeholder="Search school, teachers..." />
          <button type="submit" className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg ml-3">Search</button>
        </div>
      </form>
    </div>
  )
}