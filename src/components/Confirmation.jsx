export default function Confirmation({ submittedData, resetForm }) {
    return (
      <div className="confirmation">
        <h2>Booking submitted! Check email for confirmation.</h2>
        <p>Event: {submittedData.eventName}</p>
        <p>Tickets: {submittedData.numberOfTickets}</p>
        <p>Email: {submittedData.email}</p>
        <button
          onClick={resetForm}
          className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Make a New Booking
        </button>
      </div>
    );
  }
  