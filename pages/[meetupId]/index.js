import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

export const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content="Browse a huge list of Waterloo meetups!"
        />
      </Head>
      <MeetupDetail
        img={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://mnnaegel:TvfiJ1giDf7YiRUW@cluster0.4nr9a.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  const paths = meetups.map((meetup) => {
    return {
      params: {
        meetupId: meetup._id.toString(),
      },
    };
  });

  console.log(paths);
  return {
    fallback: 'blocking',
    paths: paths,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://mnnaegel:TvfiJ1giDf7YiRUW@cluster0.4nr9a.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(id) });
  client.close();

  return {
    props: {
      meetupData: {
        ...selectedMeetup,
        id: selectedMeetup._id.toString(),
        _id: selectedMeetup._id.toString(),
      },
    },
  };
};

export default MeetupDetails;
