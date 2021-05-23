import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

// get static paths
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://gopinath:YZQYcWzQew6i7u7@cluster0.9593i.mongodb.net/meetups",
    { useUnifiedTopology: true }
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  // close connection
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupsId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for single meetup

  const meetupId = context.params.meetupsId;
  console.log(`meetup id is ${meetupId}`);

  const client = await MongoClient.connect(
    "mongodb+srv://gopinath:YZQYcWzQew6i7u7@cluster0.9593i.mongodb.net/meetups",
    { useUnifiedTopology: true }
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  console.log(meetupsCollection);

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  console.log("the selectedMeetup is..........");

  console.log(selectedMeetup);

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
