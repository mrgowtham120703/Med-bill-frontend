import React, {useEffect, useState} from 'react'
import api from '../api/api'

export default function ProviderDashboard() {
    const [providers, setProviders] = useState([]);
    
    useEffect(()=>{api.get('/providers')
        .then(r=>setProviders(r.data))
        .catch(()=>{});
    },[]);

    return (
        <div>
            <h2>Provider Dashboard</h2>
            <ul>
                {providers.map(p => <li key={p._id}>{p.name} — {p.npi}</li>)}
            </ul>
        </div>
    )
}