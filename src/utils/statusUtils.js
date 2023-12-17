export const DELIVERED = 'Delivered';
export const PICKED_UP = 'Picked Up';
export const IN_TRANSIT = 'In Transit';
export const BOOKED = 'Booked';

export const statusOptions = [
  { status: BOOKED, color: 'red' },
  { status: PICKED_UP, color: 'green' },
  { status: IN_TRANSIT, color: 'yellow' },
  { status: DELIVERED, color: 'black' },
];

export const getStatusStyle = (status, id, loadingStatusId) => {
    const statusColor = statusOptions.find(s => s.status === status)?.color;
    return {
      backgroundColor: loadingStatusId === id ? 'grey' : statusColor, // Grey out if loading
      color: statusColor === 'yellow' ? 'black' : 'white',
      cursor: 'pointer',
      width: '120px', // Set a fixed width
      height: '40px', // Set a fixed height
      padding: '5px 10px', // Optional, adjust for better text alignment
      textAlign: 'center', // Center the text
      whiteSpace: 'nowrap', // Prevents text wrapping
      overflow: 'hidden', // Keeps the text within the button
      textOverflow: 'ellipsis', // Adds an ellipsis if the text is too long
    };
  };