import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GetPhotos } from "../../stores/photo/actions";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const Index = (props: any) => {
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    props.GetPhotos(4);
  }, []);

  return (
    <Layout title="Photo List">
      <h2>Redux with Next.js 👋</h2>
      <h3>Photo List</h3>
      {fetch ? (
        <button
          onClick={() => {
            props.GetPhotos(4);
            setFetch(false);
          }}
        >
          Rest to 4
        </button>
      ) : (
        <button
          onClick={() => {
            props.GetPhotos(20);
            setFetch(true);
          }}
        >
          FETCH 20
        </button>
      )}
      <hr />
      {props.loading ? (
        <span>loading...</span>
      ) : (
        <>
          <ul>
            {props.photos &&
              props.photos.map((p: any, i: number) => (
                <li key={i}>
                  <Link href="/photos/[id]" as={`/photos/${p.id}`}>
                    <a>
                      {p.id}- {p.title}
                      <br />
                      <img src={p.thumbnailUrl} alt={p.title} />
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
        </>
      )}
    </Layout>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    GetPhotos: bindActionCreators(GetPhotos, dispatch),
  };
};

const mapStateToProps = (state: any) => ({
  photos: state.photos.photos,
  loading: state.photos.loading,
});

Index.getInitialProps = async (props: any) => {
  await props.store.dispatch(GetPhotos(3));
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
