'use client';

import { useState } from 'react';
import { 
  addDocument, 
  getAllDocuments, 
  updateDocument, 
  deleteDocument 
} from '@/lib/firestoreService';

interface TestDocument {
  id?: string;
  message: string;
  timestamp?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function FirebaseTestPage() {
  const [documents, setDocuments] = useState<TestDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const testConnection = async () => {
    setLoading(true);
    setStatus('Probando conexión a Firebase...');
    try {
      const docs = await getAllDocuments('test');
      setDocuments(docs as TestDocument[]);
      setStatus(`✅ Conexión exitosa! ${docs.length} documentos encontrados.`);
    } catch (error) {
      setStatus(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const addTestDocument = async () => {
    if (!message.trim()) {
      setStatus('⚠️ Por favor escribe un mensaje');
      return;
    }

    setLoading(true);
    setStatus('Agregando documento...');
    try {
      const docId = await addDocument('test', {
        message: message,
        timestamp: new Date().toISOString()
      });
      setStatus(`✅ Documento agregado con ID: ${docId}`);
      setMessage('');
      await testConnection();
    } catch (error) {
      setStatus(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteTestDocument = async (docId: string) => {
    setLoading(true);
    setStatus('Eliminando documento...');
    try {
      await deleteDocument('test', docId);
      setStatus(`✅ Documento eliminado: ${docId}`);
      await testConnection();
    } catch (error) {
      setStatus(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="section" style={{ background: 'var(--gradient-hero)', color: 'var(--text-inverse)', padding: 'var(--spacing-2xl) 0' }}>
        <div className="container">
          <h1 style={{ color: 'var(--text-inverse)', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            <i className="fas fa-database"></i> Firebase Test
          </h1>
          <p style={{ fontSize: 'var(--font-size-lg)', color: 'rgba(255,255,255,0.9)' }}>
            Prueba de conexión a Firestore
          </p>
        </div>
      </section>

      {/* Test Section */}
      <section className="section">
        <div className="container">
          {/* Status */}
          {status && (
            <div className="card" style={{ 
              marginBottom: 'var(--spacing-lg)', 
              background: status.includes('✅') ? 'rgba(40, 167, 69, 0.1)' : status.includes('❌') ? 'rgba(220, 53, 69, 0.1)' : 'rgba(255, 193, 7, 0.1)',
              borderLeft: `4px solid ${status.includes('✅') ? 'var(--color-success)' : status.includes('❌') ? 'var(--color-danger)' : 'var(--color-warning)'}`
            }}>
              <p style={{ margin: 0, fontSize: 'var(--font-size-lg)' }}>{status}</p>
            </div>
          )}

          {/* Actions */}
          <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3><i className="fas fa-cog"></i> Acciones</h3>
            
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <button 
                className="btn btn-primary" 
                onClick={testConnection}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Cargando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sync"></i> Probar Conexión
                  </>
                )}
              </button>
            </div>

            <div>
              <h4>Agregar Documento de Prueba</h4>
              <div className="flex gap-sm">
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTestDocument()}
                  style={{
                    flex: 1,
                    padding: 'var(--spacing-sm)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)'
                  }}
                />
                <button 
                  className="btn btn-success" 
                  onClick={addTestDocument}
                  disabled={loading}
                >
                  <i className="fas fa-plus"></i> Agregar
                </button>
              </div>
            </div>
          </div>

          {/* Documents List */}
          <div className="card">
            <h3><i className="fas fa-list"></i> Documentos ({documents.length})</h3>
            
            {documents.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>
                No hay documentos. Agrega uno para probar la conexión.
              </p>
            ) : (
              <div className="grid grid-2">
                {documents.map((doc) => (
                  <div key={doc.id} className="card" style={{ background: 'var(--bg-tertiary)' }}>
                    <div className="flex-between">
                      <div>
                        <p><strong>Mensaje:</strong> {doc.message}</p>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                          <strong>ID:</strong> {doc.id}
                        </p>
                        {doc.createdAt && (
                          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                            <strong>Creado:</strong> {new Date(doc.createdAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                      <button
                        className="btn btn-outline"
                        onClick={() => doc.id && deleteTestDocument(doc.id)}
                        disabled={loading}
                        style={{ alignSelf: 'flex-start' }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="card" style={{ marginTop: 'var(--spacing-lg)', background: 'rgba(13, 110, 253, 0.1)', borderLeft: '4px solid var(--color-primary)' }}>
            <h3><i className="fas fa-info-circle"></i> Instrucciones</h3>
            <ol>
              <li>Asegúrate de haber agregado las variables de Firebase a <code>.env.local</code></li>
              <li>Reinicia el servidor si acabas de agregar las variables</li>
              <li>Haz clic en "Probar Conexión" para verificar</li>
              <li>Agrega documentos de prueba para verificar escritura</li>
              <li>Elimina documentos para verificar eliminación</li>
            </ol>
            <p style={{ marginTop: 'var(--spacing-md)' }}>
              <strong>Nota:</strong> Lee <code>FIREBASE_SETUP.md</code> para más información.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
