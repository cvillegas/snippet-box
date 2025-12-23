import { Link } from 'react-router-dom';

interface Props {
  title: string;
  prevDest?: string;
  prevState?: { from: string };
}

export const PageHeader = (props: Props): JSX.Element => {
  const { title, prevDest, prevState } = props;

  return (
    <div className='col-12'>
      <h4>{title}</h4>
      {prevDest && (
        <h6>
          <Link
            to={prevDest}
            state={prevState}
            className='text-decoration-none text-light'
          >
            &lt;- Go back
          </Link>
        </h6>
      )}
    </div>
  );
};
