import { useState } from 'react';
import CustomerList from './components/CustomerList.jsx';
import ReloadPrompt from './components/ReloadPrompt.jsx';
import './App.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadSource, setLoadSource] = useState('');

  const loadCustomers = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/customers.json');
      if (!response.ok) {
        throw new Error('Failed to load customers.');
      }

      const data = await response.json();
      setCustomers(data.customers);
      setLoadSource(navigator.onLine ? 'online' : 'offline');
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  };

  const removeCustomer = (customerId) => {
    setCustomers(currentCustomers =>
      currentCustomers.filter(customer => customer.id !== customerId)
    );
  };

  return (
    <main className="container">
      <ReloadPrompt />
      <h1>Customer List</h1>
      <p>Load the sample customer data online, then try it again offline.</p>

      <section className="customer-section" aria-labelledby="customers-heading">
        <h2 id="customers-heading">Sample API</h2>
        <button
          className="load-customers-button"
          type="button"
          onClick={loadCustomers}
          disabled={loading}
        >
          {loading ? 'Loading customers...' : 'Load customers'}
        </button>

        {error && <p className="load-error" role="alert">{error}</p>}
        {loadSource && !error && (
          <p className="load-success" role="status">
            {loadSource === 'offline'
              ? 'Customer data loaded from the API cache while offline.'
              : 'Sample API data loaded. It is now available in the API cache.'}
          </p>
        )}
        {loadSource && (
          <CustomerList customers={customers} onRemove={removeCustomer} />
        )}
      </section>
    </main>
  );
}

export default App;
