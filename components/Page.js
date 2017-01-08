import React, { Children } from 'react';
import Head from 'next/head';


function Page(props) {
  return (
    <section className="container">
      <Head>
        <title>
          {props.name} - {props.title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"
        />
      </Head>

      <header className="page-header">
        <h1>
          {props.name} - {props.title}
        </h1>
      </header>

      {props.children}
    </section>
  );
}


export default Page;
