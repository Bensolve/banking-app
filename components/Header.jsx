// components/Header.js
export default function Header({ name }) {
    return (
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome, {name || 'User'}!</h1>
        <p className="text-gray-600">Manage your account and transactions efficiently:</p>
      </header>
    );
  }
  