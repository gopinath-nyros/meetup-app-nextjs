import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

function NewMeetupFormPage() {
  const router = useRouter();
  const onAddMeetup = async (enteredMeetupData) => {
    console.log(enteredMeetupData);
    const url = "/api/new-meetup";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    router.push("/");
  };
  return (
    <Fragment>
      <Head>
        <title>Meetup Form</title>
        <meta name='description' content='new meetup form page' />
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetup} />;
    </Fragment>
  );
}

export default NewMeetupFormPage;
