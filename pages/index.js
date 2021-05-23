import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import React, { Fragment } from "react";
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetup HomePage</title>
        <meta
          name='description'
          content='this is a simple next js app for meetup'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// special function
export async function getStaticProps() {
  //  fetch data from api
  const client = await MongoClient.connect(
    "mongodb+srv://gopinath:YZQYcWzQew6i7u7@cluster0.9593i.mongodb.net/meetups",
    { useUnifiedTopology: true }
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
