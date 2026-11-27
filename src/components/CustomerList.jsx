function CustomerList({ customers, onRemove }) {
  if (customers.length === 0) {
    return <p>No customers to display.</p>;
  }

  return (
    <ul className="customer-list">
      {customers.map(customer => (
        <li className="customer-item" key={customer.id}>
          <span>{customer.name}</span>
          <button type="button" onClick={() => onRemove(customer.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

export default CustomerList;
