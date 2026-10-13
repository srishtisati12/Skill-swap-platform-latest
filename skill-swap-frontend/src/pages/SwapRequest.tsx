
import { useEffect, useState } from 'react';
import {
  getSwapRequests,
  acceptSwapRequest,
  rejectSwapRequest,
} from '../services/swapRequestServices';
import { getMyProfile } from '../services/authServices';
import type { SwapRequest } from '../types/swaprequest';

function SwapRequests() {
  const [requests, setRequests] = useState<SwapRequest[]>([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const user = await getMyProfile();
        setUserId(user.id);

        const requestData = await getSwapRequests();
        setRequests(requestData);
      } catch (error) {
        console.log(error);
      }
    }

    loadData();
  }, []);

  async function handleAction(id: string, action: 'accept' | 'reject') {
    try {
      if (action === 'accept') {
        await acceptSwapRequest(id);
      } else {
        await rejectSwapRequest(id);
      }

      setRequests((previous) =>
        previous.map((request) =>
          request.id  === id
            ? { ...request, status: action === 'accept' ? 'ACCEPTED' : 'REJECTED' }
            : request
        )
      );
    } catch (error) {
      alert('Could not update request');
    }
  }

  const received = requests.filter((r) => r.receiverId === userId);
  const sent = requests.filter((r) => r.senderId === userId);

  return (
    <div className="swap-requests-page">
      <h2>Swap Requests</h2>

      <h3>Received Requests</h3>

      {received.length === 0 ? (
        <p>No received requests</p>
      ) : (
        received.map((request) => {
          const id = request.id 

          return (
            <div className="request-card" key={id}>
              <p>Offered: {request.skillOffered}</p>
              <p>Wanted: {request.skillWanted}</p>
              <p>Status: {request.status}</p>

              {request.status === 'PENDING' && id && (
                <>
                  <button onClick={() => handleAction(id, 'accept')}>
                    Accept
                  </button>
                  <button onClick={() => handleAction(id, 'reject')}>
                    Reject
                  </button>
                </>
              )}
            </div>
          );
        })
      )}

      <h3>Sent Requests</h3>

      {sent.length === 0 ? (
        <p>No sent requests</p>
      ) : (
        sent.map((request) => (
          <div className="request-card" key={request.id}>
            <p>Offered: {request.skillOffered}</p>
            <p>Wanted: {request.skillWanted}</p>
            <p>Status: {request.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default SwapRequests;
