import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/prefetch';
import api from '../libs/api';

import Page from '../components/Page';
import Post from '../components/Post';


class PostPage extends Component {
  static async getInitialProps(context) {
    const [
      site,
      post,
    ] = await Promise.all([
      api.site.getInfo(),
      api.posts.getSingle(context.query.id),
    ]);

    return {
      site,
      post,
    }
  }

  render() {
    return (
      <Page name={this.props.site.name} title={this.props.post.title}>
        <ol className="breadcrumb">
          <li><Link href="/">Home</Link></li>
          <li className="active">{this.props.post.title}</li>
        </ol>

        <Post {...this.props.post} full />
      </Page>
    );
  }
}


export default PostPage;
