import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GetPosts } from "../../stores/todo/actions";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const Index = (props: any) => {
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    props.GetPosts(4);
  }, []);

  return (
    <Layout title="Todo List">
      <h2>Redux with Next.js 👋</h2>
      {fetch ? (
        <button
          onClick={() => {
            props.GetPosts(4);
            setFetch(false);
          }}
        >
          Rest to 4
        </button>
      ) : (
        <button
          onClick={() => {
            props.GetPosts(20);
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
            {props.posts &&
              props.posts.map((p: any, i: number) => (
                <li key={i}>
                  <Link href="/todos/[id]" as={`/todos/${p.id}`}>
                    <a>
                      {p.id}- {p.title}
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
    GetPosts: bindActionCreators(GetPosts, dispatch),
  };
};

const mapStateToProps = (state: any) => ({
  posts: state.posts.posts,
  loading: state.posts.loading,
});

Index.getInitialProps = async (props: any) => {
  await props.store.dispatch(GetPosts(3));
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
