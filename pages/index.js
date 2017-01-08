import React, { Component } from 'react';
import Head from 'next/head';
import api from '../libs/api.js';

import Page from '../components/Page';
import Post from '../components/Post';


class HomePage extends Component {
  static async getInitialProps() {
    const [
      site,
      { posts },
    ] = await Promise.all([
      api.site.getInfo(),
      api.posts.getList(),
    ]);

    return {
      site,
      posts,
    }
  }

  render() {
    return (
      <Page name={this.props.site.name} title="Home">
        <ol className="breadcrumb">
          <li className="active">Home</li>
        </ol>

        {this.props.posts.map(post => (
          <Post {...post} key={post.ID} />
        ))}
      </Page>
    );
  }
}


export default HomePage;
