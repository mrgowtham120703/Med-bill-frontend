import React from 'react';
export default function ClaimPreview({data}){
    return (
        <div style={{border: '1px dashed #333', padding:12, marginTop:12}}>
          <h4>Preview</h4>
          <div>Billed : {data.billed}</div>
          <div>Estimated allowed : {data.allowed}</div>
        </div>
    )
}