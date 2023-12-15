import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react'; 
import axios from 'axios';
import '@testing-library/jest-dom';
import AddTeamMember from './AddTeamMember';
jest.mock('axios');

describe('AddTeamMember', () => {
  it('renders the form with all fields', () => {
    const { getByPlaceholderText } = render(<AddTeamMember />);
    
    expect(getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Phone')).toBeInTheDocument();
  });

  it('displays error when trying to save with empty required fields', () => {
    const { getByText, getByRole } = render(<AddTeamMember />);
    const saveButton = getByRole('button', { name: 'Save' });
    
    fireEvent.click(saveButton);
    
    expect(getByText('First name is required.')).toBeInTheDocument();
    expect(getByText('Last name is required.')).toBeInTheDocument();
    expect(getByText('Email is required.')).toBeInTheDocument();
    expect(getByText('Phone number is required.')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    axios.post.mockResolvedValue({ data: 'Member added' });
    const { getByPlaceholderText, getByRole, queryByText } = render(<AddTeamMember />);
    
    fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByPlaceholderText('Phone'), { target: { value: '1234567890' } });
    fireEvent.click(getByRole('radio', { name: 'Regular - Can\'t delete members' }));
    
    const saveButton = getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/members/add-member', {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        role: 'regular',
      });
    });
  });
});
