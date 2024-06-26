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
});
