import { useState, useRef, useContext } from 'react';
import { Button } from '../UI';
import { SnippetsContext } from '../../store';

interface ImportResult {
  imported: number;
  updated: number;
  skipped: number;
  total: number;
}

export const ImportExportButtons = (): JSX.Element => {
  const { exportSnippets, importSnippets, getSnippets } = useContext(SnippetsContext);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [overwrite, setOverwrite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await exportSnippets();
      
      // Create and download file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `snippets-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to export snippets');
    }
    setIsLoading(false);
  };

  const handleImportClick = () => {
    setShowImportModal(true);
    setImportResult(null);
    setError(null);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setImportResult(null);

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Validate format
      if (!data.snippets || !Array.isArray(data.snippets)) {
        throw new Error('Invalid file format. Expected { snippets: [...] }');
      }

      const result = await importSnippets(data.snippets, overwrite);
      setImportResult(result);
      
      // Refresh snippets list
      getSnippets();
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON file');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to import snippets');
      }
    }

    setIsLoading(false);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const closeModal = () => {
    setShowImportModal(false);
    setImportResult(null);
    setError(null);
    setOverwrite(false);
  };

  return (
    <>
      <div className='d-flex gap-2'>
        <Button
          text='Export'
          color='secondary'
          small
          outline
          handler={handleExport}
        />
        <Button
          text='Import'
          color='secondary'
          small
          outline
          handler={handleImportClick}
        />
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div 
          className='modal d-block' 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={closeModal}
        >
          <div 
            className='modal-dialog modal-dialog-centered'
            onClick={e => e.stopPropagation()}
          >
            <div className='modal-content bg-dark'>
              <div className='modal-header border-secondary'>
                <h5 className='modal-title'>Import Snippets</h5>
                <button 
                  type='button' 
                  className='btn-close btn-close-white' 
                  onClick={closeModal}
                />
              </div>
              <div className='modal-body'>
                {!importResult ? (
                  <>
                    <p className='text-muted mb-3'>
                      Select a JSON file exported from Snippet Box to import your snippets.
                    </p>
                    
                    <div className='form-check mb-3'>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        id='overwrite'
                        checked={overwrite}
                        onChange={e => setOverwrite(e.target.checked)}
                      />
                      <label className='form-check-label' htmlFor='overwrite'>
                        Overwrite existing snippets (match by title)
                      </label>
                    </div>

                    <input
                      ref={fileInputRef}
                      type='file'
                      accept='.json'
                      className='form-control bg-dark text-light border-secondary'
                      onChange={handleFileSelect}
                      disabled={isLoading}
                    />

                    {error && (
                      <div className='alert alert-danger mt-3 mb-0'>
                        {error}
                      </div>
                    )}

                    {isLoading && (
                      <div className='text-center mt-3'>
                        <div className='spinner-border text-secondary' role='status'>
                          <span className='visually-hidden'>Loading...</span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className='text-center'>
                    <div className='mb-3'>
                      <span className='display-6 text-success'>✓</span>
                    </div>
                    <h6>Import Complete</h6>
                    <div className='d-flex justify-content-center gap-4 mt-3'>
                      <div>
                        <div className='fs-4 text-success'>{importResult.imported}</div>
                        <small className='text-muted'>Imported</small>
                      </div>
                      {importResult.updated > 0 && (
                        <div>
                          <div className='fs-4 text-warning'>{importResult.updated}</div>
                          <small className='text-muted'>Updated</small>
                        </div>
                      )}
                      {importResult.skipped > 0 && (
                        <div>
                          <div className='fs-4 text-secondary'>{importResult.skipped}</div>
                          <small className='text-muted'>Skipped</small>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className='modal-footer border-secondary'>
                <Button
                  text={importResult ? 'Done' : 'Cancel'}
                  color='secondary'
                  small
                  handler={closeModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

