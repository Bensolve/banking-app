// components/LogoutButton.js
export default function LogoutButton({ handleLogout }) {
    return (
      <div className="mt-6 text-right">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    );
  }
  