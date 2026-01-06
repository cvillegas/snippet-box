import { useEffect, useContext, useState, Fragment } from 'react';
import { SnippetsContext } from '../store';
import { SnippetGrid } from '../components/Snippets/SnippetGrid';
import { Button, Card, Layout } from '../components/UI';
import { ImportExportButtons } from '../components/ImportExport';
import { Snippet } from '../typescript/interfaces';

export const Snippets = (): JSX.Element => {
  const { snippets, tagCount, getSnippets, countTags } =
    useContext(SnippetsContext);

  const [filter, setFilter] = useState<string | null>(null);
  const [localSnippets, setLocalSnippets] = useState<Snippet[]>([]);

  useEffect(() => {
    getSnippets();
    countTags();
  }, []);

  useEffect(() => {
    setLocalSnippets([...snippets]);
  }, [snippets]);

  const filterHandler = (tag: string) => {
    setFilter(tag);
    const filteredSnippets = snippets.filter(s => s.tags.includes(tag));
    setLocalSnippets(filteredSnippets);
  };

  const clearFilterHandler = () => {
    setFilter(null);
    setLocalSnippets([...snippets]);
  };

  return (
    <Layout>
      <Fragment>
        <div className='col-12 col-md-4 col-lg-3'>
          <Card>
            <h5 className='card-title'>All snippets</h5>
            <div className='mb-3 d-flex justify-content-between'>
              <span>Total</span>
              <span>{snippets.length}</span>
            </div>
            <hr />

            <h5 className='card-title'>Import / Export</h5>
            <div className='mb-3'>
              <ImportExportButtons />
            </div>
            <hr />

            {tagCount.length > 0 && (
              <>
                <h5 className='card-title'>Filter by tags</h5>
                <Fragment>
                  {tagCount.map((tag, idx) => {
                    const isActiveFilter = filter === tag.name;

                    return (
                      <div
                        key={idx}
                        className={`d-flex justify-content-between cursor-pointer ${
                          isActiveFilter && 'text-success'
                        }`}
                        onClick={() => filterHandler(tag.name)}
                      >
                        <span>{tag.name}</span>
                        <span>{tag.count}</span>
                      </div>
                    );
                  })}
                </Fragment>
                <div className='d-grid mt-3'>
                  <Button
                    text='Clear filters'
                    color='secondary'
                    small
                    outline
                    handler={clearFilterHandler}
                  />
                </div>
              </>
            )}
          </Card>
        </div>
        <div className='col-12 col-md-8 col-lg-9'>
          {snippets.length === 0 ? (
            <Card>
              <div className='text-center py-4'>
                <h5 className='text-muted'>No snippets yet</h5>
                <p className='text-muted mb-0'>
                  Create your first snippet or import from a backup file.
                </p>
              </div>
            </Card>
          ) : (
            <SnippetGrid snippets={localSnippets} />
          )}
        </div>
      </Fragment>
    </Layout>
  );
};
