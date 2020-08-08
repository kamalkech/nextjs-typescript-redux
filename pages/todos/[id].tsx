import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GetPost } from "../../stores/todo/actions";
import Link from "next/link";
import Layout from "../../components/Layout";

const Details = ({ post, loading }: any) => {
  return (
    <>
      {loading ? (
        <span>loading...</span>
      ) : (
        <Layout title={`Todo | ${post.title}`}>
          <h3>
            Details / {post.id} {post.title}
          </h3>
          <ul>
            <li>ID: {post.id}</li>
            <li>Title: {post.title}</li>
            <li>User ID: {post.userId}</li>
            <li>Completed: {post.completed ? "Yes" : "No"}</li>
          </ul>
          <Link href="/todos">
            <a>Back to Todolist</a>
          </Link>
        </Layout>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    GetPost: bindActionCreators(GetPost, dispatch),
  };
};

const mapStateToProps = (state: any) => ({
  post: state.posts.post,
  loading: state.posts.loading,
});

Details.getInitialProps = async (props: any) => {
  const state = props.store.getState();

  if (state.posts.posts.length > 0) {
    props.store.dispatch({
      type: "GET_POST",
      payload: props.query.id,
    });
  } else {
    await props.store.dispatch(GetPost(props.query.id));
  }

  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
