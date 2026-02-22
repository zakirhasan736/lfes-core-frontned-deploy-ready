'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'success' | 'invalid' | 'loading'>(
    'loading'
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('status');

    if (s === 'success' || s === 'invalid') {
      setStatus(s);
    } else {
      setStatus('invalid');
    }
  }, []);

  if (status === 'loading') {
    return <div className="p-6">Verifying email…</div>;
  }

  if (status === 'success') {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-green-600">Email Verified</h1>
        <p className="mt-2">Your email has been successfully verified.</p>
        <Link href="/" className="text-blue-600 underline mt-4 inline-block">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600">Verification Failed</h1>
      <p className="mt-2">This verification link is invalid or has expired.</p>
      <Link href="/login" className="text-blue-600 underline mt-4 inline-block">
        Go to Login
      </Link>
    </div>
  );
}
