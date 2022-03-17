import Head from 'next/head'
import MeetupList from "../components/meetups/MeetupList";
import Layout from "../components/layout/Layout";
import { UseEffect } from 'react';
import { useEffect, useState } from "react/cjs/react.production.min";
import { MongoClient } from "mongodb";
import {Fragment} from 'react'

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Waterloo Meetups</title>
        <meta name="description" content="Browse a huge list of Waterloo meetups!"/>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  )
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://mnnaegel:TvfiJ1giDf7YiRUW@cluster0.4nr9a.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups')
  const meetups = await meetupsCollection.find().toArray()
  client.close()

  return {
    props: {
      meetups: meetups.map((meetup,idx) => {
        const meetupCopy = {...meetup}
        console.log(meetup)
        meetupCopy._id = meetup._id.toString()
        meetupCopy.id = meetup._id.toString()
        console.log(meetupCopy)
        return meetupCopy
      })
    },
    revalidate: 1
  };
}

export default HomePage;
