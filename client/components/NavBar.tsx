"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        setUserName(userData.firstName);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName(null);
    router.push("/Usuario");
  };

  return (
    <nav className="bg-gray-700 flex items-center justify-between px-6 py-3">
      <div className="flex items-center space-x-10">
        <Image
          src="/imagenes/pac.webp"
          alt="imagen paquete"
          height={40}
          width={150}
          className="cursor-pointer"
        />
        <NavLink href="/">Inicio</NavLink>
        <NavLink href="/Paquete">Tienda</NavLink>
        {isLoggedIn ? (
          <>
            <NavLink href="#">{userName}</NavLink>
            <NavLink href="#" onClick={handleLogout}>Salir</NavLink>
          </>
        ) : (
          <NavLink href="/Usuario">Usuario</NavLink>
        )}
        <div className="relative">
          <NavLink href="/Carrito">Carrito</NavLink>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children, onClick }: { href: string, children: React.ReactNode, onClick?: () => void }) => (
  <Link href={href} passHref className="text-white hover:bg-gray-600 decoration-transparent px-3 py-2 rounded-md" onClick={onClick}>
    {children}
  </Link>
);

export default NavBar;
