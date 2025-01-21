export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  // address: Address;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  geolocation: Geolocation;
}

interface Geolocation {
  latitude: string;
  longitude: string;
}
