import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    } else {
      // Optionally, you could call an API to get user details with the token.
      setUser({ name: 'Admin User' }); // Mocked user details for now.
    }
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome {user.name}!</h1>
      <p>This is the home page</p>
    </div>
  );
}
