import React from 'react';
export default function ClaimPreview({data}){
    return (
        <div style={{border: '1px dashed #333', padding:12, marginTop:12}}>
          <h4>Preview</h4>
          <p><strong>Billed:</strong> ₹{data.billed}</p>
          <p><strong>Estimated allowed:</strong> ₹{data.allowed}</p>
        </div>
    )
}