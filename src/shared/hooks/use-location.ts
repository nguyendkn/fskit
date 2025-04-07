'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

export interface LocationObject {
  pathname: string;
  search: string;
  hash: string;
  href: string;
  origin: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
}

export function useLocation<T = LocationObject>({
  select,
}: {
  select?: (location: LocationObject) => T;
} = {}) {
  const router = useRouter();
  const [location, setLocation] = useState<LocationObject>({
    pathname: '',
    search: '',
    hash: '',
    href: '',
    origin: '',
    protocol: '',
    host: '',
    hostname: '',
    port: '',
  });

  // Cập nhật thông tin location khi component mount hoặc router thay đổi
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateLocation = () => {
        const { pathname, search, hash, href, origin, protocol, host, hostname, port } =
          window.location;

        setLocation({
          pathname,
          search,
          hash,
          href,
          origin,
          protocol,
          host,
          hostname,
          port,
        });
      };

      // Cập nhật ban đầu
      updateLocation();

      // Lắng nghe sự kiện thay đổi URL
      window.addEventListener('popstate', updateLocation);

      return () => {
        window.removeEventListener('popstate', updateLocation);
      };
    }
  }, [router]);

  // Sử dụng selector nếu được cung cấp
  const result = useCallback(() => {
    if (select) {
      return select(location);
    }
    return location;
  }, [location, select]);

  return result();
}
