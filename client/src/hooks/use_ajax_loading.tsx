import React, { useState } from 'react'

export default function useAjaxLoading() {
  const [loading, setLoading] = useState(false);

  function withLoading(request: Promise<any>): Promise<any> {
    if (request) {
      return new Promise((resolve, reject) => {
        setLoading(true);
        request.then(res => {
          resolve(res);
          setLoading(false);
        }).catch(e => {
          reject(e);
          setLoading(false);
        })
      })
  }
}
  return [loading, withLoading];
}
