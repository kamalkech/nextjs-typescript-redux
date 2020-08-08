import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GetPhoto } from "../../stores/photo/actions";
import Link from "next/link";
import Layout from "../../components/Layout";

const Details = ({ photo, loading }: any) => {
  return (
    <>
      {loading ? (
        <span>loading...</span>
      ) : (
        <Layout title={`Photo | ${photo.title}`}>
          <h3>
            Details / {photo.id} {photo.title}
          </h3>
          <ul>
            <li>ID: {photo.id}</li>
            <li>Title: {photo.title}</li>
            <li>
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </li>
          </ul>
          <Link href="/photos">
            <a>Back to Photos List</a>
          </Link>
        </Layout>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    GetPhoto: bindActionCreators(GetPhoto, dispatch),
  };
};

const mapStateToProps = (state: any) => ({
  photo: state.photos.photo,
  loading: state.photos.loading,
});

Details.getInitialProps = async (props: any) => {
  const state = props.store.getState();

  if (state.photos.photos.length > 0) {
    props.store.dispatch({
      type: "GET_PHOTO",
      payload: props.query.id,
    });
  } else {
    await props.store.dispatch(GetPhoto(props.query.id));
  }

  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
