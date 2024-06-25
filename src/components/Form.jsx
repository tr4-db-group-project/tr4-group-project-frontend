import { useState } from "react";
import {
  Listbox,
  ListboxOption,
  ListboxOptions,
  ListboxButton,
  ListboxLabel,
  Label,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "../axios";

const events = [
  {
    eventId: "a1b2c38895f6",
    eventName: "Choose your event"
  },
  {
    eventId: "a1b2c3d4e5f6",
    eventName: "Rock Concert"
  },
  {
    eventId: "b2c3d4e5f6a7",
    eventName: "Soccer Match"
  },
  {
    eventId: "c3d4e5f6a7b8",
    eventName: "Jazz Festival"
  },
  {
    eventId: "d4e5f6a7b8c9",
    eventName: "Basketball Game"
  },
  {
    eventId: "e5f6a7b8c9d0",
    eventName: "Electronic Dance Party"
  },
  {
    eventId: "f6a7b8c9d0e1",
    eventName: "Tennis Tournament"
  },
  {
    eventId: "1a2b3c4d5e6f",
    eventName: "Classical Music Recital"
  },
  {
    eventId: "2b3c4d5e6f7a",
    eventName: "Golf Championship"
  },
  {
    eventId: "3c4d5e6f7a8b",
    eventName: "Indie Band Showcase"
  },
  {
    eventId: "4d5e6f7a8b9c",
    eventName: "Surfing Competition"
  }
];

const ticketNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Form() {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [selectedTickets, setSelectedTickets] = useState(ticketNumbers[0]);
  const [email, setEmail] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [eventError, setEventError] = useState("");
  const [ticketError, setTicketError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (selectedEvent.eventId === "a1b2c38895f6") {
      setEventError("You must choose an event");
      hasError = true;
    } else {
      setEventError("");
    }

    if (selectedTickets === 0) {
      setTicketError("Number of tickets cannot be zero");
      hasError = true;
    } else {
      setTicketError("");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      setEmailError("Please enter a valid email");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (hasError) {
      return;
    }

    const dataToSubmit = {
      eventId: selectedEvent.eventId,
      eventName: selectedEvent.eventName,
      numberOfTickets: selectedTickets,
      email: email,
    };

    try {
      const response = await axios.post("", dataToSubmit);
      setSubmittedData(dataToSubmit);
      console.log("Order submitted:", response.data);
      resetForm();
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const resetForm = () => {
    setSelectedEvent(events[0]);
    setSelectedTickets(ticketNumbers[0]);
    setEmail("");
    setEventError("");
    setTicketError("");
    setEmailError("");
    //setSubmittedData(null);
  };

  return (
    <div className="space-y-4">
      <Listbox value={selectedEvent} onChange={setSelectedEvent}>
        {({ open }) => (
          <>
            <Label className="block text-sm font-medium leading-6 text-gray-900">
              Choose Event
            </Label>
            <div className={`relative mt-2 ${eventError ? "border-red-500" : ""}`}>
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">
                    {selectedEvent.eventName}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {events.map((event) => (
                  <ListboxOption
                    key={event.eventId}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={event}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "ml-3 block truncate"
                          )}
                        >
                          {event.eventName}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
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
            {eventError && <div className="text-red-500 mt-2">{eventError}</div>}
          </>
        )}
      </Listbox>

      <Listbox value={selectedTickets} onChange={setSelectedTickets}>
        {({ open }) => (
          <>
            <ListboxLabel className="block text-sm font-medium leading-6 text-gray-900">
              Number of Tickets
            </ListboxLabel>
            <div className={`relative mt-2 ${ticketError ? "border-red-500" : ""}`}>
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">{selectedTickets}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {ticketNumbers.map((number) => (
                  <ListboxOption
                    key={number}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={number}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "ml-3 block truncate"
                          )}
                        >
                          {number}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
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
            {ticketError && <div className="text-red-500 mt-2">{ticketError}</div>}
          </>
        )}
      </Listbox>

      <div className="mt-4 py-5">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`mt-1 block py-2 px-5 w-full rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${emailError ? "border-red-500" : ""}`}
          required
        />
        {emailError && <div className="text-red-500 mt-2">{emailError}</div>}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit
      </button>  

      {submittedData && (
        <div className="mt-4">
          <h2>Booking submitted! Check email for confirmation</h2>
          <p>Event: {submittedData.eventName}</p>
          <p>Tickets: {submittedData.numberOfTickets}</p>
          <p>Email: {submittedData.email}</p>
        </div>
      )}
    </div>
  );
}