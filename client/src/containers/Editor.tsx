import { Fragment, useEffect, useContext, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { SnippetForm } from '../components/Snippets/SnippetForm';
import { Layout, PageHeader } from '../components/UI';
import { SnippetsContext } from '../store';

export const Editor = (): JSX.Element => {
  const { setSnippet: setCurrentSnippet } = useContext(SnippetsContext);
  const [inEdit, setInEdit] = useState(false);

  // Get previous location
  const location = useLocation();
  const state = location.state as { from?: string } | null;
  const from = state?.from || '/snippets';

  // Get id
  const { id } = useParams<{ id?: string }>();

  // Set snippet
  useEffect(() => {
    if (id) {
      setCurrentSnippet(+id);
      setInEdit(true);
    }
  }, [id]);

  return (
    <Layout>
      {inEdit ? (
        <Fragment>
          <PageHeader
            title='Edit snippet'
            prevDest={from}
            prevState={{ from: '/snippets' }}
          />
          <SnippetForm inEdit />
        </Fragment>
      ) : (
        <Fragment>
          <PageHeader title='Add new snippet' />
          <SnippetForm />
        </Fragment>
      )}
    </Layout>
  );
};
