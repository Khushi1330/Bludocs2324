import { useState } from 'react';
import { Document, User } from './types/api.ts';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import HomePage from './components/HomePage';
import api from './types/api';

type AppView = 'landing' | 'signin' | 'signup' | 'home';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleSignIn = async (token: string, name: string, email: string) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userEmail', email);
    setAccessToken(token);
    setUser({name, email, isVerified: true });

    try {
      const docsRes = await api.get('/api/documents', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setDocuments(docsRes.data);
      setCurrentView('home');
    } catch (error) {
      console.error('Fetch documents error:', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setDocuments([]);
    setAccessToken(null);
    setCurrentView('landing');
  };

  const handleShowSignIn = () => setCurrentView('signin');
  const handleShowSignUp = () => setCurrentView('signup');
  const handleBackToLanding = () => setCurrentView('landing');

  const handleUpload = async (files: FileList) => {
    if (!accessToken) return;

    const file = files[0];
    const { name, type, size } = file;

    try {
      const presignRes = await api.post('/api/documents/presign', {
        fileName: name,
        contentType: type
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      const { uploadUrl, key } = presignRes.data;

      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': type },
        body: file
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload to S3');
      }

      const metadataResponse = await api.post('/api/documents/metadata', {
        fileName: name,
        key,
        contentType: type,
        size,
        fileType: type.split('/')[1] || 'unknown'
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      const newDocument: Document = metadataResponse.data;

      setDocuments(prev => [...prev, newDocument]);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleDelete = async (documentId: string) => {
    if (!accessToken || !documentId) {
      console.error('No access token or invalid ID');
      return;
    }

    try {
      await api.delete(`/api/documents/${documentId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        user={user}
        onLogout={handleLogout}
        onShowSignIn={handleShowSignIn}
        onShowLogIn={handleShowSignUp}
      />

      {(() => {
        switch (currentView) {
          case 'signin':
            return <SignInPage onSignIn={handleSignIn} onBack={handleBackToLanding} />;
          case 'signup':
            return <SignUpPage onSignUp={handleSignIn} onBack={handleBackToLanding} />;
          case 'home':
            return (
              <HomePage
                documents={documents}
                onUpload={handleUpload}
                onDelete={(doc: { id: string }) => handleDelete(doc.id)}  
                accessToken={accessToken} refreshDocuments={function (): Promise<void> {
                  throw new Error('Function not implemented.');
                } }              />
            );
          default:
            return <LandingPage onLogin={handleShowSignIn} />;
        }
      })()}
    </div>
  );
}

export default App;
