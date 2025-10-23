import React, { useEffect, useState } from 'react'
import api from '../api/api'

export default function ClaimList() {

  const [list, setList] = useState([]);
  useEffect(() => {
    api.get('/claims')
    .then(r => setList(r.data))
    .catch(() => { });
  }, []);

  return (
    <div>
      <h2>Claims</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Billed</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {list.map(c => (
            <tr key={c._id}>
              <td>{c._id}</td>
              <td>{c.billedAmount || (c.calculated && c.calculated.billed)}</td>
              <td>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}