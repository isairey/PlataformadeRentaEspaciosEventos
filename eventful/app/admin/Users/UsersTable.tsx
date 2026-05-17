"use client";

import React from "react";
import { User } from "@/lib/types";

interface Props {
  users: User[];
}

const UsersTable: React.FC<Props> = ({ users }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            TotalBooking
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            JoinDate
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Role
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map((user) => (
          <tr key={user.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {user.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {user.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {user.totalBookings}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {user.joinDate}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {user.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UsersTable;
