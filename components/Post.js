import React from 'react';
import Link from 'next/prefetch';


function Post(props) {
  return (
    <article className="panel panel-info">
      <header className="panel-heading">
        <h2 className="panel-title">{props.title}</h2>
      </header>
      <div
        className="panel-body"
        dangerouslySetInnerHTML={{
          __html: props.full ? props.content : props.excerpt,
        }}
      />
      {props.full || (
        <div className="panel-footer">
          <Link
            as={`/p/${props.ID}/${props.slug}`}
            href={`/post?id=${props.ID}`}
          >
            Leer más
          </Link>
        </div>
      )}
    </article>
  );
}


export default Post;
