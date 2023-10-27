// components/Navigation.js
import Link from 'next/link';

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/calendar">Calendar</Link>
        </li>
        {/* Add more navigation links if needed */}
      </ul>
    </nav>
  );
}

export default Navigation;
