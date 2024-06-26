import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Form from "../components/Form";
import events from "../data/events";
import ticketNumbers from "../data/ticketNumbers";
import axios from "../axios";

vi.mock("axios")

describe("Form Component", () => {
  it("renders the form with initial values", () => {
    render(<Form setSubmittedData={vi.fn()} />);
    expect(screen.getByLabelText("Choose Event")).toBeInTheDocument();
    expect(screen.getByLabelText("Number of Tickets")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("displays error messages on invalid form submission", async () => {
    render(<Form setSubmittedData={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText("You must choose an event")).toBeInTheDocument();
    expect(await screen.findByText("Number of tickets cannot be zero")).toBeInTheDocument();
    expect(await screen.findByText("Please enter a valid email")).toBeInTheDocument();
  });

  it("submits the form data with axios", async () => {
    const mockSetSubmittedData = vi.fn();
    render(<Form setSubmittedData={mockSetSubmittedData} />);

    fireEvent.change(screen.getByLabelText("Choose Event"), { target: { value: events[1].eventName } });
    fireEvent.change(screen.getByLabelText("Number of Tickets"), { target: { value: ticketNumbers[1] } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("", {
        eventId: events[1].eventId,
        eventName: events[1].eventName,
        numberOfTickets: ticketNumbers[1],
        email: "test@example.com",
      });
      expect(mockSetSubmittedData).toHaveBeenCalledWith({
        eventId: events[1].eventId,
        eventName: events[1].eventName,
        numberOfTickets: ticketNumbers[1],
        email: "test@example.com",
      });
    });
  });


  describe('post booking event', () => {
    it ("makes a POST request to backend", async ()=>{
        const newSubmittedBookingPayLoad = {
            eventId: events[1].eventId,
            eventName: events[1].eventName,
            numberOfTickets: ticketNumbers[1],
            email: "test@example.com",
        }

        const newSubmittedBookingMock = {
            ...newSubmittedBookingPayLoad,
        }

        axios.post.mockResolvedValue({
            data: newSubmittedBookingMock
        })

        expect(axios.post).toHaveBeenCalledWith('https://backend-deployment-pzp5hjziaq-oc.a.run.app/api/booking', newSubmittedBookingPayLoad)

   })
  })
});
