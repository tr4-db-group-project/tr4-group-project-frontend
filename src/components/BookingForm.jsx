import { useState } from 'react';
import { Listbox, ListboxOption, ListboxOptions, ListboxButton, ListboxLabel, Label } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import axios from 'axios';

const events = [
  { id: 1, name: 'Rock Fest 2024' },
  { id: 2, name: 'Jazz Night Live' },
  { id: 3, name: 'Country Music Festival' },
  { id: 4, name: 'Electronic Dance Party' },
  { id: 5, name: 'Classical Symphony Gala' },
  { id: 6, name: 'Hip Hop Extravaganza' },
  { id: 7, name: 'Pop Stars Reunion' },
  { id: 8, name: 'Indie Rock Showcase' },
  { id: 9, name: 'Reggae Summer Jam' },
  { id: 10, name: 'Blues and Brews Festival' },
];

const ticketNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Form() {

  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [selectedTickets, setSelectedTickets] = useState(ticketNumbers[0]);
  const [email, setEmail] = useState('');
  const [submittedData, setSubmittedData] = useState(null);


/*

  const [events, setEvents] = useState(events[0])
//get events from backend
useEffect(() => {
  axios.get('/api/events')
    .then(response => {
      setEvents(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the events', error);
    });
}, []);

*/

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      id: selectedEvent.id,
      eventName: selectedEvent.name,
      numberOfTickets: selectedTickets,
      email: email,
    };

    try {
      const response = await axios.post('https:/localhost:8080/api/ticket', dataToSubmit);
      setSubmittedData(dataToSubmit);
      console.log('Order submitted:', response.data);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  }

  return (
    <div className="space-y-4">
      <Listbox value={selectedEvent} onChange={setSelectedEvent}>
        {({ open }) => (
          <>
            <Label className="block text-sm font-medium leading-6 text-gray-900">Choose Event</Label>
            <div className="relative mt-2">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">{selectedEvent.name}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {events.map((event) => (
                  <ListboxOption
                    key={event.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={event}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                          {event.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </>
        )}
      </Listbox>

      <Listbox value={selectedTickets} onChange={setSelectedTickets}>
        {({ open }) => (
          <>
            <ListboxLabel className="block text-sm font-medium leading-6 text-gray-900">Number of Tickets</ListboxLabel>
            <div className="relative mt-2">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">{selectedTickets}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {ticketNumbers.map((number) => (
                  <ListboxOption
                    key={number}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={number}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                          {number}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </>
        )}
      </Listbox>

      <div className="mt-4 ">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block py-2 px-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <button
        onClick={handleSubmit(event)}
        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit
      </button>

      {submittedData && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Recorded Data</h2>
          <p>EventId: {submittedData.id}</p>
          <p>Event: {submittedData.event}</p>
          <p>Tickets: {submittedData.tickets}</p>
          <p>Email: {submittedData.email}</p>
        </div>
      )}
    </div>
  );
}