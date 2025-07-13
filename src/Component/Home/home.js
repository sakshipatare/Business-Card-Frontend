import React from 'react';
import './Home.css';
const users = [
  {
    id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com',
    phone: '1234567890', companyName: 'Tech Corp', companyNumber: '9876543210', companyAddress: '123 Street, NY'
  },
  {
    id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com',
    phone: '2234567890', companyName: 'Biz Corp', companyNumber: '8876543210', companyAddress: '456 Lane, LA'
  },
  {
    id: 3, firstName: 'Alice', lastName: 'Brown', email: 'alice@example.com',
    phone: '3234567890', companyName: 'Dev Solutions', companyNumber: '7876543210', companyAddress: '789 Avenue, TX'
  },
  {
    id: 4, firstName: 'Mark', lastName: 'Lee', email: 'mark@example.com',
    phone: '4234567890', companyName: 'Code Inc.', companyNumber: '6876543210', companyAddress: '101 Blvd, CA'
  },
  {
    id: 5, firstName: 'Sara', lastName: 'Jones', email: 'sara@example.com',
    phone: '5234567890', companyName: 'Alpha Tech', companyNumber: '5876543210', companyAddress: '202 Crescent, FL'
  },
  {
    id: 6, firstName: 'Tom', lastName: 'White', email: 'tom@example.com',
    phone: '6234567890', companyName: 'LogicWorks', companyNumber: '4876543210', companyAddress: '303 Main, WA'
  },
  {
    id: 7, firstName: 'Lucy', lastName: 'Clark', email: 'lucy@example.com',
    phone: '7234567890', companyName: 'NextGen', companyNumber: '3876543210', companyAddress: '404 Elm, NV'
  },
  {
    id: 8, firstName: 'Kevin', lastName: 'Wilson', email: 'kevin@example.com',
    phone: '8234567890', companyName: 'Skyline', companyNumber: '2876543210', companyAddress: '505 Oak, CO'
  },
  {
    id: 9, firstName: 'Anna', lastName: 'Davis', email: 'anna@example.com',
    phone: '9234567890', companyName: 'BrightSoft', companyNumber: '1876543210', companyAddress: '606 Lake, AZ'
  },
  {
    id: 10, firstName: 'Sam', lastName: 'Taylor', email: 'sam@example.com',
    phone: '1034567890', companyName: 'FutureTech', companyNumber: '0876543210', companyAddress: '707 Hill, OR'
  }
];

function Home() {
  return (
    <div className="home">
      <h2>Network</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th>
            <th>Phone</th><th>Company Name</th><th>Company Number</th><th>Company Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td><td>{user.firstName}</td><td>{user.lastName}</td><td>{user.email}</td>
              <td>{user.phone}</td><td>{user.companyName}</td><td>{user.companyNumber}</td><td>{user.companyAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
